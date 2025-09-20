// src/pages/dashboard/Dashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Lock,
  Wallet,
  ReceiptText,
  ArrowDownToLine,
  QrCode,
  FileText,
  ChevronRight,
  Download,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * IMPORTANTE (pedido do cliente):
 * - Não alterar os textos/infos visíveis do layout antigo (ex.: aviso de verificação).
 * - Página preparada para integração com backend.
 * - Quando não houver dados do backend, exibir dados fictícios (iguais ao antigo).
 *
 * OBS: Endpoints são apenas placeholders. Ao integrar, ajuste API_BASE e as rotas.
 */
const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "/api";

// --- Dados fictícios ---
const MOCK_SUMMARY = {
  availableBalanceCents: 0,
  lockedBalanceCents: 0,
  salesTodayCents: 0,
  transactionsCount: 0,
  deltas: {
    available: "+0,0% hoje",
    locked: "-0,0% semana",
    sales: "+0,0% vs. ontem",
    tx: "+0,0% mês",
  },
};

// Mantém o mesmo desenho do gráfico do layout antigo (fallback)
const STATIC_POLYLINE = "0,200 60,190 120,180 180,170 240,190 300,150 360,160 420,130 480,150 540,120 600,130 660,100 720,115";

const MOCK_LAST_SALES = [
  { at: "19/09 10:15", title: "Pedido #1234", amountCents: 12000, status: "paid" },
  { at: "19/09 09:30", title: "Pedido #1233", amountCents: 8990, status: "pending" },
  { at: "18/09 16:45", title: "Pedido #1232", amountCents: 25000, status: "paid" },
];

const MOCK_MOVES = [
  { at: "19/09 09:10", kind: "Saque", amountCents: -5000, status: "Processando" },
  { at: "18/09 14:20", kind: "Depósito", amountCents: 20000, status: "Concluído" },
  { at: "17/09 11:05", kind: "Taxa", amountCents: -250, status: "Concluído" },
];

// Utils
const fmtBRL = (cents = 0) =>
  (Number(cents) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Constrói polyline a partir de valores Y (opcional no backend). Mantém proporção do SVG (720x200).
function buildPolylinePoints(series, width = 720, height = 200) {
  if (!Array.isArray(series) || !series.length) return STATIC_POLYLINE;
  const stepX = width / (series.length - 1);
  const maxY = Math.max(...series);
  const minY = Math.min(...series);
  const range = Math.max(maxY - minY, 1);
  const pts = series
    .map((y, i) => {
      const x = i * stepX;
      const yn = (y - minY) / range; // 0..1
      const yPx = height - yn * height;
      return `${x},${yPx}`;
    })
    .join(" ");
  return pts || STATIC_POLYLINE;
}

export default function Dashboard() {
  // Estados preparados para backend (com fallback para os mocks acima)
  const [summary, setSummary] = useState(MOCK_SUMMARY);
  const [salesSeries, setSalesSeries] = useState(null); // se não vier do backend, usa o caminho estático
  const [lastSales, setLastSales] = useState(MOCK_LAST_SALES);
  const [moves, setMoves] = useState(MOCK_MOVES);

  // Carrega dados 
  useEffect(() => {
    let ab = new AbortController();

    (async () => {
      try {
        // Ajuste as rotas conforme seu backend
        const [sumRes, seriesRes, vendasRes, movsRes] = await Promise.allSettled([
          fetch(`${API_BASE}/dashboard/summary`, { credentials: "include", signal: ab.signal }),
          fetch(`${API_BASE}/dashboard/sales-series?period=today`, { credentials: "include", signal: ab.signal }),
          fetch(`${API_BASE}/dashboard/last-sales?limit=10`, { credentials: "include", signal: ab.signal }),
          fetch(`${API_BASE}/dashboard/movements?limit=10`, { credentials: "include", signal: ab.signal }),
        ]);

        if (sumRes.status === "fulfilled" && sumRes.value.ok) {
          const data = await sumRes.value.json();
          setSummary({
            availableBalanceCents: data?.availableBalanceCents ?? MOCK_SUMMARY.availableBalanceCents,
            lockedBalanceCents: data?.lockedBalanceCents ?? MOCK_SUMMARY.lockedBalanceCents,
            salesTodayCents: data?.salesTodayCents ?? MOCK_SUMMARY.salesTodayCents,
            transactionsCount: data?.transactionsCount ?? MOCK_SUMMARY.transactionsCount,
            deltas: {
              available: data?.deltas?.available ?? MOCK_SUMMARY.deltas.available,
              locked: data?.deltas?.locked ?? MOCK_SUMMARY.deltas.locked,
              sales: data?.deltas?.sales ?? MOCK_SUMMARY.deltas.sales,
              tx: data?.deltas?.tx ?? MOCK_SUMMARY.deltas.tx,
            },
          });
        }

        if (seriesRes.status === "fulfilled" && seriesRes.value.ok) {
          const data = await seriesRes.value.json(); // ex.: { points: [200,190, ...] }
          if (Array.isArray(data?.points) && data.points.length >= 2) {
            setSalesSeries(data.points);
          }
        }

        if (vendasRes.status === "fulfilled" && vendasRes.value.ok) {
          const data = await vendasRes.value.json(); // ex.: { items: [...] }
          if (Array.isArray(data?.items) && data.items.length) {
            setLastSales(
              data.items.map((it) => ({
                at: it.at ?? "--",
                title: it.title ?? "--",
                amountCents: it.amountCents ?? 0,
                status: it.status ?? "—",
              }))
            );
          }
        }

        if (movsRes.status === "fulfilled" && movsRes.value.ok) {
          const data = await movsRes.value.json(); // ex.: { items: [...] }
          if (Array.isArray(data?.items) && data.items.length) {
            setMoves(
              data.items.map((m) => ({
                at: m.at ?? "--",
                kind: m.kind ?? "—",
                amountCents: m.amountCents ?? 0,
                status: m.status ?? "—",
              }))
            );
          }
        }
      } catch {
        // Silencioso: mantém mocks
      }
    })();

    return () => ab.abort();
  }, []);

  // Mantém o desenho original do gráfico se não houver série do backend
  const polyPoints = useMemo(
    () => (salesSeries ? buildPolylinePoints(salesSeries) : STATIC_POLYLINE),
    [salesSeries]
  );

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* Elementos decorativos de fundo (inalterados) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Header (inalterado, com botão Voltar que já existia) */}
        <motion.header
          className="mb-8 flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-white/60 mt-2">Visão geral das suas operações financeiras</p>
          </div>

          <Link to="/" className="shrink-0">
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white
                         border border-white/15 bg-transparent hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </motion.button>
          </Link>
        </motion.header>

        {/* Alerta de verificação (EXATAMENTE como no antigo) */}
        <motion.div
          role="alert"
          aria-live="polite"
          className="flex items-center gap-4 rounded-2xl border border-red-400/30 bg-gradient-to-r from-amber-500/10 to-red-400/5 backdrop-blur-sm p-4 mb-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-red-400/15 border border-red-400/30 text-red-400">
            {/* Mesmo ícone/texto do antigo */}
            {/* AlertTriangle foi removido do import no original? Mantemos como estava antes */}
            {/* Se quiser exatamente igual ao seu anterior com AlertTriangle: */}
            {/* <AlertTriangle className="w-6 h-6" /> */}
            {/* Para manter o código funcional, reimportamos AlertTriangle no topo. */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-8h-2v6h2V10z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">Verificação necessária</p>
            <p className="text-white/70 text-sm mt-1">Complete a verificação para liberar todos os recursos da plataforma.</p>
          </div>
          <Link
            to="/dashboard/kyc"
            className="px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 transition-colors text-sm font-medium"
          >
            Verificar agora
          </Link>
        </motion.div>

        {/* KPIs (mesmas labels/cores; valores vindo do estado com fallback) */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <KPI
            label="Saldo disponível"
            value={fmtBRL(summary.availableBalanceCents)}
            icon={<Wallet className="w-5 h-5" />}
            delta={summary.deltas.available}
            deltaTone="pos"
            color="blue"
          />
          <KPI
            label="Saldo bloqueado"
            value={fmtBRL(summary.lockedBalanceCents)}
            icon={<Lock className="w-5 h-5" />}
            delta={summary.deltas.locked}
            deltaTone="neg"
            color="red"
          />
          <KPI
            label="Vendas (hoje)"
            value={fmtBRL(summary.salesTodayCents)}
            icon={<TrendingUp className="w-5 h-5" />}
            delta={summary.deltas.sales}
            deltaTone="pos"
            color="emerald"
          />
          <KPI
            label="Transações"
            value={String(summary.transactionsCount)}
            icon={<ReceiptText className="w-5 h-5" />}
            delta={summary.deltas.tx}
            deltaTone="pos"
            color="purple"
          />
        </motion.section>

        {/* Gráfico + Ações rápidas (texto/estrutura como no antigo) */}
        <motion.section
          className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Gráfico */}
          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Vendas do dia (R$)</h2>
                <p className="text-white/60 text-sm">Atualizado agora</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-xs text-white/70">Vendas</span>
                </div>
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Calendar className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>

            <div className="h-64 relative">
              <svg className="w-full h-full" role="img" aria-label="Gráfico de vendas do dia">
                <defs>
                  <linearGradient id="area-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="line-gradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                {/* Mantém o mesmo shape do antigo quando não houver série do backend */}
                <polyline
                  fill="url(#area-gradient)"
                  stroke="url(#line-gradient)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  points={`0,200 ${polyPoints} 720,200`}
                />
                <polyline
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  points={polyPoints}
                />
              </svg>
            </div>
          </div>

          {/* Ações rápidas (inalteradas) */}
          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Ações rápidas</h2>
            <div className="grid grid-cols-1 gap-3">
              <Action to="/dashboard/sale" icon={<QrCode className="w-5 h-5" />} label="Nova venda (PIX)" primary />
              <Action to="/dashboard/withdrawal" icon={<ArrowDownToLine className="w-5 h-5" />} label="Solicitar saque" tone="emerald" />
              <Action to="/dashboard/kyc" icon={<FileText className="w-5 h-5" />} label="Verificação KYC" tone="amber" />
              <Action to="/dashboard/reports" icon={<Download className="w-5 h-5" />} label="Relatórios" tone="purple" />
            </div>
          </div>
        </motion.section>

        {/* Tabelas (inalteradas visualmente; dados com fallback) */}
        <motion.section
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <TableCard title="Últimas vendas" action="Ver todas">
            <TableHeader cols={["Data", "Cliente", "Valor", "Status"]} />
            <tbody>
              {(lastSales?.length ? lastSales : MOCK_LAST_SALES).map((v, i) => (
                <Tr
                  key={i}
                  cells={[
                    v.at || "--",
                    v.title || "--",
                    fmtBRL(v.amountCents ?? 0),
                    <span
                      className={`px-2 py-1 rounded-full bg-white/10 text-xs ${
                        v.status === "paid"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : v.status === "pending"
                          ? "bg-amber-400/10 text-amber-300"
                          : "text-white/70"
                      }`}
                    >
                      {v.status === "paid" ? "Pago" : v.status === "pending" ? "Pendente" : String(v.status || "—")}
                    </span>,
                  ]}
                />
              ))}
            </tbody>
          </TableCard>

            <TableCard title="Movimentações" action="Ver histórico">
              <TableHeader cols={["Data", "Tipo", "Valor", "Status"]} />
              <tbody>
                {(moves?.length ? moves : MOCK_MOVES).map((m, i) => (
                  <Tr
                    key={i}
                    cells={[
                      m.at || "--",
                      m.kind || "—",
                      (m.amountCents ?? 0) < 0
                        ? `- ${fmtBRL(Math.abs(m.amountCents ?? 0))}`
                        : `+ ${fmtBRL(Math.abs(m.amountCents ?? 0))}`,
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          (m.status || "").toLowerCase() === "processando"
                            ? "bg-blue-400/10 text-blue-300"
                            : "bg-emerald-400/10 text-emerald-300"
                        }`}
                      >
                        {m.status || "—"}
                      </span>,
                    ]}
                  />
                ))}
              </tbody>
            </TableCard>
        </motion.section>

        {/* Footer (inalterado) */}
        <motion.footer
          className="text-center pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="text-white/40 text-sm">© 2025 SolutPag · Todos os direitos reservados</p>
        </motion.footer>
      </div>
    </main>
  );
}

/* ================== Partials de UI (inalterados no visual) ================== */
function KPI({ label, value, icon, delta, deltaTone = "pos", color = "blue" }) {
  const bgClasses = {
    blue: "bg-blue-500/15 border-blue-400/30 text-blue-400",
    red: "bg-rose-500/15 border-rose-400/30 text-rose-400",
    emerald: "bg-emerald-500/15 border-emerald-400/30 text-emerald-400",
    purple: "bg-purple-500/15 border-purple-400/30 text-purple-400",
  };

  return (
    <motion.div
      className="rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl p-6 shadow-xl"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="text-white/60 text-sm font-medium mb-2">{label}</div>
          <div className="text-2xl font-bold text-white">{value}</div>
        </div>
        <div className={`p-3 rounded-xl border ${bgClasses[color]}`}>{icon}</div>
      </div>
      <div className={`flex items-center gap-2 text-xs font-medium ${deltaTone === "pos" ? "text-emerald-400" : "text-rose-400"}`}>
        <div className={`w-5 h-5 grid place-items-center rounded-lg ${deltaTone === "pos" ? "bg-emerald-400/15" : "bg-rose-400/15"}`}>
          {deltaTone === "pos" ? "↑" : "↓"}
        </div>
        {delta}
      </div>
    </motion.div>
  );
}

function Action({ to, icon, label, primary, tone }) {
  const base = "flex items-center gap-3 w-full rounded-xl p-4 font-medium border transition-all duration-300 group";
  const tones = primary
    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-transparent shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-500"
    : tone === "emerald"
    ? "bg-emerald-400/10 text-emerald-200 border-emerald-400/30 hover:bg-emerald-400/20"
    : tone === "amber"
    ? "bg-amber-400/10 text-amber-200 border-amber-400/30 hover:bg-amber-400/20"
    : tone === "purple"
    ? "bg-purple-400/10 text-purple-200 border-purple-400/30 hover:bg-purple-400/20"
    : "bg-white/5 text-white border-white/10 hover:bg-white/10";

  return (
    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
      <Link to={to} className={`${base} ${tones}`}>
        <div className="flex-shrink-0">{icon}</div>
        <span className="flex-1">{label}</span>
        <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </Link>
    </motion.div>
  );
}

function TableCard({ title, children, action }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {action && (
          <Link to="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            {action}
          </Link>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">{children}</table>
      </div>
    </div>
  );
}

function TableHeader({ cols }) {
  return (
    <thead>
      <tr className="border-b border-white/10">
        {cols.map((c, index) => (
          <th key={index} className="pb-3 text-xs font-medium text-white/60 uppercase tracking-wider text-left">
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Tr({ cells }) {
  return (
    <tr className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
      {cells.map((c, index) => (
        <td key={index} className="py-3 pr-4 text-sm text-white/80">
          {c}
        </td>
      ))}
    </tr>
  );
}
import { Link } from "react-router-dom";
import { TrendingUp, Lock, Wallet, ReceiptText, ArrowDownToLine, QrCode, FileText, AlertTriangle, ChevronRight, Download, BarChart3, CreditCard, Users, Calendar, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <main className="min-h-screen text-white  relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Header */}
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

          {/* Botão de voltar para / (apenas borda) */}
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

        {/* Alerta de verificação */}
        <motion.div
          role="alert"
          aria-live="polite"
          className="flex items-center gap-4 rounded-2xl border border-red-400/30 bg-gradient-to-r from-amber-500/10 to-red-400/5 backdrop-blur-sm p-4 mb-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-red-400/15 border border-red-400/30 text-red-400">
            <AlertTriangle className="w-6 h-6" />
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

        {/* KPIs */}
        <motion.section 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <KPI 
            label="Saldo disponível" 
            value="R$ 0,00" 
            icon={<Wallet className="w-5 h-5" />} 
            delta="+0,0% hoje" 
            deltaTone="pos" 
            color="blue"
          />
          <KPI 
            label="Saldo bloqueado" 
            value="R$ 0,00" 
            icon={<Lock className="w-5 h-5" />} 
            delta="-0,0% semana" 
            deltaTone="neg" 
            color="red"
          />
          <KPI 
            label="Vendas (hoje)" 
            value="R$ 0,00" 
            icon={<TrendingUp className="w-5 h-5" />} 
            delta="+0,0% vs. ontem" 
            deltaTone="pos" 
            color="emerald"
          />
          <KPI 
            label="Transações" 
            value="0" 
            icon={<ReceiptText className="w-5 h-5" />} 
            delta="+0,0% mês" 
            deltaTone="pos" 
            color="purple"
          />
        </motion.section>

        {/* Gráfico + Ações rápidas */}
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
                <polyline
                  fill="url(#area-gradient)" 
                  stroke="url(#line-gradient)" 
                  strokeWidth="3" 
                  strokeLinejoin="round"
                  points="0,200 60,190 120,180 180,170 240,190 300,150 360,160 420,130 480,150 540,120 600,130 660,100 720,115"
                />
              </svg>
            </div>
          </div>

          {/* Ações rápidas */}
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

        {/* Tabelas */}
        <motion.section 
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <TableCard title="Últimas vendas" action="Ver todas">
            <TableHeader cols={["Data", "Cliente", "Valor", "Status"]} />
            <tbody>
              <Tr cells={["19/09 10:15", "Pedido #1234", "R$ 120,00", <span className="px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs">Pago</span>]} />
              <Tr cells={["19/09 09:30", "Pedido #1233", "R$ 89,90", <span className="px-2 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs">Pendente</span>]} />
              <Tr cells={["18/09 16:45", "Pedido #1232", "R$ 250,00", <span className="px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs">Pago</span>]} />
            </tbody>
          </TableCard>

          <TableCard title="Movimentações" action="Ver histórico">
            <TableHeader cols={["Data", "Tipo", "Valor", "Status"]} />
            <tbody>
              <Tr cells={["19/09 09:10", "Saque", "- R$ 50,00", <span className="px-2 py-1 rounded-full bg-blue-400/10 text-blue-300 text-xs">Processando</span>]} />
              <Tr cells={["18/09 14:20", "Depósito", "+ R$ 200,00", <span className="px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs">Concluído</span>]} />
              <Tr cells={["17/09 11:05", "Taxa", "- R$ 2,50", <span className="px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs">Concluído</span>]} />
            </tbody>
          </TableCard>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="text-center pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="text-white/40 text-sm">© 2024 SolutPag · Todos os direitos reservados</p>
        </motion.footer>
      </div>
    </main>
  );
}

function KPI({ label, value, icon, delta, deltaTone = "pos", color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-400",
    red: "from-rose-500 to-pink-400",
    emerald: "from-emerald-500 to-teal-400",
    purple: "from-purple-500 to-indigo-400"
  };

  const bgClasses = {
    blue: "bg-blue-500/15 border-blue-400/30 text-blue-400",
    red: "bg-rose-500/15 border-rose-400/30 text-rose-400",
    emerald: "bg-emerald-500/15 border-emerald-400/30 text-emerald-400",
    purple: "bg-purple-500/15 border-purple-400/30 text-purple-400"
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
        <div className={`p-3 rounded-xl border ${bgClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div className={`flex items中心 gap-2 text-xs font-medium ${deltaTone === "pos" ? "text-emerald-400" : "text-rose-400"}`}>
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
        <div className="flex-shrink-0">
          {icon}
        </div>
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
        <table className="w-full text-left border-collapse">
          {children}
        </table>
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
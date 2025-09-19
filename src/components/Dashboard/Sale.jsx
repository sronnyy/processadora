import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  QrCode,
  CheckCircle,
  Info,
  Copy,
  X,
  Shield,
  Zap,
  ArrowRight,
  ArrowLeft,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sale() {
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const cents = useMemo(() => toCents(amount), [amount]);
  const valid = cents >= 500 && cents <= 50000;
  const payload = useMemo(
    () => (valid ? `pix:solutpag|valor=${(cents / 100).toFixed(2)}` : ""),
    [valid, cents]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setOpen(true);
  };

  const copyToClipboard = async () => {
    if (!payload) return;
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* BG decorativo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-emerald-500/5 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Venda via PIX
              </h1>
              <p className="text-white/60 mt-1">Receba pagamentos instantâneos</p>
            </div>
          </div>

          {/* Botão voltar para o Dashboard */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </motion.header>

        {/* Card principal */}
        <motion.section
          className="rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl shadow-2xl shadow-black/40 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-white/80 mb-6 text-lg">
            Informe o valor da venda entre{" "}
            <span className="font-semibold text-emerald-400">R$ 5,00</span> e{" "}
            <span className="font-semibold text-emerald-400">R$ 500,00</span>
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="valor"
                className="block text-sm font-medium text-white/80 mb-3"
              >
                Valor da venda
              </label>
              <div
                className={`flex items-center gap-4 rounded-xl border bg-white/5 px-4 py-4 transition-all duration-300 ${
                  valid || !amount
                    ? "border-white/15 focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                    : "border-rose-400/50 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"
                }`}
              >
                <span className="text-blue-400">
                  <QrCode className="w-6 h-6" />
                </span>
                <input
                  id="valor"
                  value={amount}
                  onChange={(e) => setAmount(formatBRL(e.target.value))}
                  placeholder="R$ 0,00"
                  className="w-full bg-transparent outline-none text-xl font-semibold placeholder:text-white/30"
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>
              {!valid && amount && (
                <p className="text-sm text-rose-400 mt-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Valor fora dos limites permitidos
                </p>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <PremiumBadge icon={<Shield className="w-4 h-4" />} color="blue">
                Transação 100% segura
              </PremiumBadge>
              <PremiumBadge icon={<Zap className="w-4 h-4" />} color="emerald">
                Confirmação instantânea
              </PremiumBadge>
              <PremiumBadge
                icon={<CheckCircle className="w-4 h-4" />}
                color="purple"
              >
                Sem taxas escondidas
              </PremiumBadge>
            </div>

            <motion.button
              type="submit"
              disabled={!valid}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl font-semibold text-white py-4 px-6
                       bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              whileHover={{ scale: valid ? 1.02 : 1 }}
              whileTap={{ scale: valid ? 0.98 : 1 }}
            >
              Gerar QR Code PIX
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.section>

        {/* Modal */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-md rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900 to-gray-800 shadow-3xl p-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400">
                      <QrCode className="w-5 h-5 text-white" />
                    </div>
                    Pagamento PIX
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* QR Code */}
                  <div className="grid place-items-center p-6 rounded-xl bg-white/5 border border-white/10">
                    <div className="p-4 bg-white rounded-lg shadow-lg">
                      <div className="w-48 h-48 grid place-items-center text-black font-mono text-sm bg-white">
                        <div className="text-center">
                          <div className="w-32 h-32 bg-gray-200 mb-2 grid place-items-center rounded">
                            <QrCode className="w-16 h-16 text-gray-600" />
                          </div>
                          <p className="text-xs text-gray-600">QR Code PIX</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Valor */}
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{amount}</p>
                    <p className="text-white/60 text-sm mt-1">Valor para pagamento</p>
                  </div>

                  {/* Código PIX */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Código PIX</span>
                      <button
                        onClick={copyToClipboard}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        {copied ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap break-all text-xs text-white/80 bg-black/20 p-3 rounded-lg">
                      {payload}
                    </pre>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-3">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                      <Download className="w-4 h-4" />
                      Download QR
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded-xl px-4 py-3 font-semibold bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 transition-all"
                    >
                      Concluir
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ---------- Helpers ---------- */

const PremiumBadge = ({ children, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/10 text-blue-400",
    emerald: "from-emerald-500/20 to-emerald-600/10 text-emerald-400",
    purple: "from-purple-500/20 to-purple-600/10 text-purple-400",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r ${colorClasses[color]} border border-white/10 backdrop-blur-sm`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {icon}
      {children}
    </motion.span>
  );
};

function toCents(v) {
  const d = v.replace(/\D/g, "");
  return Number(d || 0);
}

function formatBRL(v) {
  const cents = toCents(v);
  const n = (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return n;
}
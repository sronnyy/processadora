import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Banknote, AlertCircle, ArrowRight, ArrowLeft, X, Zap, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Withdrawal() {
  const FEE = 500; // R$5,00 — taxa por saque
  const saldoDisponivel = 100000; // mock R$ 1.000,00

  const [amount, setAmount] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cents = useMemo(() => toCents(amount), [amount]);
  const maxSacavel = Math.max(0, saldoDisponivel - FEE);
  const valido = cents > FEE && cents <= maxSacavel;
  const recebera = Math.max(0, cents - FEE);

  const handleConfirmWithdrawal = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setConfirm(false);
  };

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* BG decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/5 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Header */}
        <motion.header
          className="mb-8 flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg">
              <Banknote className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Saque via PIX
              </h1>
              <p className="text-white/60 mt-1">Transfira seu saldo para sua conta com segurança</p>
            </div>
          </div>

          {/* Botão: Voltar (apenas borda) */}
          <Link to="/dashboard" className="shrink-0">
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white
                         border border-white/15 bg-transparent hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Dashboard
            </motion.button>
          </Link>
        </motion.header>

        {/* KPIs */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Kpi label="Saldo disponível" value={fmt(saldoDisponivel)} icon={<Banknote className="w-5 h-5" />} color="blue" />
          <Kpi label="Taxa por saque" value={fmt(FEE)} icon={<AlertCircle className="w-5 h-5" />} color="amber" />
          <Kpi label="Disponível para saque" value={fmt(maxSacavel)} icon={<CheckCircle className="w-5 h-5" />} color="emerald" />
        </motion.section>

        {/* Card principal */}
        <motion.section
          className="rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl p-6 shadow-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Alerta informativo */}
          <div className="flex items-start gap-4 rounded-xl border border-blue-400/30 bg-blue-400/10 p-4 mb-6">
            <div className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-blue-400/15 border border-blue-400/30 text-blue-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Pagamento automático</h3>
              <p className="text-white/70 text-sm">
                O saque será enviado automaticamente para a <span className="font-semibold">Chave PIX do CPF</span> cadastrada em sua conta.
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="space-y-6">
            <div>
              <label htmlFor="valor" className="block text-sm font-medium text-white/80 mb-3">
                Valor do saque
              </label>
              <div
                className={`flex items-center gap-4 rounded-xl border bg-white/5 px-4 py-4 transition-all duration-300 ${
                  valido || !amount
                    ? "border-white/15 focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                    : "border-rose-400/50 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"
                }`}
              >
                <span className="text-blue-400">
                  <Banknote className="w-6 h-6" />
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
              {!valido && amount && (
                <p className="text-sm text-rose-400 mt-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Valor deve ser maior que a taxa e dentro do limite disponível
                </p>
              )}
            </div>

            {/* Resumo da transação */}
            <div className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-3">
              <h3 className="font-semibold text-white mb-2">Resumo da transação</h3>
              <Row name="Valor do saque" value={fmt(cents)} />
              <Row name="Taxa de serviço" value={fmt(FEE)} />
              <div className="h-px bg-white/10 my-2" />
              <Row name="Você receberá" value={fmt(recebera)} highlight />
              <Row name="Chave PIX de destino" value="CPF ***.***.***-**" />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <PremiumBadge icon={<ShieldCheck className="w-4 h-4" />} color="blue">Transferência 100% segura</PremiumBadge>
              <PremiumBadge icon={<Zap className="w-4 h-4" />} color="emerald">Processamento instantâneo</PremiumBadge>
              <PremiumBadge icon={<Clock className="w-4 h-4" />} color="purple">Disponível em até 2h úteis</PremiumBadge>
            </div>

            {/* Confirmar */}
            <motion.button
              disabled={!valido}
              onClick={() => setConfirm(true)}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl font-semibold text-white py-4 px-6
                         bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              whileHover={{ scale: valido ? 1.02 : 1 }}
              whileTap={{ scale: valido ? 0.98 : 1 }}
            >
              Confirmar saque
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.section>

        {/* Modais */}
        <ConfirmModal open={confirm} onClose={() => setConfirm(false)} onConfirm={handleConfirmWithdrawal} isProcessing={isProcessing} cents={cents} fee={FEE} recebera={recebera} />
        <SuccessModal open={isSuccess} onClose={() => setIsSuccess(false)} recebera={recebera} />
      </div>
    </main>
  );
}

/* ===== Subcomponentes / utils ===== */

function ConfirmModal({ open, onClose, onConfirm, isProcessing, cents, fee, recebera }) {
  return (
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
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                Confirmar saque
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                disabled={isProcessing}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="rounded-xl bg-white/5 p-4">
                <h3 className="font-semibold text-white mb-3">Detalhes do saque</h3>
                <Row name="Valor solicitado" value={fmt(cents)} />
                <Row name="Taxa" value={fmt(fee)} />
                <Row name="Total a receber" value={fmt(recebera)} highlight />
                <Row name="Destino" value="Chave PIX (CPF)" />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl px-4 py-3 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
                disabled={isProcessing}
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl px-4 py-3 font-semibold bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 transition-all disabled:opacity-50"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  "Confirmar saque"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SuccessModal({ open, onClose, recebera }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900 to-gray-800 shadow-3xl p-6 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="grid place-items-center w-16 h-16 bg-emerald-400/15 border border-emerald-400/30 rounded-2xl mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Saque realizado!</h2>
            <p className="text-white/70 mb-6">
              Seu saque de <span className="font-semibold text-emerald-400">{fmt(recebera)}</span> foi processado e chegará em até 2 horas.
            </p>
            <button
              onClick={onClose}
              className="w-full rounded-xl px-4 py-3 font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Kpi({ label, value, icon, color = "blue" }) {
  const bgClasses = {
    blue: "bg-blue-500/15 border-blue-400/30 text-blue-400",
    amber: "bg-amber-500/15 border-amber-400/30 text-amber-400",
    emerald: "bg-emerald-500/15 border-emerald-400/30 text-emerald-400",
  };

  return (
    <motion.div
      className="rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl p-5 shadow-xl"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="text-white/60 text-sm font-medium mb-2">{label}</div>
          <div className="text-2xl font-bold text-white">{value}</div>
        </div>
        <div className={`p-2 rounded-xl border ${bgClasses[color]}`}>{icon}</div>
      </div>
    </motion.div>
  );
}

function Row({ name, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={`text-sm ${highlight ? "font-semibold text-white" : "text-white/70"}`}>{name}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-emerald-400" : "text-white"}`}>{value}</span>
    </div>
  );
}

function PremiumBadge({ children, icon, color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-400/30",
    emerald: "from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-400/30",
    purple: "from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-400/30",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium bg-gradient-to-r ${colorClasses[color]} border backdrop-blur-sm`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {icon}
      {children}
    </motion.span>
  );
}

function toCents(v) {
  return Number((v || "").replace(/\D/g, ""));
}
function fmt(c) {
  return (c / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function formatBRL(v) {
  return fmt(toCents(v));
}
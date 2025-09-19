import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Upload, Camera, UserCheck, MapPin, FileText, ArrowRight, ArrowLeft, X, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Kyc() {
  const [tipo, setTipo] = useState(""); // pf | pj
  const [pf, setPf] = useState({ nome: "", cpf: "", cpfRep: "" });
  const [pj, setPj] = useState({ razao: "", cnpj: "" });
  const [addr, setAddr] = useState({ cep: "", endereco: "", numero: "", complemento: "", cidade: "", uf: "" });
  const [frente, setFrente] = useState(null);
  const [verso, setVerso] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const canSend = useMemo(() => {
    const base = tipo && addr.cep && addr.endereco && addr.numero && addr.cidade && addr.uf;
    if (tipo === "pf") return base && pf.nome && pf.cpf && pf.cpfRep && frente && verso && selfie;
    if (tipo === "pj") return base && pj.razao && pj.cnpj && frente && verso && selfie;
    return false;
  }, [tipo, pf, pj, addr, frente, verso, selfie]);

  const fileFrente = useRef();
  const fileVerso = useRef();
  const fileSelfie = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* BG decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Verificação de Conta
              </h1>
              <p className="text-white/60 mt-1">Complete sua verificação para acessar todos os recursos</p>
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

        {/* Card principal */}
        <motion.section
          className="rounded-2xl border border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl p-6 shadow-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex items-start gap-4 rounded-xl border border-blue-400/30 bg-blue-400/10 p-4 mb-6">
            <div className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-blue-400/15 border border-blue-400/30 text-blue-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Verificação necessária</h3>
              <p className="text-white/70 text-sm">
                Complete a verificação KYC para liberar saques, aumentar limites e acessar todos os recursos da plataforma.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de conta */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">Tipo de conta</label>
              <div className="grid sm:grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setTipo("pf")}
                  className={`flex items-center gap-3 rounded-xl p-4 border transition-all duration-300 ${
                    tipo === "pf"
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                      : "border-white/15 bg-white/5 hover:border-white/25"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-2 rounded-lg ${tipo === "pf" ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-white/60"}`}>
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Pessoa Física</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setTipo("pj")}
                  className={`flex items-center gap-3 rounded-xl p-4 border transition-all duration-300 ${
                    tipo === "pj"
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                      : "border-white/15 bg-white/5 hover:border-white/25"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-2 rounded-lg ${tipo === "pj" ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-white/60"}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Pessoa Jurídica</span>
                </motion.button>
              </div>
            </div>

            {/* Form dinâmico */}
            {tipo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Dados PF */}
                {tipo === "pf" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Nome completo" icon={<UserCheck className="w-4 h-4" />}>
                      <input
                        className="input"
                        value={pf.nome}
                        onChange={e => setPf({ ...pf, nome: e.target.value })}
                        placeholder="Seu nome completo"
                      />
                    </Field>
                    <Field label="CPF" icon={<FileText className="w-4 h-4" />}>
                      <input
                        className="input"
                        value={pf.cpf}
                        onChange={e => setPf({ ...pf, cpf: e.target.value })}
                        placeholder="000.000.000-00"
                      />
                    </Field>
                    <Field label="Repita o CPF" icon={<FileText className="w-4 h-4" />}>
                      <input
                        className="input"
                        value={pf.cpfRep}
                        onChange={e => setPf({ ...pf, cpfRep: e.target.value })}
                        placeholder="000.000.000-00"
                      />
                    </Field>
                  </div>
                )}

                {/* Dados PJ */}
                {tipo === "pj" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Razão social" icon={<FileText className="w-4 h-4" />}>
                      <input
                        className="input"
                        value={pj.razao}
                        onChange={e => setPj({ ...pj, razao: e.target.value })}
                        placeholder="Razão social da empresa"
                      />
                    </Field>
                    <Field label="CNPJ" icon={<FileText className="w-4 h-4" />}>
                      <input
                        className="input"
                        value={pj.cnpj}
                        onChange={e => setPj({ ...pj, cnpj: e.target.value })}
                        placeholder="00.000.000/0000-00"
                      />
                    </Field>
                  </div>
                )}

                {/* Endereço */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    Endereço
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="CEP" icon={<MapPin className="w-4 h-4" />}>
                      <input
                        className="input"
                        value={addr.cep}
                        onChange={e => setAddr({ ...addr, cep: e.target.value })}
                        placeholder="00000-000"
                      />
                    </Field>
                    <div className="grid grid-cols-3 gap-4">
                      <Field label="Número">
                        <input
                          className="input"
                          value={addr.numero}
                          onChange={e => setAddr({ ...addr, numero: e.target.value })}
                          placeholder="123"
                        />
                      </Field>
                      <Field label="UF">
                        <input
                          className="input"
                          value={addr.uf}
                          onChange={e => setAddr({ ...addr, uf: e.target.value })}
                          placeholder="SP"
                        />
                      </Field>
                      <Field label="Cidade">
                        <input
                          className="input"
                          value={addr.cidade}
                          onChange={e => setAddr({ ...addr, cidade: e.target.value })}
                          placeholder="São Paulo"
                        />
                      </Field>
                    </div>
                    <Field label="Endereço" className="sm:col-span-2" icon={<MapPin className="w-4 h-4" />}>
                      <input
                        className="input"
                        value={addr.endereco}
                        onChange={e => setAddr({ ...addr, endereco: e.target.value })}
                        placeholder="Rua, Avenida, etc."
                      />
                    </Field>
                    <Field label="Complemento" className="sm:col-span-2">
                      <input
                        className="input"
                        value={addr.complemento}
                        onChange={e => setAddr({ ...addr, complemento: e.target.value })}
                        placeholder="Apartamento, bloco, etc."
                      />
                    </Field>
                  </div>
                </div>

                {/* Uploads */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-400" />
                    Documentos
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <UploadBox
                      title="Documento (frente)"
                      file={frente}
                      inputRef={fileFrente}
                      onPick={() => fileFrente.current?.click()}
                      onChange={e => setFrente(e.target.files?.[0] || null)}
                      icon={<FileText className="w-5 h-5" />}
                    />
                    <UploadBox
                      title="Documento (verso)"
                      file={verso}
                      inputRef={fileVerso}
                      onPick={() => fileVerso.current?.click()}
                      onChange={e => setVerso(e.target.files?.[0] || null)}
                      icon={<FileText className="w-5 h-5" />}
                    />
                    <UploadBox
                      title="Selfie com documento"
                      file={selfie}
                      inputRef={fileSelfie}
                      onPick={() => fileSelfie.current?.click()}
                      onChange={e => setSelfie(e.target.files?.[0] || null)}
                      icon={<Camera className="w-5 h-5" />}
                    />
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  <PremiumBadge icon={<ShieldCheck className="w-4 h-4" />} color="blue">Dados criptografados</PremiumBadge>
                  <PremiumBadge icon={<CheckCircle className="w-4 h-4" />} color="emerald">Análise em até 24h</PremiumBadge>
                  <PremiumBadge icon={<AlertCircle className="w-4 h-4" />} color="purple">Ambiente seguro</PremiumBadge>
                </div>

                {/* Ações */}
                <div className="flex gap-4 pt-4">
                  <motion.button
                    type="submit"
                    disabled={!canSend || isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-3 rounded-xl font-semibold text-white py-4 px-6
                               bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500
                               disabled:opacity-50 disabled:cursor-not-allowed
                               shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    whileHover={{ scale: canSend ? 1.02 : 1 }}
                    whileTap={{ scale: canSend ? 0.98 : 1 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar para análise
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  <button
                    type="button"
                    className="px-6 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.section>

        {/* Modal de sucesso */}
        <AnimatePresence>
          {isSuccess && (
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
                <h2 className="text-xl font-bold text-white mb-2">Verificação enviada!</h2>
                <p className="text-white/70 mb-6">
                  Sua documentação foi recebida e será analisada em até 24 horas úteis.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full rounded-xl px-4 py-3 font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all"
                >
                  Fechar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Field({ label, children, className = "", icon }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-medium text-white/80 flex items-center gap-2">
        {icon}
        {label}
      </span>
      <div className="relative">{children}</div>
    </label>
  );
}

function UploadBox({ title, file, inputRef, onPick, onChange, icon }) {
  return (
    <motion.div
      className="rounded-xl border border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-4"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-blue-400">{icon}</div>
        <div className="font-medium text-sm">{title}</div>
      </div>

      <div
        className="rounded-lg border-2 border-dashed border-white/15 bg-black/20 h-28 grid place-items-center cursor-pointer group hover:border-blue-400/30 transition-colors"
        onClick={onPick}
      >
        {file ? (
          <div className="text-center p-2">
            <div className="text-emerald-400 text-sm font-medium">✓ Documento carregado</div>
            <div className="text-white/60 text-xs truncate">{file.name}</div>
          </div>
        ) : (
          <div className="text-center p-2">
            <Upload className="w-6 h-6 text-white/40 mx-auto mb-1 group-hover:text-blue-400 transition-colors" />
            <div className="text-white/60 text-xs">Clique para selecionar</div>
          </div>
        )}
      </div>

      <input ref={inputRef} type="file" hidden onChange={onChange} accept="image/*" />

      <button
        type="button"
        onClick={onPick}
        className="w-full mt-3 rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs"
      >
        {file ? "Alterar arquivo" : "Selecionar arquivo"}
      </button>
    </motion.div>
  );
}

function PremiumBadge({ children, icon, color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-400/30",
    emerald: "from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-400/30",
    purple: "from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-400/30",
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium bg-gradient-to-r ${colorClasses[color]} border backdrop-blur-sm`}>
      {icon}
      {children}
    </span>
  );
}

/* estilo utilitário para inputs (mantive sua abordagem) */
const inputBase =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-white/40 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300";
const style = document?.createElement?.("style");
if (style) {
  style.innerHTML = `.input{${inputBase}}`;
  document.head.appendChild(style);
}
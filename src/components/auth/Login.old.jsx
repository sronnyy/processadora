import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Shield } from "lucide-react"
import logo from "@/assets/image.png"
import { motion } from "framer-motion"

export default function Login() {
  // estado do formulário
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // "Manter conectado" — inicia lendo preferência salva
  const [remember, setRemember] = useState(() => {
    try { return localStorage.getItem("solutpag.remember") === "1" } catch { return false }
  })

  const hasAny = email.length > 0 || password.length > 0
  const pwdTooShort = password.length > 0 && password.length < 8
  const canSubmit = password.length >= 8 && email.length > 0

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setIsLoading(true)

    try {
      // TODO: trocar por chamada real ao backend (ex.: await api.auth.login({ email, password }))
      await new Promise((r) => setTimeout(r, 1200))

      // persiste preferência de "manter conectado"
      try {
        if (remember) localStorage.setItem("solutpag.remember", "1")
        else localStorage.removeItem("solutpag.remember")
      } catch { }

      // Exemplo de estratégia de sessão/token:
      // - se "manter conectado": salvar token em localStorage (longa duração)
      // - senão: salvar em sessionStorage (expira ao fechar o browser)
      const fakeToken = "demo-token" // TODO: substituir pelo token real vindo do backend
      try {
        if (remember) {
          localStorage.setItem("auth:token", fakeToken)
          sessionStorage.removeItem("auth:token")
        } else {
          sessionStorage.setItem("auth:token", fakeToken)
          localStorage.removeItem("auth:token")
        }
      } catch { }

      alert("Login realizado com sucesso!")
      setEmail("")
      setPassword("")
      setShowPwd(false)
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => window.history.back()

  return (
    <section className="min-h-screen text-white antialiased flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -z-10" />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w
      -96 h-96 bg-gradient-to-l from-purple-500/5 to-transparent rounded-full blur-3xl -z-10" />

      {/* Voltar */}
      <motion.button
        onClick={goBack}
        className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Voltar"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </motion.button>

      <div className="w-full max-w-md">
        <motion.div
          className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/40 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Marca */}
          <motion.div
            className="flex flex-col items-center text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative mb-4">
              <img src={logo} alt="SolutPag" className="w-40 h-16 object-contain rounded-xl" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta</h1>
            <p className="text-sm text-white/60">Acesse sua conta para gerenciar seus recebimentos</p>
          </motion.div>

          <form onSubmit={onSubmit} noValidate className="space-y-6">
            {/* Email */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]">
                <Mail className="w-5 h-5 text-white/60" />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  className="w-full bg-transparent outline-none border-0 text-white placeholder:text-white/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Senha */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">Senha</label>
              <div
                className={[
                  "flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-300",
                  "focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]",
                  pwdTooShort ? "border-red-400/50 focus-within:border-red-400" : "border-white/10 focus-within:border-blue-500",
                ].join(" ")}
              >
                <Lock className="w-5 h-5 text-white/60" />
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  className="w-full bg-transparent outline-none border-0 text-white placeholder:text-white/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="pwd-error"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                  aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPwd}
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div id="pwd-error" className="min-h-[20px] mt-2 text-sm text-red-400" aria-live="polite">
                {hasAny && pwdTooShort ? "A senha precisa ter pelo menos 8 caracteres" : ""}
              </div>
            </motion.div>

            {/* Manter conectado */}

            <motion.div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                type="button"
                onClick={() => setRemember((v) => !v)}
                aria-pressed={remember}
                title="Permanece logado mesmo após fechar o navegador"
                className={[
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200",
                  remember
                    ? "text-white border-blue-400/40 bg-blue-400/10 shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                    : "text-white/80 border-white/10 hover:text-white hover:bg-white/10"
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2.5 w-2.5 rounded-full",
                    remember ? "bg-emerald-400" : "bg-white/30"
                  ].join(" ")}
                />
                Manter conectado
              </button>

              <a href="/auth/forgot" className="text-blue-400 hover:text-blue-300 transition-colors">
                Esqueceu a senha?
              </a>
            </motion.div>
            {/* CTA principal */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
              <button
                type="submit"
                disabled={!canSubmit || isLoading}
                className="w-full inline-flex items-center justify-center gap-3 rounded-xl font-semibold text-white py-3.5 px-6
                           bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500
                           disabled:opacity-50 disabled:cursor-not-allowed
                           shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Divisor */}
          <motion.div className="flex items-center my-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}>
            <div className="flex-1 h-px bg-white/10" />
            <span className="px-3 text-sm text-white/40">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Cadastro */}
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
            <p className="text-white/60 text-sm">
              Não tem uma conta?{" "}
              <a href="/auth/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                Criar conta
              </a>
            </p>
          </motion.div>

          {/* Segurança */}
          <motion.div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-white/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white/50">Conexão segura e criptografada</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
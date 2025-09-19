import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Shield, CheckCircle } from "lucide-react"
import logo from "@/assets/image.png"
import { motion } from "framer-motion"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const pwdError = useMemo(() => {
    if (!password && !confirm) return ""
    if (password.length < 8) return "A senha precisa ter pelo menos 8 caracteres"
    return ""
  }, [password, confirm])

  const confirmError = useMemo(() => {
    if (!confirm) return ""
    if (password !== confirm) return "As senhas não coincidem"
    return ""
  }, [password, confirm])

  const canSubmit = useMemo(() => 
    !pwdError && !confirmError && password && confirm && email && name && termsAccepted, 
    [pwdError, confirmError, password, confirm, email, name, termsAccepted]
  )

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    
    setIsLoading(true)
    // Simulação de processo de cadastro
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert("Cadastro realizado com sucesso!")
    setName("")
    setEmail("")
    setPassword("")
    setConfirm("")
    setShowPwd(false)
    setShowConfirm(false)
    setIsLoading(false)
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <main className="min-h-screen text-white antialiased flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Elementos de fundo premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/5 to-transparent rounded-full blur-3xl -z-10"></div>
      
      {/* Botão Voltar */}
      <motion.button
        onClick={goBack}
        className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group"
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
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
          {/* Cabeçalho / Marca */}
          <motion.div 
            className="flex flex-col items-center text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <img src={logo} alt="SolutPag" className="w-40 h-16 object-contain rounded-xl" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
             
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Crie sua conta</h1>
            <p className="text-sm text-white/60">Junte-se a milhares de empresários que confiam na SolutPag</p>
          </motion.div>

          <form onSubmit={onSubmit} noValidate className="space-y-5">
            {/* Nome */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Nome completo
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]">
                <User className="w-5 h-5 text-white/60" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  autoComplete="name"
                  className="w-full bg-transparent outline-none border-0 text-white placeholder:text-white/40"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]">
                <Mail className="w-5 h-5 text-white/60" />
                <input
                  id="email"
                  name="email"
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Senha
              </label>
              <div className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ${pwdError ? "border-red-400/50 focus-within:border-red-400" : "border-white/10 focus-within:border-blue-500"}`}>
                <Lock className="w-5 h-5 text-white/60" />
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Crie uma senha segura"
                  autoComplete="new-password"
                  className="w-full bg-transparent outline-none border-0 text-white placeholder:text-white/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="pwd-error"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                  aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPwd}
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div id="pwd-error" className="min-h-[20px] mt-2 text-sm text-red-400" aria-live="polite">
                {pwdError}
              </div>
            </motion.div>

            {/* Confirmar Senha */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label htmlFor="confirm" className="block text-sm font-medium text-white/80 mb-2">
                Confirmar senha
              </label>
              <div className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ${confirmError ? "border-red-400/50 focus-within:border-red-400" : "border-white/10 focus-within:border-blue-500"}`}>
                <Lock className="w-5 h-5 text-white/60" />
                <input
                  id="confirm"
                  name="confirm_password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  autoComplete="new-password"
                  className="w-full bg-transparent outline-none border-0 text-white placeholder:text-white/40"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  aria-describedby="confirm-error"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                  aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showConfirm}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div id="confirm-error" className="min-h-[20px] mt-2 text-sm text-red-400" aria-live="polite">
                {confirmError}
              </div>
            </motion.div>

            {/* Termos e Condições */}
            <motion.div
              className="flex items-start gap-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <label className="flex items-start gap-3 cursor-pointer mt-1">
                <input 
                  type="checkbox" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded bg-white/10 border-white/10 focus:ring-blue-500"
                />
                <span className="text-white/60">
                  Concordo com os <a href="/terms" className="text-blue-400 hover:text-blue-300">Termos de Serviço</a> e <a href="/privacy" className="text-blue-400 hover:text-blue-300">Política de Privacidade</a>
                </span>
              </label>
            </motion.div>

            {/* Botão de Cadastro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
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
                    Criando conta...
                  </>
                ) : (
                  <>
                    Criar conta
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Divisor */}
          <motion.div
            className="flex items-center my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-3 text-sm text-white/40">Já tem uma conta?</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </motion.div>

          {/* Login */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link 
              to="/auth/login" 
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Fazer login
            </Link>
          </motion.div>

          {/* Segurança */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white/50">Seus dados estão protegidos e criptografados</span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
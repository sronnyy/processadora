import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Wallet2,
  LayoutDashboard,
  ShieldCheck,
  BarChart3,
  ArrowUpDown,
  Lock,
  FileText,
  CreditCard,
  User,
  ExternalLink,
  ArrowRight,
  Zap,
  Sparkles,
  CheckCircle,
} from "lucide-react"

export default function FeaturesAndWallet() {
  const features = [
    { icon: <Wallet2 className="h-4 w-4 text-white" />, title: "Aceite múltiplos métodos de pagamento", desc: "PIX, cartão, boleto e criptomoedas em uma única plataforma integrada.", color: "from-blue-500 to-cyan-400" },
    { icon: <LayoutDashboard className="h-4 w-4 text-white" />, title: "Dashboard em tempo real", desc: "Acompanhe suas transações com analytics, filtros e relatórios detalhados.", color: "from-purple-500 to-pink-400" },
    { icon: <ShieldCheck className="h-4 w-4 text-white" />, title: "Segurança e Verificação", desc: "KYC, antifraude e monitoramento contínuo para proteger cada operação.", color: "from-emerald-500 to-teal-400" },
    { icon: <BarChart3 className="h-4 w-4 text-white" />, title: "Análise de Performance", desc: "KPIs claros, score de risco e insights para decisões com mais confiança.", color: "from-amber-500 to-orange-400" },
    { icon: <ArrowUpDown className="h-4 w-4 text-white" />, title: "Integrações rápidas via API", desc: "SDKs prontos, webhooks e checkout em minutos. Menos atrito, mais conversão.", color: "from-indigo-500 to-blue-400" },
    { icon: <Lock className="h-4 w-4 text-white" />, title: "Proteção antifraude bancária", desc: "Detecção de padrões suspeitos, listas de risco e bloqueio automático.", color: "from-rose-500 to-red-400" },
    { icon: <FileText className="h-4 w-4 text-white" />, title: "Relatórios exportáveis", desc: "Exportação em PDF, CSV e Excel para conciliação e auditorias.", color: "from-sky-500 to-teal-400" },
  ]

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
  const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } } }

  return (
    <section id="recursos" className="py-20 relative overflow-visible">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500/5 to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-emerald-500/5 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/70 mb-4 border border-white/10">
            <Sparkles className="h-3 w-3 mr-1.5 text-amber-400" />
            Solução Completa
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Recursos que facilitam seus{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">recebimentos</span>
          </h2>
          <p className="text-base text-white/60 max-w-2xl mx-auto">
            Tecnologia avançada para simplificar seus recebimentos e potencializar seu negócio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-10 items-start">
          <motion.div
            className="space-y-5 w-full lg:max-w-[640px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/3
                           backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300
                           group hover:shadow-xl hover:shadow-blue-500/10"
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className={`flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${f.color} p-2 shadow-md`}>
                  {f.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-medium text-gray-200 mb-1.5 group-hover:text-cyan-100 transition-colors">{f.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* direita (painel sticky) — ocupa mais espaço naturalmente pelo grid */}
          <StickyRight />
        </div>
      </div>
    </section>
  )
}

function StickyRight() {
  return (
    <div className="sticky top-20 h-fit w-full">
      <div className="space-y-6">
        {/* Card superior */}
        <Card className="w-full rounded-3xl border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="col-span-2 rounded-2xl bg-black/20 ring-1 ring-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm text-white/60 mb-1">Saldo Disponível</p>
                <p className="text-xs text-white/40">Últimos 30 dias</p>
                <p className="mt-3 text-3xl font-bold text-white">R$ 12.580,12</p>
                <div className="flex items-center mt-2">
                  <div className="h-2 w-20 bg-emerald-400/30 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full w-3/4" />
                  </div>
                  <span className="text-sm text-emerald-400 ml-2">+12.5%</span>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl bg-black/20 ring-1 ring-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-white/80">Perfil</p>
                  <ExternalLink className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors" />
                </div>
                <p className="text-xs text-white/50 font-mono mb-3">98e3....c463</p>
                <Button
                  className="ml-auto flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white
                             bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500
                             shadow-[0_8px_20px_-8px_rgba(16,185,129,0.6)] hover:shadow-[0_10px_25px_-8px_rgba(16,185,129,0.7)]
                             transition-all"
                >
                  <User className="h-4 w-4 text-white/90" />
                  <span>Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card inferior */}
        <Card className="w-full rounded-3xl border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center mb-3">
                  <Zap className="h-4 w-4 text-amber-400 mr-2" />
                  <p className="text-white/85 font-semibold text-base">Potencialize seus ganhos</p>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Use nossa plataforma e aumente em até <span className="font-semibold text-amber-300">100%</span> seus recebimentos
                  com taxas reduzidas e saques instantâneos.
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-amber-500/40 text-amber-300 bg-amber-500/5
                               hover:text-white hover:border-transparent text-sm
                               hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-400
                               transition-all duration-300 group py-2 px-4"
                  >
                    <span>Experimente Agora</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              <div className="h-24 md:h-28 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-400/5 ring-1 ring-amber-400/20 flex items-center justify-center p-4">
                <div className="relative">
                  <CreditCard className="h-10 w-10 text-amber-300/90" />
                  <div className="absolute -top-2 -right-2 h-5 w-5 bg-emerald-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
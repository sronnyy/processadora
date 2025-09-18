import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Clock, CheckCircle } from "lucide-react"
import heroImg from "@/assets/image.png"

export function HeroSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="container max-w-6xl relative grid grid-cols-1 md:grid-cols-2 items-center gap-20">
        {/* Coluna Esquerda - Texto */}
        <div className="flex flex-col">
          {/* Badge Premium */}
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full bg-gray-50 border border-gray-200 px-5 py-3 text-base font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#0057ff] to-[#00c6ff]">
                <Zap className="h-3 w-3 text-white" />
              </div>
              Plataforma de Pagamentos Digital
            </span>
          </div>

          {/* Título */}
          <h1 className="text-5xl md:text-[3.2rem] font-bold mb-8 leading-tight text-left tracking-tight text-gray-100">
            Receba seus{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-[#0057ff] to-[#00c6ff] bg-clip-text text-transparent">
                Pagamentos
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#00c6ff]/20 -z-0 rounded-full"></div>
            </span>{" "}
            com segurança e segurança
          </h1>

          {/* Descrição */}
          <p className="text-xl font-light text-gray-200 mb-10 max-w-xl text-left leading-relaxed">
            Aceite PIX, cartão, boleto e cripto em uma única plataforma.  para sua conta.

            <span className="font-semibold text-gray-50"> Relatórios em tempo real</span> e
            <span className="font-semibold text-gray-50"> e saques rápidos</span> para potencializar seu negócio.
          </p>

          {/* Vantagens */}
          <div className="flex  flex-col gap-3 mb-10">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
              <span className="text-gray-100">Pix imediato sem consulta ao CPF</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
              <span className="text-gray-200">Integrações API</span>
            </div>
            {/* <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
              <span className="text-gray-200">Segurança de nível bancário</span>
            </div> */}
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Button
              size="lg"
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white
                           bg-gradient-to-r from-[#0057ff] to-[#00c6ff]
                           hover:from-[#0047d9] hover:to-[#00aee6]
                           shadow-[0_6px_25px_-4px_rgba(0,102,255,0.6)] hover:shadow-[0_8px_30px_-4px_rgba(0,102,255,0.7)]
                           transition-all duration-300 transform hover:-translate-y-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

            >
              Começar Agora
            </Button>
            <Button
              size="lg"
              className="rounded-xl px-6 py-2.5 text-sm font-semibold
             border-2 border-white text-white
             bg-transparent
             transition-all duration-300
             hover:text-white
             hover:bg-gradient-to-r hover:from-[#0057ff] hover:to-[#00c6ff]
             hover:shadow-[0_6px_25px_-4px_rgba(0,102,255,0.6)]
             hover:-translate-y-0.5"
            >
              Ver Recursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Selo de segurança */}
          {/* <div className="flex items-center mt-12 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mr-4">
              <Shield className="h-6 w-6 text-[#0057ff]" />
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Certificação PCI DSS Nível 1</span><br />
              Seus dados protegidos com criptografia avançada
            </p>
          </div> */}
        </div>

        {/* Coluna Direita - Imagem Premium */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative">
            <img
              src={heroImg}
              alt="Dashboard Premium da Plataforma de Pagamentos"
              className="w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 relative z-10"
            />

            {/* Elementos flutuantes decorativos */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200 z-20">
              <div className="flex items-center">
                <div className="bg-emerald-100 rounded-full p-2 mr-3">
                  <Clock className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Saques em</p>
                  <p className="font-semibold text-gray-900">até 5min</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200 z-20">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Transações</p>
                  <p className="font-semibold text-gray-900">+99.9% uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
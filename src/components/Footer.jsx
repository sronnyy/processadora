
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react"
import logo from "@/assets/image.png" // <- use o asset certo do seu /src/assets


export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-gray-950 border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/3 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="container">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Logo e descrição */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src={logo}
                alt="SolutPag"
                className="h-10 w-auto brightness-110 contrast-125"
              />
            </div>
            <p className="text-white/60 mb-6 leading-relaxed">
              A plataforma de pagamentos mais avançada para empresas que buscam
              eficiência e segurança.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {["Início", "Recursos", "Preços", "Depoimentos", "Suporte"].map(
                (link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Nossos Serviços
            </h3>
            <ul className="space-y-3">
              {[
                "Pagamentos PIX",
                "Cartão de Crédito",
                "Boletos Bancários",
                "Criptomoedas",
                "Dashboard Analytics",
              ].map((serv, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {serv}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Entre em Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-white/60 mr-3 mt-1" />
                <span className="text-white/60">contato@solutpag.com</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-white/60 mr-3 mt-1" />
                <span className="text-white/60">+55 (24) 99999-9999</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-white/60 mr-3 mt-1" />
                <span className="text-white/60">Lorem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 mb-12 border border-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Fique por dentro das novidades
              </h3>
              <p className="text-white/60">
                Receba atualizações exclusivas sobre novos recursos e promoções.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all flex items-center">
                Inscrever
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm flex items-center">
            © 2025 SolutPag. Feito para você!
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Termos de Serviço
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
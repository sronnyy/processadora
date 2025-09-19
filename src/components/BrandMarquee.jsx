import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import { motion } from "framer-motion";

/**
 * Marquee/slider contínuo de marcas (nomes de empresas) - Versão Premium
 *
 * Props:
 * - brands?: string[]           -> lista de nomes (default incluída)
 * - speed?: number              -> velocidade do autoScroll (padrão 1.2)
 * - direction?: 'ltr' | 'rtl'   -> direção do movimento
 * - pauseOnHover?: boolean      -> pausa quando o mouse está em cima
 * - className?: string          -> classes extras no wrapper
 */
export default function BrandMarquee({
  brands = [
    "WordPress",
    "Telegram",
    "PagHiper",
    "Facebook",
    "Google",
   
  ],
  speed = 1.2,
  direction = "ltr",
  pauseOnHover = true,
  className = "",
}) {
  // Duplico a lista para o loop ficar sempre "cheio", mesmo com poucas marcas
  const slides = brands.concat(brands);

  const options = {
    type: "loop",
    drag: "free",
    focus: "center",
    arrows: false,
    pagination: false,
    gap: "2rem",
    autoWidth: true,
    direction,
    autoScroll: {
      speed: 0.4,
      pauseOnHover,
      pauseOnFocus: false,
    },
  };

  return (
    <div className={`w-full py-8 relative overflow-hidden ${className}`}>
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Título da seção */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold text-white mb-2">
          Parceiros e Integrações
        </h3>
        <p className="text-white/60 text-sm">
          Compatível com as principais plataformas do mercado
        </p>
      </motion.div>

      <Splide
        options={options}
        extensions={{ AutoScroll }}
        aria-label="Empresas parceiras e clientes"
      >
        {slides.map((name, i) => (
          <SplideSlide key={`${name}-${i}`}>
            <motion.div
              className="
                inline-flex items-center
                rounded-xl border border-white/15 
                bg-gradient-to-br from-white/5 to-white/10
                backdrop-blur-sm
                px-6 py-3 text-sm font-medium
                text-white/90 hover:text-white
                hover:border-white/25 hover:bg-white/15
                transition-all duration-300 shadow-lg
                hover:shadow-xl hover:shadow-blue-500/10
                whitespace-nowrap cursor-pointer
                group relative overflow-hidden
              "
              title={name}
              whileHover={{ 
                y: -4,
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Ícone decorativo (simulado) */}
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-110 transition-transform duration-300"></div>
              
              {name}
              
              {/* Efeito de borda luminosa */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-400/30 transition-all duration-300"></div>
            </motion.div>
          </SplideSlide>
        ))}
      </Splide>

      {/* Indicadores de scroll */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>

      {/* Texto informativo */}
      <motion.div 
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="text-xs text-white/40">
          + de 50 integrações disponíveis
        </p>
      </motion.div>
    </div>
  );
}
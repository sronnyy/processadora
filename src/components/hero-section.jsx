// src/components/hero-section.jsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/** Coluna que desliza verticalmente (loop infinito) */
function VerticalMarquee({ items, direction = "up", duration = 22, delay = 0, className = "" }) {
  const prefersReduced = useReducedMotion();
  const keyframes = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      {/* fades de topo/rodapé */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-black/65 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/65 to-transparent z-20" />

      <motion.div
        className="flex flex-col gap-5"
        animate={prefersReduced ? undefined : { y: keyframes }}
        transition={prefersReduced ? undefined : { duration, ease: "linear", repeat: Infinity, repeatType: "loop", delay }}
      >
        {[...items, ...items].map((card, i) => (
          <div
            key={`${card.src}-${i}`}
            className="relative aspect-[3/4] w-68   overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm"
          >
            <img src={card.src} alt={card.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/20 to-transparent">
              <p className="text-sm font-semibold text-white">{card.name}</p>
              {card.meta && <p className="text-xs text-white/70">{card.meta}</p>}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const col1 = [
    { src: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=900&auto=format&fit=crop", name: "Ava Carter", meta: "3.2M" },
    { src: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=900&auto=format&fit=crop", name: "Bruno Lee", meta: "1.1M" },
    { src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=900&auto=format&fit=crop", name: "Nina Gomez", meta: "890K" },
    { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop", name: "Rafa Mendes", meta: "2.0M" },
  ];

  const col2 = [
    { src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=900&auto=format&fit=crop", name: "Jo Kim", meta: "7.5M" },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop", name: "Sofia Martins", meta: "1.4M" }, // 🔄 substitui Isabel Matos
    { src: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop", name: "Ian Park", meta: "2.8M" },
    { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=900&auto=format&fit=crop", name: "Daniel Costa", meta: "950K" }, // 🔄 substitui Gabi Souza
  ];

  return (
    <section
      className="
        relative min-h-[100svh]
        overflow-x-clip overflow-y-visible
        lg:pb-[12svh]        /* reserva espaço pro bleed inferior */
      "
    >
      {/* luzes de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_30%_20%,rgba(0,102,255,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_80%_60%,rgba(0,198,255,0.12),transparent_60%)]" />

      {/* Texto */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-[100svh] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6">
        <div className="flex flex-col pt-24 lg:pt-0">
          <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-5 py-3 text-base font-medium text-white/90 shadow-sm mb-8 w-max">
            <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#0057ff] to-[#00c6ff]">
              <Zap className="h-3 w-3 text-white" />
            </span>
            Plataforma de Pagamentos Digital
          </span>

          <h1 className="text-5xl md:text-[3.2rem] font-bold leading-tight tracking-tight text-white mb-6">
            Receba seus{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-[#0057ff] to-[#00c6ff] bg-clip-text text-transparent">Pagamentos</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#00c6ff]/20 rounded-full" />
            </span>{" "}
            com confiança e segurança
          </h1>

          <p className="text-lg text-white/80 max-w-xl mb-8">
            Aceite PIX, cartão, boleto e cripto numa única plataforma.{" "}
            <span className="text-white">Relatórios em tempo real</span> e{" "}
            <span className="text-white">saques rápidos</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Button className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#0057ff] to-[#00c6ff] hover:from-[#0047d9] hover:to-[#00aee6] shadow-[0_6px_25px_-4px_rgba(0,102,255,0.6)]">
              Começar Agora
            </Button>
            <Button className="rounded-xl px-6 py-2.5 text-sm font-semibold border-2 border-white text-white bg-transparent hover:bg-gradient-to-r hover:from-[#0057ff] hover:to-[#00c6ff] hover:shadow-[0_6px_25px_-4px_rgba(0,102,255,0.6)]">
              Ver Recursos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 space-y-2">
            <div className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-500 mr-3" /><span className="text-white">Pix imediato sem consulta ao CPF</span></div>
            <div className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-500 mr-3" /><span className="text-white/90">Integrações API</span></div>
          </div>
        </div>

        {/* Mosaicos */}
        <div className="mt-10 lg:mt-0">
          {/* MOBILE/TABLET: no fluxo | DESKTOP: bleed controlado */}
          <div
            className="
              relative h-[56vh] sm:h-[64vh]            lg:absolute lg:right-0 lg:top-[-12svh] lg:bottom-[-12svh]  /* bleed */
              lg:h-auto lg:w-[52vw] xl:w-[46vw] 2xl:w-[44vw] lg:max-w-[780px]
              lg:pr-8 pointer-events-none lg:pointer-events-auto
            "
          >
            <div className="h-full grid grid-cols-2 gap-4 ml-10 md:gap-6">
              <VerticalMarquee items={col1} direction="up" duration={22} className="h-full" />
              <VerticalMarquee items={col2} direction="down" duration={26} className="h-full" />
            </div>
            {/* glow */}
            {/* <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_80%_50%,rgba(0,102,255,0.25),transparent_60%)]" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
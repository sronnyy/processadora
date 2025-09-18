import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/image.png";

const HIDE_AT_PERCENT = 0.15;       // some quando passar de 15% rolando p/ baixo
const SCROLL_DURATION = 1.15;       // segundos (Lenis) — ajuste aqui
const FALLBACK_MS = 1100;           // ms (polyfill rAF) — ajuste aqui

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hidden, setHidden] = useState(false);

  const headerRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  const lastYRef = useRef(0);

  // esconde/mostra com base na direção + % da página
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastYRef.current;
    const delta = latest - prev;

    if (open) {
      setHidden(false);
      lastYRef.current = latest;
      return;
    }

    const DEAD_ZONE = 6;
    if (Math.abs(delta) < DEAD_ZONE) return;

    const goingDown = delta > 0;
    const progress = scrollYProgress.get();

    if (goingDown && progress >= HIDE_AT_PERCENT) setHidden(true);
    if (!goingDown || progress <= HIDE_AT_PERCENT * 0.9) setHidden(false);

    lastYRef.current = latest;
  });

  const menuItems = [
    {
      label: "Recursos",
      href: "#recursos",
      submenu: [
        { label: "PIX Instantâneo", href: "#pix" },
        { label: "Pagamentos com Cartão", href: "#cartao" },
        { label: "Boletos Bancários", href: "#boleto" },
        { label: "Criptomoedas", href: "#cripto" },
      ],
    },
    // { label: "Preços", href: "#precos" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Suporte", href: "#suporte" },
  ];

  // ---------- SCROLL SUAVE COM OFFSET ----------
  const getOffset = () => {
    const h = headerRef.current?.offsetHeight || 72;
    return h + 16; // compensa o gap top-4 do header sticky
  };

  const scrollToHash = (hash) => {
    if (!hash || hash[0] !== "#") return;
    const el = document.querySelector(hash);
    if (!el) return;

    const targetTop = el.getBoundingClientRect().top + window.scrollY - getOffset();

    // 1) Se houver Lenis, usa ele (bem suave e controlável)
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(targetTop, {
        duration: SCROLL_DURATION,
        // ease out-cubic
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
      return;
    }

    // 2) Polyfill rAF (controla duração mesmo sem Lenis)
    const start = window.scrollY;
    const distance = targetTop - start;
    const duration = FALLBACK_MS;
    let startTime = null;

    // easeInOutQuad
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const step = (time) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = ease(progress);
      window.scrollTo(0, start + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const handleNavClick = (e, hash) => {
    if (!hash?.startsWith("#")) return;
    e.preventDefault();
    scrollToHash(hash);
    setOpen(false);
  };
  // ---------------------------------------------

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };
  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.25, ease: "easeInOut" } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <motion.header
      ref={headerRef}
      className="sticky top-4 z-50 px-4 will-change-transform"
      initial={false}
      animate={{ y: hidden ? -110 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      aria-hidden={hidden}
      onMouseEnter={() => setHidden(false)}
    >
      <motion.div
        className="max-w-6xl w-full mx-auto px-6 rounded-2xl md:rounded-full border border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-2xl shadow-2xl shadow-black/40"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToHash("#topo"); }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="shrink-0"
          >
            <img src={logo} alt="Solut Pag" className="w-44 object-contain brightness-110 contrast-125" />
          </motion.a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            <motion.ul className="flex items-center gap-1" variants={containerVariants} initial="hidden" animate="visible">
              {menuItems.map((item, index) => (
                <motion.li key={item.label} variants={itemVariants} className="relative">
                  <div
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onFocus={() => setHoveredItem(index)}
                    onBlur={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="relative flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                      aria-expanded={!!item.submenu && hoveredItem === index}
                      aria-haspopup={!!item.submenu}
                    >
                      {item.label}
                      {item.submenu && <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />}
                    </a>

                    {/* highlight */}
                    <AnimatePresence>
                      {hoveredItem === index && (
                        <motion.div
                          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-white/5"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Submenu */}
                    <AnimatePresence>
                      {item.submenu && hoveredItem === index && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}
                        >
                          <div className="p-2">
                            {item.submenu.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                onClick={(e) => handleNavClick(e, sub.href)}
                                className="block px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                {sub.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <Button
                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white
                           bg-gradient-to-r from-[#0057ff] to-[#00c6ff]
                           hover:from-[#0047d9] hover:to-[#00aee6]
                           shadow-[0_6px_25px_-4px_rgba(0,102,255,0.6)]
                           hover:shadow-[0_8px_30px_-4px_rgba(0,102,255,0.7)]
                           transition-all duration-300 transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={(e) => handleNavClick(e, "#recursos")}
              >
                Começar a Negociar
              </Button>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <motion.button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
            aria-label="Abrir menu" aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div className="lg:hidden overflow-hidden" variants={mobileMenuVariants} initial="closed" animate="open" exit="closed">
              <div className="px-2 pb-4 pt-2 flex flex-col gap-1">
                {menuItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="rounded-xl px-4 py-3 text-foreground hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {item.label}
                  </motion.a>
                ))}

                <motion.div className="mt-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <Button
                    className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white
                               bg-gradient-to-r from-[#0057ff] to-[#00c6ff]
                               hover:from-[#0047d9] hover:to-[#00aee6]
                               shadow-[0_6px_18px_-4px_rgba(0,102,255,0.55)]"
                    onClick={(e) => handleNavClick(e, "#recursos")}
                  >
                    Começar a Negociar
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
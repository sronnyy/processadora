import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/image.png";

const HIDE_AT_PERCENT = 0.15;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hidden, setHidden] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastYRef.current;
    const delta = latest - prev;
    if (open) { setHidden(false); lastYRef.current = latest; return; }
    if (Math.abs(delta) < 6) return;
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
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Suporte", href: "#suporte" },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <motion.header
      className="sticky top-4 z-50 px-4 will-change-transform"
      initial={false}
      animate={{ y: hidden ? -110 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      aria-hidden={hidden}
      onMouseEnter={() => setHidden(false)}
    >
      <motion.div className="max-w-7xl w-full mx-auto px-6 rounded-2xl md:rounded-full border border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-2xl shadow-2xl shadow-black/40">
        <nav className="flex items-center justify-between py-3">
          <motion.a href="#" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="shrink-0">
            <img src={logo} alt="Solut Pag" className="w-44 object-contain brightness-110 contrast-125" />
          </motion.a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-2">
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
                      className="relative flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                      aria-expanded={!!item.submenu && hoveredItem === index}
                      aria-haspopup={!!item.submenu}
                    >
                      {item.label}
                      {item.submenu && <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />}
                    </a>

                    <AnimatePresence>
                      {hoveredItem === index && (
                        <motion.div
                          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-white/5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {item.submenu && hoveredItem === index && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                        >
                          <div className="p-2">
                            {item.submenu.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
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

            {/* Botão Dashboard */}
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="rounded-xl px-5 py-2.5 text-sm font-semibold border border-white/15 text-white bg-white/5 hover:bg-white/10"
              >
                Dashboard
              </Button>
            </Link>

            {/* Auth */}
            <Link to="/auth/login">
              <Button
                variant="outline"
                className="rounded-xl px-5 py-2.5 text-sm font-semibold border border-white/15 text-white hover:bg-white/5"
              >
                Entrar
              </Button>
            </Link>

            <Link to="/auth/register">
              <Button
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white
                           bg-gradient-to-r from-[#0057ff] to-[#00c6ff]
                           hover:from-[#0047d9] hover:to-[#00aee6]
                           shadow-[0_6px_25px_-4px_rgba(0,102,255,0.6)]"
              >
                Criar conta
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <motion.button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="lg:hidden overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-2 pb-4 pt-2 flex flex-col gap-2">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-xl px-4 py-3 text-foreground hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}

                {/* CTA Dashboard (mobile) */}
                <Link to="/dashboard" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl px-5 py-3 text-sm font-semibold border border-white/15 text-white bg-white/5 hover:bg-white/10">
                    Dashboard
                  </Button>
                </Link>

                {/* Auth CTAs mobile */}
                <Link to="/auth/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl px-5 py-3 text-sm font-semibold border border-white/15 text-white hover:bg-white/5">
                    Entrar
                  </Button>
                </Link>

                <Link to="/auth/register" onClick={() => setOpen(false)}>
                  <Button
                    className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white
                               bg-gradient-to-r from-[#0057ff] to-[#00c6ff]
                               hover:from-[#0047d9] hover:to-[#00aee6]
                               shadow-[0_6px_18px_-4px_rgba(0,102,255,0.55)]"
                  >
                    Criar conta
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
import { useEffect, useState } from "react"
import Lenis from "lenis"

import "./App.css"
import Header from "./components/header"
import { HeroSection } from "./components/hero-section"
import FeaturesAndWallet from "./components/FeaturesAndWallet"
import TestimonialsSection from "./components/TestmionialsSection"
import Footer from "./components/Footer"

export default function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Respeita usuários com motion reduzido
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const lenis = new Lenis({
      // Se quiser “super smooth”, suba a duração um pouco (1.1–1.4)
      duration: prefersReduced ? 0 : 1.1,
      // easing padrão do Lenis é decente; este dá um falloff mais natural
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      smoothTouch: false,
      // ajusta a sensibilidade da roda (1 = padrão)
      wheelMultiplier: 1,
      // normaliza deltas entre SOs
      normalizeWheel: true,
    })

    // Loop de animação
    let rafId = null
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Scroll suave para âncoras #id
    const handleAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const hash = a.getAttribute("href")
      if (!hash || hash === "#") return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      // offset para não colar no header; ajuste conforme seu header
      const HEADER_OFFSET = 80
      lenis.scrollTo(target, { offset: -HEADER_OFFSET })
    }
    document.addEventListener("click", handleAnchorClick)

    // Cleanup
    return () => {
      document.removeEventListener("click", handleAnchorClick)
      if (rafId) cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesAndWallet />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
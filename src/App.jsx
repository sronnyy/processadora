import { useEffect, useState } from "react"

// import "./App.css"
import Header from "./components/header"
import { HeroSection } from "./components/hero-section"
import FeaturesAndWallet from "./components/FeaturesAndWallet"
import TestimonialsSection from "./components/TestmionialsSection"
import Footer from "./components/Footer"
import BrandMarquee from "./components/BrandMarquee"

export default function App() {
  const [count, setCount] = useState(0)

 

  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesAndWallet />
      <BrandMarquee/>
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
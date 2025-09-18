import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star, ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Gestora de Fundo Crípto",
      content: "As ferramentas de nível institucional do CryptoTrade transformaram nossa estratégia de investimento e aumentaram nossa rentabilidade significativamente.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
    },
    {
      name: "David Wilson",
      position: "Investidor Cripto Inicial",
      content: "O suporte ao cliente é excepcional, e o design intuitivo da plataforma tornou o início na trading de criptomoedas muito mais acessível.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
    },
    {
      name: "Emily Zhang",
      position: "Desenvolvedora DeFi",
      content: "Vimos melhorias notáveis em nossa eficiência de negociação desde que mudamos para a SolutPag. A velocidade de execução é incomparável.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      {/* Seção de Depoimentos */}
      <section id="depoimentos" className="py-24 relative overflow-hidden">
        {/* Elementos de fundo decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/5 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="container">
          {/* Cabeçalho */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Confiado por <span className="bg-gradient-to-r from-[#0057ff] to-[#00c6ff] bg-clip-text text-transparent">Empresários</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Junte-se a milhares de Empresários satisfeitos pela SolutPag
            </p>
          </motion.div>

          {/* Separador decorativo */}
          <motion.div 
            className="flex items-center justify-center mb-16"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="mx-4 h-2 w-2 rotate-45 bg-white/40"></div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </motion.div>

          {/* Depoimentos */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="rounded-3xl border-white/15 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden h-full hover:shadow-purple-500/10 transition-all duration-300 group">
                  <CardContent className="p-6 relative">
                    {/* Ícone de aspas */}
                    <div className="absolute top-6 right-6 opacity-10">
                      <Quote className="h-16 w-16 text-white" />
                    </div>
                    
                    {/* Avaliação por estrelas */}
                    <div className="flex mb-5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    
                    {/* Texto do depoimento */}
                    <p className="text-white/80 italic mb-6 leading-relaxed group-hover:text-white/90 transition-colors">
                      "{testimonial.content}"
                    </p>
                    
                    {/* Informações da pessoa com foto */}
                    <div className="flex items-center pt-4 border-t border-white/10">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/20">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-white/60">{testimonial.position}</p>
                      </div>
                    </div>
                    
                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Rodapé da seção */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-white/50 text-sm">
              Mais de <span className="font-semibold text-white">5.000</span> empresas confiam em nossa plataforma
            </p>
          </motion.div>
        </div>
      </section>

 
    </>
  )
}
import React from 'react'
import { motion } from 'framer-motion'
import boy from '../assets/boy.jpg';
const About = () => {

  const stats = [
    {label : "Speciality", value : "Full Stack Developer"},
    {label : "Focus", value : "Performance and Scalability"},
  ]

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-10 right-10 w-[420px] h-[420px] opacity-20 blur-[140px] delay-300",
    "top-1/2 -left-20 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px] ",
  ]

  return (
    <section id='about'
    className='min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden'
    >
      <div className='absolute inset-0 pointer-events-none'>
        {glows.map((glow, index) => (
          <div
            key={index}
            className={`absolute bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] rounded-full animate-pulse ${glow}`}
          />
        ))}

        <div className='relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12'>
          <motion.div className='flex flex-col md:flex-row items-center md:items-stretch gap-8'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          >

            <motion.div className='relative w-40 md:w-50  md:h-50 rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-[#1cd8d2]/20 via-[#302b63]/20 to-[#1cd8d2]/25'
            whileHover={{scale: 1.02}}
            transition={{type:"spring" , stiffness: 200, damping: 18}}
            >
              <img src={boy} alt="photo" className='absolute inset-0'/>

            </motion.div>

            <div className='flex-1 flex flex-col justify-center text-center md:text-left '>
              <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]'>
                Shahwaz Alam

              </h2>
              <p className='mt-2 text-lg sm:text-xl text-white/90 font-semibold'>
                Full Stack Developer
              </p>
              <p className='mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl'>
                I build scalable and efficient web applications using the latest technologies. With a strong foundation in both frontend and backend development, I create seamless user experiences and robust server-side solutions. 
              </p>

              <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl'>
                {stats.map((stat, index) => (
                  <motion.div key={index} className='roundex-xl border border-white/10 bg-white/5 px-4 py-4 text-center'
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className='text-sm text-gray-400'>{stat.label}:</div>
                    <div className='text-base font-semibold'>{stat.value}</div>
                  </motion.div>
                ))}
              </div>

              <div className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>

                <a href="#project" className='inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition'>view projects</a>

                <a href="#contact" className='inline-flex items-center justify-center rounded-lg  text-white border border-white/10 font-semibold px-5 py-3 hover:bg-white/20 transition'>contact me</a>

              </div>

            </div>


          </motion.div>

          <motion.div className='text-center md:text-left'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3'>
              About me
            </h3>

            <p className='text-gray-300 leading-relaxed text-base sm:text-lg'
            >
              I am a passionate full stack developer with expertise in building scalable and efficient web applications. 
            </p>

            <p className='mt-4 text-gray-400 text-base sm:text-lg'>
                I love turning ideas into scalable, user-friendly products that make an impact.
            </p>


          </motion.div>

        </div>

      </div>
      

    </section>
)
}

export default About
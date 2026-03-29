import React from 'react'
import { useMemo, useEffect , useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IntroAnimation = ({ onFinish = () => {} }) => {
  const greeting = useMemo(() =>[
    "Hello", "नमस्ते", "Hola", "Bonjour",
      "Ciao", "Olá", "Здравствуйте",
      "Merhaba", "Γειά", "Hej", "Hallo", "Salam"

  ],[])

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() =>{
    const sequenceDuration = greeting.length * 180 + 350;

    const id = setInterval(() => {
      setIndex((i) => {
        if (i >= greeting.length - 1) {
          clearInterval(id);
          return i;
        }
        return i + 1;
      });
    }, 180);

    const t = setTimeout(() => setVisible(false), sequenceDuration);

    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [greeting.length])


  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div className='fixed inset-0 z-9999 flex items-center justify-center bg-black text-white overflow-hidden'
        initial = {{y:0}}
        exit={{y: "-100%", 
          transition :{
            duration: 1.05, 
          ease : [0.22, 1, 0.36, 1 ],  
          },
        }}
        >

          <motion.h1
          key={index}
          className='text-5xl md:text-7xl lg:text-8xl font-bold'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{opacity: 0, y:-20}}
          transition={{ duration: 0.6 }}
          >
            {greeting[index]}
          

          </motion.h1>


        </motion.div>
      )} 

    </AnimatePresence>
  )
}

export default IntroAnimation
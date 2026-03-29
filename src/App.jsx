import React from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Footer from './sections/Footer'
import IntroAnimation from './components/IntroAnimation'
import CustomCursour from './components/CustomCursour'
import About from './sections/About'
import Contact from './sections/Contact'
const App = () => {
  const [introDone , setIntroDone] = React.useState(false);


  return (

    <>
    
    {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)}/>}

      {introDone && (
   
  

   <div className='relative gradient text-white'>
  <CustomCursour/>
   <Navbar/>
   <Home/>
   <About/>
   <Skills/>
   <Projects/>
   <Contact/>
   <Footer/>
   
   </div>
  )}
    </>
  )
}

export default App
import React, {useState, useEffect, useMemo, useRef} from 'react'
import img1 from '../assets/img1.JPG';
import img2 from '../assets/img2.JPG';
import photo1 from '../assets/photo1.JPG'; 
import photo2 from '../assets/photo2.PNG';
import { AnimatePresence, motion } from 'framer-motion';
import { useMotionValueEvent, useScroll } from 'framer-motion';


const useIsMobile = (query = '(max-width: 639px)') => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    if(typeof window === 'undefined') return;
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setIsMobile(event.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return isMobile;
};
const Projects = () => {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);


  const projects = useMemo(() => [
    {
      title: 'VistaStays - Vacation Rental Website',
      link : "https://stays-hub-property-rental-website.vercel.app/",
      bgColor : '#0d4d3d',
      image: isMobile ? photo1 : img1
    },
    {
      title: "AI thumbnail Generator",
      link : "https://thumbnail-generator-kappa.vercel.app/",
      bgColor : '#0d4d3d',
      image: isMobile ? photo2 : img2
    }

  ], [isMobile]);

  const {scrollYProgress} = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  const threshold = projects.map((_, index) => (index + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = threshold.findIndex((threshold) => latest <= threshold);
    setActiveIndex(index === -1 ? projects.length - 1 : index);
  });

  const activeProject = projects[activeIndex];

  return (
    <section ref={sceneRef} id='projects' className='relative text-white'
    style={{
      height: `${100*projects.length}vh`,
      backgroundColor: activeProject.bgColor,
      transition: "background-color 400ms ease"
    }}
    >

      <div className='sticky top-0 h-screen flex flex-col items-center justify-center'>
        <h2 className= {`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>
          My Work

        </h2>

        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex flex-col items-center justify-center transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: '85%', maxWidth: '1200px' }}
            >
             <AnimatePresence mode='wait'>
    {activeIndex === index && (
      <motion.h3
        key={`${project.title}-title`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full text-left mb-3 text-[clamp(0.85rem,1.5vw,1.1rem)] font-medium text-white/70 tracking-wide uppercase"
        style={{ zIndex: 20 }}
      >
        {project.title}
      </motion.h3>
    )}
  </AnimatePresence>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className='block w-full group'>
              <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7) transition-transform duration-300 group-hover:scale-[1.01] ${isMobile ? "mb-6 rounded-xl" : "mb-10 sm:mb-12 rounded-xl"} h-[62vh] sm:h-[66vh]`} 
              style={{
                zIndex: 10,
                transition : "box-shadow 250ms ease"
              }}
              >
                <img src={project.image} alt={project.title} className='w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl group-hover:brightness-90 transition-all duration-300' style={{
                  position:"relative",
                  zIndex: 10,
                  filter:"drop-shadow",
                  transition: "filter 200ms ease"
                }}
                loading='lazy'
                />
              </div>
                </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects;
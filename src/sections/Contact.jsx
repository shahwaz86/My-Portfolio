import React, {useState} from 'react'
import ParticlesBackground from '../components/ParticlesBackground';
import {motion} from 'framer-motion';
import emailjs from '@emailjs/browser'; 
import Astra from '../assets/Astra.png';

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      services : '',
      budget : '',
      idea : ''
    });

    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;

      if(name === "budget" && value && !/^\d*$/.test(value)){
        return;
      }
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));

      if(error[name]){
        setError(prevError => ({
          ...prevError,
          [name]: ''
        }));
      }
    };

    const validateForm = () => {
      const requiredFields = ['name', 'email', 'services', 'budget', 'idea'];
      const newError = {};

      requiredFields.forEach(field => {
        if(!formData[field]){
          newError[field] = 'This field is required';
        }
      });

      setError(newError);
      return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!validateForm()){
        return;
      }
        try {
          await emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, formData, PUBLIC_KEY);
          setStatus('Message sent successfully!');
          setFormData({
            name: '',
            email: '',
            services: '',
            budget: '',
            idea: ''
          });
        } catch (error) {
          console.error('Error sending email:', error);
          setStatus('Failed to send message.');
        }
      };


  return (
  <section id='#contact' className='w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10 '>
    <ParticlesBackground/>

    <div className='relative z-10 w-full flex flex-col md:flex-row items-center gap-10 '>

      <motion.div className='w-full md:w-1/2 flex justify-center'
      initial={{opacity:0 , x:-50}}
      whileInView={{opacity:1 , x:0}}
      transition={{duration:0.6}}
      >
        <motion.img src={Astra} alt="Contact Image" className='w-72 md:w-140 object-cover rounded-2xl shadow-lg'
        animate={{y: [0, -10, 0]}}
        transition={{duration: 2, repeat: Infinity, ease: "easeOut"}}
        >
        </motion.img>

      </motion.div>

      <motion.div className='w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10'
      initial={{opacity:0 , x:50}}
      whileInView={{opacity:1 , x:0}}
      transition={{duration:0.5}}>
        <h2 className='text-3xl font-bold mb-6'>
          Let's Work Together

        </h2>

        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='mb-1'>
            Your Name <span className='text-red-500 '>*</span>
          </label>
          <input type="text" name='name' value={formData.name} onChange={handleChange} className={`p-3 rounded-md bg-white/10 border ${error.name ? "text-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
          {error.name && <span className='text-red-500 text-sm mt-1'>{error.name}</span>}
        </div>

        <div className='flex flex-col'>
          <label className='mb-1'>
            Email <span className='text-red-500 '>*</span>
          </label>
          <input type="text" name='email' value={formData.email} onChange={handleChange} className={`p-3 rounded-md bg-white/10 border ${error.email ? "text-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
          {error.email && <span className='text-red-500 text-sm mt-1'>{error.email}</span>}
        </div>

        <div className='flex flex-col'>
          <label className='mb-1'>
            Services Needed <span className='text-red-500 '>*</span>
          </label>
          <input type="text" name='services' value={formData.services} onChange={handleChange} className={`p-3 rounded-md bg-white/10 border ${error.services ? "text-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
          {error.services && <span className='text-red-500 text-sm mt-1'>{error.services}</span>}
        </div>

        <div className='flex flex-col'>
          <label className='mb-1'>
            Budget <span className='text-red-500 '>*</span>
          </label>
          <input type="text" name='budget' value={formData.budget} onChange={handleChange} className={`p-3 rounded-md bg-white/10 border ${error.budget ? "text-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
          {error.budget && <span className='text-red-500 text-sm mt-1'>{error.budget}</span>}
        </div>

        <div className='flex flex-col'>
          <label className='mb-1'>
            Explain Your Idea <span className='text-red-500 '>*</span>
          </label>
          <textarea type="text" name='idea' value={formData.idea} onChange={handleChange} className={`p-3 rounded-md bg-white/10 border ${error.idea ? "text-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}>
          </textarea>
          {error.idea && <span className='text-red-500 text-sm mt-1'>{error.idea}</span>}
        </div>

        {status && (
          <p className={`text-sm ${status === "success" ? "text-green-500" : status === "error" ? "text-red-500" : "text-yellow-400"}`}>
            {status === "sending" ? "sending..." : status === "success" ? "Message sent successfully!" : "Failed to send message."}
          </p>
        )}


        <motion.button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed'
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </motion.button>
        </form>
      </motion.div>

    </div>

  </section>
   
   
)
}

export default Contact
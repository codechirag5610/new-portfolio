import React, { useState } from 'react'
import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper/index'
import { urlFor, client } from '../../client'
import './Footer.scss'


const Footer = () => {
  const [formData, setFormData] = useState({name: '', email: '', message: ''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    })
  }

  return (
    <>
      <h2 className="head-text">Interested in working? Reach out to me here.</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:sharmachirag347@gmail.com" className='p-text'>sharmachirag347@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.github} alt="github" />
          <a href="https://github.com/codechirag5610" className='p-text'>My Github</a>
        </div>
      </div>
      {!isFormSubmitted ? 
      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input type="text" className="p-text" name='name' placeholder='Your Name' value={name} onChange={handleChange} />
        </div>
        <div className="app__flex">
          <input type="email" className="p-text" name='email' placeholder='Your Email' value={email} onChange={handleChange} />
        </div>
        <div>
          <textarea className='p-text' name='message' value={message} placeholder='Your Message' onChange={handleChange}></textarea>
        </div>
        <button type="submit" className='p-text' onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
      </div> : <div><h3 className='head-text'>Thank you for getting in touch.</h3></div>}
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'), 
  'contact', 
  'app__whitebg'
  );
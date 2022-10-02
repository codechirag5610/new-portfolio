import React from 'react'
import { BsTwitter, BsInstagram } from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'

const SocialMedia = () => {
  return (
    <div className='app__social'>
      <div>
        <a href='https://twitter.com/ll__chirag__ll'>
        <BsTwitter />
        </a>
      </div>
      <div>
        <a href='https://www.linkedin.com/in/chirag-sharma-631099192/'>
          <FaLinkedinIn />
        </a>
      </div>
      <div>
        <a href='https://www.instagram.com/thechiragsharmaa/'>
          <BsInstagram />
        </a>
      </div>
    </div>
  )
}

export default SocialMedia
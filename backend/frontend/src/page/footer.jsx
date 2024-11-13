import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer(props) {
  return (
    <div className={`${props.bgColor}  h-[500px] mt-32`}>
      <div className="flex flex-col lg:flex-row gap-16 justify-center px-4 lg:px-0">
        <h1 className="mt-10 lg:mt-28 text-3xl sm:text-4xl font-bold text-white text-center lg:text-left">
          Ethio Kids
        </h1>
        <div className='flex flex-row  gap-16 '>
          <div className="flex flex-col mt-10 lg:mt-28 text-white text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl">HELPFUL LINKS</h1>
            <a href="" className="mt-2">Home</a>
            <a href="" className="mt-2">Boys</a>
            <a href="" className="mt-2">Girls</a>
            <a href="" className="mt-2">Kids</a>
            <a href="" className="mt-2">Contact Us</a>
          </div>

          <div className="flex flex-col mt-10 lg:mt-28 text-white text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl">INFORMATION</h1>
            <a href="" className="mt-2">About us</a>
            <a href="" className="mt-2">Term and Condition</a>
            <a href="" className="mt-2">Privacy Policy</a>
            <a href="" className="mt-2">Customer Support</a>
          </div>
        </div>

      </div>

      <div className="border-t-2 border-white w-4/5 mx-auto mb-2 mt-10"></div>

      <div className="flex justify-center mt-6 space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-white text-2xl hover:text-blue-600" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-white text-2xl hover:text-pink-600" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white text-2xl hover:text-blue-400" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-white text-2xl hover:text-blue-700" />
        </a>
      </div>

      <p className="flex justify-center text-white text-sm lg:text-base mt-6">
        © 2024 copyright All rights reserved
      </p>
    </div>
  );
}

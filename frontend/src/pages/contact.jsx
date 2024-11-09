import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import Footer from '../page/footer';
import Header from '../page/header';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({}); // State to store field-specific errors

  const isEng = true;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFieldErrors({ ...fieldErrors, [name]: '' }); // Clear error for the field as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.message) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const response = await fetch('/api/feedback/sendToBot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', message: '' });
        setError(null);
      } else {
        const errorMessage = await response.text();
        setError(`Submission failed: ${errorMessage}`);
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    }
  };

  return (
    <div className='bg-[#EFE3E3]'>
      <Header />
      <div className="py-5 md:px-[11%] md:mt-2 px-[4%]">
        <h1 className="text-4xl font-pbold text-third-200 mb-5">
          {isEng ? 'Contact Us' : 'እባኮትን ይደውሉ'}
        </h1>

        <div className="flex justify-between md:flex-row flex-col gap-16">
          <div className="w-full md:w-[48%] bg-[#F5EDED] text-black p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-psemibold mb-6">
              {isEng ? 'Reach Us' : 'ወደ እኛ ይገናኙ'}
            </h2>
            <div className="space-y-2">
              <div className="flex items-center text-lg text-black gap-4">
                <FaPhoneAlt className="text-2xl" />
                <span className="font-pregular">+123 456 789</span>
              </div>
              <div className="flex items-center text-lg text-black gap-4">
                <FaEnvelope />
                <span className="font-pregular">contact@furnish.com</span>
              </div>
              <div className="flex items-center text-lg text-black gap-4">
                <FaMapMarkerAlt />
                <span className="font-pregular">1234 Design St, Suite 567, Cityname</span>
              </div>
            </div>
            <div className="text-lg text-black mt-10 font-pregular">
              <div className="mb-1">{isEng ? 'Working Hours:' : 'የሥራ ሰዓታት:'}</div>
              <div>{isEng ? 'Mon - Fri: 9:00 AM - 6:00 PM' : 'ሰኞ - ዓርብ: 9:00 አ.ም - 6:00 ከምሽት'}</div>
              <div>{isEng ? 'Sat - Sun: 10:00 AM - 4:00 PM' : 'ቅዳሜ - እሁድ: 10:00 አ.ም - 4:00 ከምሽት'}</div>
            </div>
            <h3 className="text-2xl font-psemibold mt-10 mb-4">
              {isEng ? 'Follow Us' : 'እንደ እኛ ይከተሉ'}
            </h3>
            <div className="flex gap-6">
              <a href="https://facebook.com" className="bg-third-200 p-3 rounded-full text-white hover:opacity-90">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="bg-third-200 p-3 rounded-full text-white hover:opacity-90">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="bg-third-200 p-3 rounded-full text-white hover:opacity-90">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="bg-third-200 p-3 rounded-full text-white hover:opacity-90">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="w-full md:w-[48%] bg-[#F5EDED] p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl text-black font-psemibold mb-6">
              {isEng ? 'Get in Touch' : 'በማስተዋል ይደውሉ'}
            </h2>

            <form className="text-black space-y-3" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-lg font-plight mb-2">{isEng ? 'Name' : 'ስም'}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="p-3 bg-[#e7e7df] placeholder:text-gray-400 rounded-xl focus:outline-none"
                  placeholder={isEng ? 'Your Name' : 'የእርስዎ ስም'}
                />
                {fieldErrors.name && <p className="text-red-500 mt-1">{fieldErrors.name}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-plight mb-2">{isEng ? 'Phone' : 'ኢሜይል'}</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="p-3 bg-[#e7e7df] placeholder:text-gray-400 rounded-xl focus:outline-none"
                  placeholder={isEng ? 'Your Phone' : 'የእርስዎ '}
                />
                {fieldErrors.phone && <p className="text-red-500 mt-1">{fieldErrors.phone}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-plight mb-2">{isEng ? 'Message' : 'መልእክት'}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="p-3 bg-[#e7e7df] placeholder:text-gray-400 rounded-xl h-32 focus:outline-none"
                  placeholder={isEng ? 'Your Message' : 'የእርስዎ መልእክት'}
                ></textarea>
                {fieldErrors.message && <p className="text-red-500 mt-1">{fieldErrors.message}</p>}
              </div>

              <button className="w-full bg-gray-200 text-black py-3 rounded-xl hover:opacity-90 transition-all">
                {isEng ? 'Send Message' : 'መልእክት ይላኩ'}
              </button>
            </form>

            {isSubmitted && (
              <p className="text-green-500 mt-4">
                {isEng ? 'Your message has been successfully sent!' : 'መልእክቶትን በተሳካ ሁኔታ እናደርጓል'}
              </p>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

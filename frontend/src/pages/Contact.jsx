import React from 'react'
import Footer from '../components/Footer'
import { FaEnvelope, FaHeadphones, FaLocationDot, FaPhone } from 'react-icons/fa6'
import Title from '../components/Title'

const Contact = () => {
  return (
    <section className='max-padd-container mt-24'>
      {/* Conatct Form and Details */}
      <div className='flex flex-col xl:flex-row gap-20 py-6'>
        {/* Contact Form */}
        <div>
          {/* Title */}
          <Title title1={"Get"} title2={" in Touch"} title1Styles={"h3"} />
          <p className='mb-5 max-w-xl'>
            Have questions or need help? Send us a message, and we'll get back to you as soon as possible.
          </p>
          <form>
            <div className='flex gap-x-5'>
              <div className='w-1/2 mb-4'>
                <input
                  type="text"
                  id='name'
                  placeholder='Enter your name'
                  className='w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-deep rounded'
                />
              </div>
              <div className='w-1/2 mb-4'>
                <input
                  type="email"
                  id='email'
                  placeholder='Enter your email'
                  className='w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-deep rounded'
                />
              </div>
            </div>
            <div className='mb-4'>
              <textarea
                id="message"
                rows="4"
                placeholder='Write your message here'
                className='w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-deep rounded resize-none'
              />
              <div>
                <button
                  type='submit'
                  className='btn-secondary !rounded shadow-sm'
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Contact Details */}
        <div>
          {/* Title */}
          <Title title1={"Contact "} title2={"Details"} title1Styles={"h3"} />
          <p className='max-w-xl mb-4'>
            We are always here to assist you! Feel free to reach out to us through any of the following methods
          </p>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col'>
              <h5 className='h5 capitalize mr-4'>location :</h5>
              <p className='flexStart gap-x-2'><FaLocationDot />123 FoodieSpot Street, Food City, FC 12345</p>
            </div>
            <div className='flex flex-col'>
              <h5 className='h5 capitalize mr-4'>email :</h5>
              <p className='flexStart gap-x-2'><FaEnvelope />info@foodiespot.com</p>
            </div>
            <div className='flex flex-col'>
              <h5 className='h5 capitalize mr-4'>phone :</h5>
              <p className='flexStart gap-x-2'><FaPhone />+91 (100) 123-4567</p>
            </div>
            <div className='flex flex-col'>
              <h5 className='h5 capitalize mr-4'>Support :</h5>
              <p className='flexStart gap-x-2'><FaHeadphones />24/7 Support is open</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Map */}
      <div className='py-20'>
        {/* Title */}
        <Title title1={"Find "} title2={"us Here"} title1Styles={"h3"} />
        <div className='end-full h-96 rounded-lg overflow-hidden shadow-md'>
          <iframe
            className='w-full h-full'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83963612223!2d77.06889735022345!3d28.527582050486973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1db2c7f9e8e5%3A0x477901a5ef1e7c8!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1648261523456"
            allowFullScreen=""
            loading="lazy">
          </iframe>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Contact
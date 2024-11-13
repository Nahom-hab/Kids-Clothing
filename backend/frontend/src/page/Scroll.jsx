import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import Image1 from '../assets/image1.png';
import Image2 from '../assets/image2.png';
import Image3 from '../assets/kid.png';
import Image4 from '../assets/kid2.png';
import newImage from '../assets/text1.png';
import newImage2 from '../assets/text2.png';
import newImage3 from '../assets/text3.png';
import newImage5 from '../assets/text5.png';
import { useNavigate } from 'react-router-dom';

export default function Scroll() {
  const navigate = useNavigate()
  return (
    <div>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{ delay: 2000 }}
      >
        <SwiperSlide>
          <div className="bg-[#FBB7CD] flex flex-col md:flex-row gap-4 justify-center items-center h-[70vh] md:h-[81vh]">
            <div className="mx-4 md:mx-20 mt-10 flex flex-col items-center md:items-start">

              <div className="hidden sm:block">
                <img className='' src={newImage5} alt="" />
              </div>
              <div className='flex flex-col justify-start'>
                <img src={newImage2} className='w-[60%] ' alt="" />
                <img className="" src={newImage} alt="" />
                <button onClick={() => navigate('/Girls')} className=" bg-[#B7D2FB] h-[50px] w-[150px] rounded-[60px] text-white text-xl font-bold mt-4 sm:mt-10">
                  Shop Now
                </button>

              </div>

            </div>
            <img className="mx-4 md:mr-20 z-10" src={newImage3} alt="New Collection for Girls" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-[#B7D2FB] flex flex-col md:flex-row gap-4 justify-center items-center h-[70vh] md:h-[81vh]">
            <div className="mx-4 md:mx-20 mt-10 flex flex-col items-center md:items-start">

              <div className="hidden sm:block">
                <img src={newImage5} alt="" />
              </div>
              <div className='flex flex-col justify-start'>
                <img src={Image1} alt="" />
                <button onClick={() => navigate('/Boy')} className="bg-[#E5A4FF] h-[50px] w-[150px] rounded-[60px] text-white text-xl font-bold mt-4 sm:mt-10">
                  Shop Now
                </button>
              </div>
            </div>
            <img className="mx-4 md:mr-20 z-10" src={Image2} alt="New Collection for Boys" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[#E5A4FF] flex flex-col md:flex-row lg:gap-28 justify-center items-center h-[70vh] md:h-[81vh]">
            <div className="mx-4 md:mx-20 mt-10 flex flex-col items-center md:items-start">
              <div className="hidden sm:block">
                <img src={newImage5} alt="" />
              </div>
              <div className='flex flex-col justify-start'>
                <img src={Image3} className='w-[80%]' alt="" />
                <button onClick={() => navigate('/Baby')} className="bg-[#FBB7CD] h-[50px] w-[150px] rounded-[60px] text-white text-xl font-bold mt-4 sm:mt-10">
                  Shop Now
                </button>
              </div>
            </div>
            <img className="mx-4 lg:w-[25%] w-[70%] md:mr-20 z-10" src={Image4} alt="New Collection for Girls" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

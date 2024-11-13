import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import card1 from '../assets/foot1.png';
import card2 from '../assets/foot2.png';
import card3 from '../assets/foot3.png';
import card4 from '../assets/foot4.png';
import card5 from '../assets/foot5.png';

export default function Footer() {
  return (
    <div className="mt-[100px] justify-center flex-wrap gap-6 flex items-baseline">
      {/* <Swiper
        spaceBetween={30}
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        className="flex justify-center"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}

      > */}
      {/* <SwiperSlide> */}
      <div className='flex justify-center'>
        <img className="w-[236px] h-[321px] object-cover" src={card1} alt="Card 1" />
      </div>
      {/* </SwiperSlide> */}
      {/* <SwiperSlide> */}
      <div className='flex justify-center'>
        <img className="w-[236px] h-[361px] object-cover" src={card4} alt="Card 2" />
      </div>
      {/* </SwiperSlide>
        <SwiperSlide> */}
      <div className='flex justify-center'>
        <img className="w-[236px] h-[360px] object-cover" src={card5} alt="Card 3" />
      </div>
      {/* </SwiperSlide>
        <SwiperSlide> */}
      <div className='flex justify-center'>
        <img className="w-[236px] h-[321px] object-cover" src={card2} alt="Card 4" />
      </div>
      {/* </SwiperSlide>
        <SwiperSlide> */}
      <div className='flex justify-center'>
        <img className="w-[236px] h-[321px] object-cover" src={card3} alt="Card 5" />
      </div>
      {/* </SwiperSlide> */}
      {/* </Swiper> */}
    </div >
  );
}

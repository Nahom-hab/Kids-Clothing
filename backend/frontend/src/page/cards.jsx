import Image4 from '../assets/kid2.png';
import Image2 from '../assets/image2.png';
import newImage3 from '../assets/text3.png';
import baby from '../assets/Baby.png';
import boy from '../assets/Boys.png';
import girl from '../assets/Girls.png';
import { Link } from 'react-router-dom';

export default function Cards() {
  return (
    <div className="mt-16">
      <div className="flex flex-wrap justify-center gap-6 mx-auto px-4">

        <Link to={'/Girls'} className="bg-[#FBB7CD] rounded-xl relative  flex justify-center w-full max-w-[400px]">
          <img className="absolute top-20 left-2 h-[90px] w-[230px]" src={girl} alt="Girl" />
          <img className="h-[250px] object-cover" src={newImage3} alt="New Collection" />
        </Link>

        <Link to={'/Boy'} className="bg-[#B7D2FB] rounded-xl relative flex justify-center w-full max-w-[400px]">
          <img className="absolute top-20 left-2 w-[230px] h-[90px]" src={boy} alt="Boy" />
          <img className="h-[250px] object-cover" src={Image2} alt="Boys Collection" />
        </Link>

        <Link to={'/Baby'} className="bg-[#E5A4FF] rounded-xl relative flex justify-center w-full max-w-[400px]">
          <img className="absolute top-20 left-2 h-[90px] w-[230px]" src={baby} alt="Baby" />
          <img className="h-[250px] object-cover" src={Image4} alt="Baby Collection" />
        </Link>

      </div>
    </div>
  );
}

import pic from '../assets/pic.png';
import ful from '../assets/full.png';


export default function Component() {
  return (
    <div className="relative w-full h-[200px] md:h-[510px]">
      <img
        className="mt-10 w-full h-full object-cover "
        src={pic}
        alt="Main Image"
      />
      <div className="absolute top-[100px] lg:top-[350px] left-[50%] transform -translate-x-1/2 flex flex-col items-center ">
        <img
          className="w-[80%]"
          src={ful}
          alt="Full Image"
        />
        <button className="bg-white px-6 py-3 lg:py-5 lg:px-12 font-bold lg:text-3xl text-lg rounded-[50px] mt-4">
          Shop Now
        </button>
      </div>
    </div>
  );
}

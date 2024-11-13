
import { useNavigate } from 'react-router-dom';
import pic from '../assets/cart.png';
import useZustand from '../store/zustand';
import { useState } from 'react';

export default function Product_card({ productData }) {
  const navigate = useNavigate()
  const { cart, setCart } = useZustand()
  // const [isInCart, setIsInCart] = useState(cart.find((car) => car._id === productData._id))   


  const isthere = cart.find((car) => car._id === productData._id)
  const [isInCart, setIsInCart] = useState(isthere)

  const addToCart = (e) => {
    e.stopPropagation()
    setCart([...cart, {
      ...productData, quantity: 1
    }])
    setIsInCart(true)
  }

  const handleRemoveItem = (e) => {
    e.stopPropagation()
    const updatedCart = cart.filter(item => item._id !== productData._id);
    setCart(updatedCart)
    setIsInCart(false)
  };
  const HandeleRoute = () => {
    navigate(`/cloth/${productData._id}`)
  }
  return (
    <div onClick={() => HandeleRoute()} className="lg:w-[270px] w-[160px]  lg:p-3 p-1 rounded-lg overflow-hidden shadow-lg bg-white ">
      <img
        className="w-full rounded-lg lg:h-[270px] h-[190px] object-cover flex justify-center"
        src={productData?.imageURLs[0]} // Use the first image in the array
        alt={productData.name}
      />
      <div className="p-2">
        <h2 className="text-sm font-bold mb-1">{productData.name}</h2>
        <div className="flex justify-between">
          <div className='flex justify-between w-full'>
            <p className="font-bold"><span className='text-green-500 pr-1'>ETB</span>{productData.regularPrice}</p>

            <button onClick={isInCart ? handleRemoveItem : addToCart} className="bg-[#F5EDED] text-black rounded-full text-[12px] px-2 items-center  border-2 flex gap-2 ">
              <span className='lg:flex hidden'>{isInCart ? 'Remove from Cart' : 'Add to Cart'}  </span> <img className="h-[16px]" src={pic} alt="" />
            </button>
          </div>


        </div>
      </div>
    </div>


  );
}



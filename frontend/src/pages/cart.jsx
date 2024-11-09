import React from 'react';
import { FaHeart, FaTrashAlt } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Header from '../page/header';
import useZustand from '../store/zustand';


const CartPage = () => {
  const { cart, setCart } = useZustand()
  const navigate = useNavigate()


  console.log('cart', cart);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item._id !== itemId);
    setCart(updatedCart)
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      const updatedCart = cart.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart)
    }
  };

  const getTotalregularPrice = () => {
    if (cart) {
      return cart.reduce((total, item) => total + parseFloat(item.regularPrice) * parseFloat(item.quantity), 0);

    }
  };

  const HandleCheckout = () => {
    navigate('/checkout')

  }
  const discount = 10;
  const shipping = 5;
  const taxRate = 0.15;
  const taxAmount = getTotalregularPrice() * taxRate;
  const grandTotal = getTotalregularPrice() - discount + shipping + taxAmount;

  return (

    <div className='bg-[#EFE3E3] pb-12'>
      <Header />
      <div className=" w-full py-2 flex pt-7 justify-center ">
        <div className="w-full md:w-[80%]">
          <h1 className="text-3xl font-dynapuff mb-4">Your Cart</h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items Section */}
            <div className="w-full lg:w-[60%]  scrollbar-thin bg-[#F2EBEB] p-4 rounded-lg shadow-lg">
              {cart?.length === 0 ? (
                <p className="text-center p-6 text-gray-600">Your cart is empty.</p>
              ) : (
                <div>
                  {cart.map(item => (
                    <div key={item._id} className="flex flex-col md:flex-row justify-between items-start p-4 shadow-md rounded-lg mb-4 hover:shadow-lg transition duration-300">
                      <img src={item.imageURLs[0]} alt={item.name} className="w-full md:w-32 h-32 object-cover rounded-xl mb-4 md:mb-0" />

                      <div className="flex-1 md:ml-6">
                        <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
                        <p className="mt-2 text-gray-500">Price: <span className="text-green-600 font-semibold">ETB {item.regularPrice}</span></p>

                        <div className='flex md:items-start items-center md:flex-col md:gap-1 gap-3'>
                          <div className="flex items-center mt-2 space-x-2">
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                              <AiOutlineMinus />
                            </button>
                            <span className="px-4 text-lg font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                              <AiOutlinePlus />
                            </button>
                          </div>

                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between h-full gap-12 mt-4 md:mt-0">

                        <p className="ml-4 text-lg font-bold text-gray-800">ETB {(parseInt(item.regularPrice) * item.quantity)}</p>
                        <div className='flex gap-2 items-center'>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-red-500 flex gap-1 items-center bg-gray-300 hover:text-red-600 p-2 py-1 rounded-xl transition duration-300">
                            Delete <FaTrashAlt size={10} />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="p-2 rounded-xl flex gap-1 items-center bg-gray-300 transition py-1 duration-300">
                            Save <FaHeart size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary Section */}
            <div className="w-full h-fit lg:w-1/3 bg-[#F2EBEB] p-8 rounded-lg shadow-lg sticky top-16">
              <h2 className="text-3xl font-dynapuff text-gray-800 mb-4 text-center">Order Summary</h2>

              <div className="text-lg text-gray-700">
                <div className="flex justify-between mb-3">
                  <span>Subtotal</span>
                  <span className="font-semibold">ETB {getTotalregularPrice()}</span>
                </div>

                <div className="flex justify-between mb-3">
                  <span>Discount</span>
                  <span className="font-semibold text-green-600">-ETB {discount}</span>
                </div>

                <div className="flex justify-between mb-3">
                  <span>Shipping</span>
                  <span className="font-semibold">ETB {shipping}</span>
                </div>

                <div className="flex justify-between mb-3">
                  <span>Taxes (15%)</span>
                  <span className="font-semibold">ETB {taxAmount}</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Grand Total</span>
                  <span className="text-green-600">ETB {grandTotal}</span>
                </div>
              </div>

              <button onClick={() => HandleCheckout()} className="mt-6 w-full py-3 bg-[#D9D9D9] text-black text-lg font-dynapuff rounded-lg hover:bg-[#a8a6a6] transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-16'>

      </div>
    </div>

  );
};

export default CartPage;

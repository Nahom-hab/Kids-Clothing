
import Image3 from '../assets/kid.png';
import Image4 from '../assets/kid2.png';

import Header from "../page/header";
import newImage5 from '../assets/text5.png';
import Product_card from "../page/Product_card";
import Footer from "../page/footer";
import { productData } from '../data/data';
import { useEffect, useState } from "react";
import fetchAllCloths from '../Hooks/fetchAllCloths';
import useZustand from '../store/zustand';


export default function Baby() {
  fetchAllCloths()
  const { cloth, loading } = useZustand()

  const [selected, setSelected] = useState('jeans')
  const [babys, setBabys] = useState([])
  useEffect(() => {
    setBabys(cloth.filter(product => (product.type === "baby") && (product.clothType === selected)))
  }, [])
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = babys.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(babys.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const chnageCloths = (type) => {
    setBabys(cloth.filter(product => (product.type === "baby" && product.clothType === type)))
    setSelected(type)
  }

  return (
    <>
      <Header />
      <div className="bg-[#E5A4FF] flex flex-col md:flex-row justify-between items-center overflow-hidden h-[78vh] md:h-[550px]">
        <div className="mx-4 md:mx-20 mt-10 flex flex-col items-center md:items-start">

          <div className="hidden sm:block">
            <img src={newImage5} alt="" />
          </div>
          <div className='flex flex-col justify-start'>
            <img src={Image3} alt="" />

            <button className="bg-[#FBB7CD] h-[50px] w-[150px] rounded-[60px] text-white text-xl font-bold mt-4 sm:mt-10">
              Shop Now
            </button>
          </div>
        </div>
        <img className="mx-4 lg:w-[25%] w-[70%] md:mr-20 z-10" src={Image4} alt="New Collection for Girls" />

      </div>
      <div className="lg:mx-48">
        <div className="flex justify-center flex-col lg:items-start items-center">
          <h2 className="text-[25px] font-bold mt-9 md:text-[45px] sm:text-[35px] flex ">babys Collections</h2>
          <div className="flex flex-wrap items-center justify-between lg:gap-6 text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] mb-8 font-bold mt-6 ">
            <div className="flex items-center gap-2 lg:gap-6">
              <div onClick={() => chnageCloths('jeans')} className={`relative group hover:cursor-pointer transition-transform duration-300 ${selected === 'jeans' ? 'text-blue-500' : ''} transform hover:-translate-y-1`}>
                Jenns
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </div>
              <div onClick={() => chnageCloths('tshirt')} className={`relative group hover:cursor-pointer transition-transform duration-300 ${selected === 'tshirt' ? 'text-blue-500' : ''} transform hover:-translate-y-1`}>
                T-Shirt
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </div>
              <div onClick={() => chnageCloths('sweaters')} className={`relative group hover:cursor-pointer transition-transform duration-300 ${selected === 'sweaters' ? 'text-blue-500' : ''} transform hover:-translate-y-1`}>
                Sweaters
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </div>
              <div onClick={() => chnageCloths('pants')} className={`relative group hover:cursor-pointer transition-transform duration-300 ${selected === 'pants' ? 'text-blue-500' : ''} transform hover:-translate-y-1`}>
                Pants
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </div>
              <div onClick={() => chnageCloths('shoes')} className={`relative group hover:cursor-pointer transition-transform duration-300 ${selected === 'shoes' ? 'text-blue-500' : ''} transform hover:-translate-y-1`}>
                Shoes
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </div>
              <div onClick={() => chnageCloths('pajamas')} className={`relative group hover:cursor-pointer transition-transform duration-300 ${selected === 'pajamas' ? 'text-blue-500' : ''} transform hover:-translate-y-1`}>
                Pajamas
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </div>
              <div onClick={() => chnageCloths('socks')} className={`relative group hover:cursor-pointer transition-transform duration-300 ${selected === 'socks' ? 'text-blue-500' : ''} transform hover:-translate-y-1`}>
                Socks
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </div>
            </div>


            <div className="block md:hidden">
              <button className="text-xl">
                <i className="fa fa-bars"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          {loading ? (
            <div className='flex items-center justify-center mt-44'>
              <div className="mt-8 animate-spin h-20 w-20 border-4 border-[#201408] border-t-transparent rounded-full"></div>

            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-4 gap-2 p-4 px-0'>
              {currentProducts.length > 0 ? (
                currentProducts.map(product => {
                  return <Product_card key={product._id} productData={product} />;
                })
              ) : (
                <p>No  products available</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 justify-center mt-10">
            <button
              className={`px-4 py-2 bg-black text-white w-24  rounded-lg mx-2 hover:cursor-pointer hover:bg-gray-800 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div>
              {currentPage} out of {totalPages}
            </div>
            <button
              className={`px-4 py-2 bg-black text-white w-24 rounded-lg mx-2 hover:bg-gray-800 hover:cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div >

      <Footer
        bgColor="bg-[#E5A4FF]"
      />
    </>
  )
}



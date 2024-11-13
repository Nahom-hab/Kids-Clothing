import Header from "../page/header";          // Import Header component
import Scroll from "../page/Scroll";          // Import Scroll component
import Cards from "../page/cards";            // Import Cards component
import Product_card from "../page/Product_card"; // Import Product_card component
import Component from "../page/Component";    // Import Component component
import Fotter from "../page/Component2";      // Import Fotter component
import Footer from "../page/footer";           // Import Footer component
import { productData } from "../data/data";
import { useEffect, useState } from "react";
import Swipper from "../page/phoneSwiper";
import fetchAllCloths from "../Hooks/fetchAllCloths";
import useZustand from "../store/zustand";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { cloth, loading } = useZustand()
  const productsPerPage = 8;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

  }, [window.innerWidth])


  fetchAllCloths()




  // Calculate the current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = cloth.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(cloth.length / productsPerPage);

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


  return (
    <>

      <Header />
      <Scroll />
      <Cards />
      <div className="lg:text-5xl text-3xl text-center mt-12 font-dynapuff">New Collection</div>
      <div className="flex flex-col items-center justify-center w-full">
        {
          loading ? (
            <div className='flex items-center justify-center mt-44'>
              <div className="mt-8 animate-spin h-20 w-20 border-4 border-[#201408] border-t-transparent rounded-full"></div>

            </div>
          ) : (<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-4 gap-2 p-4 '>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => {
                return <Product_card key={product._id} productData={product} />;
              })
            ) : (
              <p>No  products available</p>
            )}
          </div>)
        }

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
      </div >

      <Component />
      <div>

      </div>
      {
        windowSize.width < 800 ?
          <Swipper /> :
          <Fotter />
      }

      <Footer
        bgColor="bg-[#FCA5CA]" />
    </>
  );
}
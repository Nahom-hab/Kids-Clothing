import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import Product_card from "../page/Product_card";
import Footer from "../page/footer";
import { useState } from "react";
import Header from '../page/header';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaShoppingCart, FaTelegram, FaTwitter } from 'react-icons/fa';
import useZustand from '../store/zustand';





export default function ViewCloths() {

    const { cloth, cart, setCart } = useZustand()
    const { id } = useParams()

    const product = cloth.find(product => product._id === id);

    useEffect(() => {
        // Scroll to top when the component mounts
        window.scrollTo(0, 0);
    }, []);


    const isthere = cart.find((car) => car._id === product._id)
    const [isInCart, setIsInCart] = useState(isthere)

    const RemoveFromCart = () => {
        const updatedCart = cart.filter(item => item._id !== product._id);
        setCart(updatedCart)
        setIsInCart(false)
    };

    const addToCart = () => {
        setCart([...cart, {
            ...product, quantity: 1

        }])
        setIsInCart(true)

    }




    const boys = cloth.filter(data => data.type === product.type);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // Calculate the current products to display
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = boys.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate total pages
    const totalPages = Math.ceil(boys.length / productsPerPage);

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
        <div>
            <Header />
            <div className='w-full flex justify-center'>
                <div className='flex lg:flex-row flex-col md:my-16 my-8 gap-8 justify-center lg:w-[80%] w-full'>
                    <div className='relative flex justify-center lg:w-[40%] w-full px-3'>
                        <img className=' w-full h-[450px] rounded-md object-cover' src={product.imageURLs[0]} alt="" />
                        <div className=' flex justify-center top-3 left-4 items-center absolute bg-red-500 text-white rounded-full h-12 w-12 font-dynapuff'>{product.discountPercent}%</div>
                    </div>
                    <div className='lg:w-[630px] px-4 w-full'>
                        <div className='font-dynapuff text-2xl lg:text-5xl'>
                            {product.name}
                        </div>
                        <div className='text-gray-500 w-[70%] mt-8'>{product.description}</div>
                        <div className='flex mt-4 items-baseline gap-2'>
                            <div className='font-dynapuff text-2xl'><span className='text-green-500 '>ETB</span> {product.regularPrice}</div>
                            <div className='line-through text-gray-500 text-[12px]'>ETB {parseInt(product.regularPrice) + parseInt(product.regularPrice * parseInt(product.discountPercent) / 100)}</div>
                        </div>
                        <div className='flex gap-4  mt-3'>
                            <button onClick={isInCart ? RemoveFromCart : addToCart} className="bg-[#F5EDED] text-black rounded-full text-[18px] px-3 py-1 items-center  border-2 flex gap-2 ">
                                <span className=''>{isInCart ? 'Remove from Cart' : 'Add to Cart'}</span> <FaShoppingCart />
                            </button>

                            <Link to={'/cart'} className="bg-[#F5EDED] text-black rounded-full text-[18px] px-3 py-1 items-center  border-2 flex gap-2 ">
                                <span className=''>Shop now</span>
                            </Link>
                        </div>
                        <div className='text-xl mt-6 font-dynapuff'>Share this cloth</div>
                        <div className="flex mt-2 gap-3">
                            <a href="https://facebook.com" className="bg-third-200  w-10 h-10 flex justify-center items-center rounded-xl text-white bg-blue-700  hover:opacity-90">
                                <FaFacebookF className=' w-6 h-6' />

                            </a>
                            <a href="https://facebook.com" className="bg-third-200  w-10 h-10 flex justify-center items-center rounded-xl text-white bg-blue-500  hover:opacity-90">
                                <FaTelegram className=' w-6 h-6' />

                            </a>
                            <a href="https://facebook.com" className="bg-third-200  w-10 h-10 flex justify-center items-center rounded-xl text-white bg-blue-300  hover:opacity-90">
                                <FaTwitter className=' w-6 h-6' />

                            </a>
                            <a href="https://facebook.com" className="bg-third-200  w-10 h-10 flex justify-center items-center rounded-xl text-white bg-red-500  hover:opacity-90">
                                <FaInstagram className=' w-6 h-6' />

                            </a>
                            <a href="https://facebook.com" className="bg-third-200  w-10 h-10 flex justify-center items-center rounded-xl text-white bg-blue-900  hover:opacity-90">
                                <FaLinkedinIn className=' w-6 h-6' />
                            </a>
                        </div>

                    </div>

                </div>
            </div>

            <div>
                <div className='lg:text-4xl text-2xl px-3 font-dynapuff text-start lg:px-44'>Similar Collections</div>
                <div className="flex flex-col items-center justify-center w-full">
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-4 gap-2 p-4 px-0'>
                        {currentProducts.length > 0 ? (
                            currentProducts.map(product => {
                                return (<div onClick={() => {
                                    window.scrollTo(0, 0);
                                }}>
                                    <Product_card key={product._id} productData={product} />;

                                </div>)
                            })
                        ) : (
                            <p>No  products available</p>
                        )}
                    </div>
                    <div className="flex items-center gap-4 justify-center mt-10">
                        <button
                            className={`px-4  bg-black text-white w-24  rounded-lg mx-2 hover:cursor-pointer hover:bg-gray-800 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <div>
                            {currentPage} out of {totalPages}
                        </div>
                        <button
                            className={`px-4  bg-black text-white w-24 rounded-lg mx-2 hover:bg-gray-800 hover:cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Footer
                    bgColor="bg-[#FCA5CA]" />
            </div>
        </div>
    )
}

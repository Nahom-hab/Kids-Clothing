
import { useState } from 'react';
import { Link } from 'react-router-dom';
import cartt from '../assets/carts.png';
import useZustand from '../store/zustand';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useZustand()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between items-center z-50 h-[79px] bg-[#F5EDED] px-4 shadow-md relative">
      <h2 className="text-[40px] font-bold">Ethio Kids</h2>

      {/* Hamburger icon for mobile */}
      <div className="md:hidden flex-col items-center cursor-pointer" onClick={toggleMenu}>
        <div className={`w-8 h-1 bg-black mb-1 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
        <div className={`w-8 h-1 bg-black mb-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
        <div className={`w-8 h-1 bg-black transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
      </div>

      {/* Menu items */}
      <div className={`absolute left-0  right-0 bg-[#F5EDED] md:static transition-transform duration-300 ${isMenuOpen ? 'top-[79px]' : 'top-[-200px]'}`}>
        <div className="flex flex-col md:flex-row md:ml-auto">
          <Link to="/" className="ml-4 mt-2 md:mt-0 md:ml-10 text-[22px]">Home</Link>
          <Link to="/Girls" className="ml-4 mt-2 md:mt-0 md:ml-10 text-[22px]">Girls</Link>
          <Link to="/Boy" className="ml-4 mt-2 md:mt-0 md:ml-10 text-[22px]">Boys</Link>
          <Link to="/Baby" className="ml-4 mt-2 md:mt-0 md:ml-10 text-[22px]">Baby</Link>
          <Link to="/contact" className="ml-4 mt-2 md:mt-0 md:ml-10 text-[22px]">Contact Us</Link>
        </div>
      </div>

      {/* Cart icon outside the menu */}
      <Link to="/cart" className="hidden relative md:flex items-center ml-4">
        <img className="h-6" src={cartt} alt="Cart" />
        <div className='absolute flex -top-2 -right-2 justify-center items-center rounded-full text-white bg-red-500  h-5 w-5 '>{cart.length}</div>
      </Link>
    </div>
  );
}

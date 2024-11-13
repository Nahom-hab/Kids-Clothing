import React, { useState } from 'react';
import Header from '../page/header';
import Footer from '../page/footer';
import useZustand from '../store/zustand';
import { useNavigate } from 'react-router-dom';

export default function CheckOut() {
    const navigate = useNavigate();
    const { cart, setCart } = useZustand();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/order/sendToBot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, phone, address, data: cart }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong with the submission');
            }

            // Clear form fields and cart
            setName('');
            setPhone('');
            setAddress('');
            setCart([]);

            // Navigate to success page after successful submission
            navigate('/success');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />

            <div className="flex-grow flex justify-center items-center px-3 py-10">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md p-8 bg-[#F5EDED] rounded-lg shadow-md"
                >
                    <h2 className="text-2xl font-semibold text-center mb-6">Checkout Form</h2>

                    {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Your Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="phone">Your Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="address">Your Address: ( city, street )</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#cac9c9] text-black py-2 rounded-md hover:bg-[#a09e9f] transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>

            <Footer />
        </div>
    );
}

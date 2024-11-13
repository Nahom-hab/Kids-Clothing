import { create } from 'zustand'

const useZustand = create((set) => ({
    cloth: [],
    setCloth: (newCloth) => {
        set(() => ({ cloth: newCloth }));
        localStorage.setItem('cloth', JSON.stringify(newCloth));
    },
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    setCart: (newCart) => {
        set(() => ({ cart: newCart }));
        localStorage.setItem('cart', JSON.stringify(newCart));
    },

    isEng: JSON.parse(localStorage.getItem('isEng')) || true,
    setIsEng: (newIsEng) => {
        set(() => ({ cart: newIsEng }));
        localStorage.setItem('isEng', JSON.stringify(newIsEng));
    },

    loading: false,
    setLoading: (loading) => {
        set(() => ({ loading }));
    },




}))

export default useZustand

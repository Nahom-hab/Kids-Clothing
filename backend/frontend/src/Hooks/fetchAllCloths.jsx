import { useEffect, useState } from 'react'
import useZustand from '../store/zustand';

export default function fetchAllCloths() {
    const { cloth, setCloth, setLoading } = useZustand()
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await fetch('/api/product');
                const data = await response.json()
                setCloth(data);
                console.log(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                console.log('loagin...');

            }
        };
        if (cloth.length === 0) {
            fetchData();
        }
    }, []);

}

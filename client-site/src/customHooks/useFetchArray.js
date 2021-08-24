import { useEffect, useState } from "react";
import axios from "axios";

function useFetchArray(url, options) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                authtoken:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).myToken,
            },
        }
        setLoading(true)
        const getRandomList = async () => {
            try {
                const response = await axios.get(url, options ? options : defaultOptions)
                setData(response.data[0])
                setLoading(false);
            } catch (error) {
                setError(error)
                console.error(error)
                setLoading(false);
            }
        }
        getRandomList()

    }, [url, options]);
    return { data, loading, error };
}

export default useFetchArray;
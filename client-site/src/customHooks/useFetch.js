import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url, options) {
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
                const res = await axios.get(url, options ? options : defaultOptions)
                setData(res.data)
                setLoading(false);// SetTimeOut() to test Skeleton

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

export default useFetch;
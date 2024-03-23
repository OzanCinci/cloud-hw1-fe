import { useEffect, useRef, useState } from "react";
import axios from 'axios';


const usePaginatedFetch = (url, _config, pageNumber, BASE_URL) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    //const req_url = `${BASE_URL}${url}`;
    const config = useRef(_config).current;

    useEffect(()=>{
        //console.log("TRIGGERED USEFETCH: ",url,config);
        const abortController = new AbortController();

        const fetchData = async () => {
            console.log("pageNumber: ",pageNumber)
            let req_url;
            if (pageNumber===0){
                req_url = `${BASE_URL}${url}`;
            } else {
                req_url = `${BASE_URL}${url}?page=${pageNumber}`;
            }
            let req = {...config};
            req.url = req_url;
            //console.log("req.url: ",req.url);

            setError(null);
            setLoading(true);
            //console.log("FIRLATACAK!", req);
            axios.request(req, { signal: abortController.signal })
            .then(res => {
                if (res.status !== 200) {
                    setError(res.data.detail);
                    setLoading(false);
                    setData(null);
                    console.log(`NOT 200: ${req.url} -> ${res.data.detail}`);
                }
                else {   
                    setError(null);
                    setLoading(false);
                    setData(res.data);
                    console.log(`SUCCESS: ${req.url} -> ${res.data}`);
                }
            })
            .catch(e => {
                if (e.name === "AbortError") {
                    console.log(`FETCH IS ABORTED: ${url}`);
                } else {   
                    setError("error raised! (completed orders)");
                    setLoading(false);
                    setData(null);
                    console.log(`ERROR: ${req.url} ->`,e);
                }
            });
        }

        if (url!==null && config!==null) {
            console.log("içine girdi");
            fetchData();
        } 

        return () => {    
            abortController.abort();
        }

    },[url, config, pageNumber]);


    return {data, loading, error};
}

export default usePaginatedFetch;

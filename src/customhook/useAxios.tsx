import axios from 'axios'
import React, { useState } from 'react'
import { VAR_ENCODE_TOKEN } from '../utils/Route';

// axios.defaults.baseURL = "/";
axios.defaults.headers.common["authorization"] = localStorage.getItem(VAR_ENCODE_TOKEN) || "";

function useAxios() {
  const [response, setResponse] = useState<any>(undefined);
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  	
  const fetch = async (params:any) => {
    try {
      setLoading(true);
      console.log(params);
      // params.data["authorization"] = localStorage.getItem(VAR_ENCODE_TOKEN);
      console.log(params);
      const result = await axios.request(params);
      console.log(result);
      setResponse(result.data);
      return result.data;
    } catch (error: any) {
      console.log(error)
      if (error.response && error.response.data.errors) {
        console.log(error)
      }
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return [response, error, loading, fetch]  as const;
} 

export default useAxios
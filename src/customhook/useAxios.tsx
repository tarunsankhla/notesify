import axios from 'axios'
import React from 'react'
import { VAR_ENCODE_TOKEN } from '../utils/Route';

axios.defaults.baseURL = "/";
axios.defaults.headers.common["authorization"] = localStorage.getItem(VAR_ENCODE_TOKEN) || "";

function useAxios() {
    
  return []
} 

export default useAxios
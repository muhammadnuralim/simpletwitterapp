import axiosInstance from "../service/axiosInstance";
import {ref} from 'vue'
import axios from "axios";
export  function useFetch(){
    const loading = ref(true)
    const success = ref(false)
    const error = ref(null)
    const data = ref(null)

    const tryFetching = async(url) => {    
        try{
            const response = await axiosInstance.get(url)
            console.log(response.data)
            data.value = response.data.data
            success.value = response.data.success
            loading.value = false
        }catch(err){
            error.value = err
            console.log(err)
            loading.value = false
        }
    }

    const tryPosting = async(url, formData) => {
        try{
            const response = await axiosInstance.post(url, formData,{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            success.value = response.data.success
            loading.value = false
        }catch(err){
            error.value = err
            console.log(err)
            loading.value = false
        }
    }

    const tryUpload = async(url, formData) => {
        try{
            const response = await axiosInstance.post(url, formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            success.value = response.data.success
            loading.value = false
        }catch(err){
            error.value = err
            console.log(err)
            loading.value = false
        }
    }

    

    
    return {
        tryFetching, data, tryPosting, success, tryUpload
    }
}
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
// import { useEffect, useState } from "react";



const useAllWatch = () => {


    const axiosPublic = useAxiosPublic();


    const { data: allWatch = [], refetch } = useQuery({
        queryKey: ['allWatch'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allWatch`)
            return res.data;
        },
    })




    // console.log(allWatch)

    return [allWatch, refetch];





    // const [allWatch , setAllWatch] = useState([])

    // useEffect(()=> {
    //     axiosPublic(`/allWatch?sort=${asc ? 'asc' : 'dsc'}&search=${search}`)
    //     .then(res => setAllWatch(res.data))
    // }, [asc, search])

    // return allWatch;
};

export default useAllWatch;
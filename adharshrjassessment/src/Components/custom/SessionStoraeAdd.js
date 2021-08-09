import {useState,useEffect} from 'react'

export default function SessionStorageAdd(key,defaultValue) {
    const [data,setData] = useState(()=>{
        let val = 0;

        try {
            val = window.sessionStorage.getItem(key) || String(defaultValue);
            console.log("The Incremented Values are- " + val);
        }catch(e){
            val = 0;
        }

        return parseInt(val);
    });

    //store
    useEffect(() => {
        window.sessionStorage.setItem(key,data);
    }, [data])

    return [data,setData];
}
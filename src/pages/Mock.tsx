
import { useEffect, useState } from 'react';
import ExportExcel from '../excel/ExportExcel'
import axios from 'axios';


const Mock = () => {
    const[data,setData] = useState<any>();
    useEffect(()=>{
      axios.get("http://localhost:8080/api/employee?pageNo=3").then((response)=>{
        console.log("useEffect executed")
        setData(response.data.content);
      })
    },[])

  return (
    <div>
        {/* <ExportExcel excelData={data} fileName={"Excel Export"}/> */}
    </div>
  )
}

export default Mock
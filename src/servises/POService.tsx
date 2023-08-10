import React from "react";

import axios from "axios";





const PO_API_BASE_URL="http://localhost:8080/api/po";

const PO_API_BASE_URL_TO_GET="http://localhost:8080/api/pos"




const headers={

    'Content-Type':'application/json'

}




class POService{




    getPO(){




        return axios.get(PO_API_BASE_URL_TO_GET);




    }




    getPOById(id:number){

        return axios.get(`${PO_API_BASE_URL}/${id}`);

    }




    createPO(po: any){

        return axios.post(PO_API_BASE_URL,po);

    }




    updatePO(po:any){

        return axios.put(PO_API_BASE_URL,po);


    }




    deletePO(id:number){

        return axios.delete(`${PO_API_BASE_URL}/${id}`);

    }

    async getPoByPage(pageNo:number){
        return await axios.get(`${PO_API_BASE_URL}?pageNo=${pageNo}`);
    }


    async getTotalNoOfPo(){
        return await axios.get(`${PO_API_BASE_URL}/total`)
    }




}

export default new POService
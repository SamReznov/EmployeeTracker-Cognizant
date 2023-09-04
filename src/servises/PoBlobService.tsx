import React from "react";

import axios from "axios";





const PO_BLOB_API_BASE_URL="http://localhost:8080/api/po-blob";





const headers={

    'Content-Type':'application/json'

}




class PoBlobService{




    



    sendPoBlobData(poBlobData: any){
        
        // axios({
        //     method: "post",
        //     url: "http://localhost:8080/api/po-blob",
        //     data: poBlobData,
        //     // headers: { "Content-Type": "multipart/form-data" },
        //   })
        //     .then(function (response) {
        //       //handle success
        //       console.log(response);
        //     })
        //     .catch(function (response) {
        //       //handle error
        //       console.log(response);
        //     });

        return axios.post(PO_BLOB_API_BASE_URL, poBlobData);

    }




    


}

export default new PoBlobService
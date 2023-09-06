

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import './PoList.scss'

import POEntity from "../../components/POEntity";
import POService from "../../servises/POService";
import { Pagination } from "@mui/material";
import {poInterface,poPageInterface} from '../../dataIntefaces/interfaces';
import SearchBar from "../../components/SearchBar";



const POList = () => {
  
  const [poPage,setPoPage] = useState<poPageInterface>();
  const [page ,setPage] = useState<number>(1);
  const [noOfPages,setNoOfPages] = useState<number|undefined>(1);
  const [searchedPoId,setSearchedPoId] = useState<string|any>("");
  const [errorMessage,setErrorMessage ] = useState("");
  
  const onSearchHandler = (e:any)=>{
    setNoOfPages(1);
    setPage(1);
    setSearchedPoId(e);
    console.log("clicked")
  }

    useEffect(()=>{
      
      POService.getPoByPageAndPoId(page,searchedPoId).then((response)=>{
        setPoPage(response.data)
        setNoOfPages(response.data.totalPages)
        setErrorMessage("");
      })
      .catch((err)=>{
        console.log(err.response.data)
        setErrorMessage(err.response.data)
      })
    },[page,noOfPages,searchedPoId])


    return (
      <div>
        <SearchBar onSearchHandler={onSearchHandler}/>
       {errorMessage ===""? <div className="App">
        <div className="table-container" role="table" aria-label="Destinations">
        
          <div className="flex-table header" role="rowgroup">
            <div className="flex-row first" role="columnheader">
             PO Number
            </div>

          
            <div className="flex-row" role="columnheader">
              PO Manager
            </div>
  
            <div className="flex-row" role="columnheader">
              Issue Date
            </div>
  
            <div className="flex-row" role="columnheader">
              Expiry Date
            </div>
  
            <div className="flex-row" role="columnheader">
              Extenstion Date
            </div>

            <div className="flex-row" role="columnheader">
              Update Operation
            </div>

            <div className="flex-row" role="columnheader">
              Extra Detail
            </div>
  
            {/* <div className="flex-row" role="columnheader">
              Account
            </div>
            <div className="flex-row" role="columnheader">
              Account
            </div> */}
            
            
          </div>
  
          {poPage?.content.map((item: poInterface, index: number) => {
            return (
              <div>
                <POEntity {...{ ...item }}/>
              </div>
            );
          })}
        </div>
        <Pagination className="pagination"
         count={noOfPages}
         size="large"
         color="secondary"
         variant="outlined"
         shape="rounded"
         defaultPage={1}
         onChange={(event,value)=>{setPage(value)}}
         />
      </div>:<div className="errorMessage">{errorMessage}</div>}
      </div>
    );
}
export default POList;
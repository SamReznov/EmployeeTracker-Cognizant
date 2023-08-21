import React from 'react'
import { MDBCol, MDBBtn } from "mdb-react-ui-kit";

const SearchBar = (props:any) => {
  const onClickHandler = (e:any)=>{
    e.preventDefault();
    props.onSearchHandler()
    
  }
  return (
    <div style={{display:'flex'}}>
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" style={{width:400,margin:"10px"}}/>
          <button   className="mr-auto btn btn-primary" onClick={onClickHandler} style={{width:"max-content",height:"40px" ,marginTop:"10px"}}>
          Search
        </button>
    </div>
  )
}

export default SearchBar
import React, { useState } from 'react'
import { MDBCol, MDBBtn } from "mdb-react-ui-kit";

const SearchBar = ({onSearchHandler}:any) => {
  const [data,setData]  = useState("");

  const onClickHandler = (e:any)=>{
    e.preventDefault();
    onSearchHandler(data)
  }
  const onChangeHandler = (e:any)=>{
    setData(e.target.value)
    onSearchHandler(e.target.value)
    console.log(e.target.value)
  }
  return (
    <div style={{display:'flex'}}>
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" style={{width:400,margin:"10px"}} value={data} onChange={onChangeHandler} />
          <button   className="mr-auto btn btn-primary" onClick={onClickHandler} style={{width:"max-content",height:"40px" ,marginTop:"10px"}}>
          Search
        </button>
    </div>
  )
}

export default SearchBar
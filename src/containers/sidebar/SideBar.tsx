import React, { useEffect, useState } from "react";
import './SideBar.scss';
import Button from 'react-bootstrap/Button';


import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

interface PropsType{
  label:string|undefined
  routes:string[]|undefined
}

const SideBar = ({label,routes}:PropsType) => {
    
  

  const user  = useSelector((state:any)=>state.user.currentUser)
    const[show1,setShow1]=useState<boolean|undefined>(false)
    const[show2,setShow2]=useState<boolean|undefined>(false)
    const navigate = useNavigate();//This is for navigating within pages
   
    const onClickHandlerAdd = ()=>{
        console.log("Clicked")
        navigate(`${routes?.at(0)}`)
    }
    const onClickHandlerUpdate = ()=>{
      console.log("Clicked")
      navigate(`${routes?.at(1)}`)
  }

    const onClickHandlerDelete = ()=>{
        console.log("Clicked")
        navigate(`${routes?.at(2)}`)
    }

    useEffect(()=>{
      console.log("---LABEL----"+label)
      if(label=="PRESET"){
        setShow1(false)
      }else{
        setShow1(true)
      }
      if(label=="EMPLOYEE"){
        setShow2(false)
      }else{
        setShow2(true)
      }
    },[label])

 

    return(
      <div >
        {user && show1 && <Button className="element-style" variant="outline-success" onClick={onClickHandlerAdd}>ADD {label} </Button>}{' '} 
        {user && show1 && show2 && <Button className="element-style"variant="outline-info" onClick={onClickHandlerUpdate}>UPDATE {label}</Button>}{' '}
        {user && show1 && <Button className="element-style"variant="outline-danger" onClick={onClickHandlerDelete}>DELETE {label}</Button>}{' '}
        
        {user && !show1 && <Button className="element-style" variant="outline-success" onClick={()=>{console.log("Update Role Clicked")}}>ADD ROLE TO PROJECT {label} </Button>}{' '} 
        {user && !show1 && <Button className="element-style"variant="outline-info" onClick={()=>{console.log("Update Service Clicked")}}>ADD SERVICE TO PROJECT {label}</Button>}{' '}
          
      </div>
    );
}
export default SideBar;
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './DeletePO.scss'
import AppHeader from '../../containers/header/AppHeader';
import AppFooter from '../../containers/footer/AppFooter';
import POService from '../../servises/POService';
import POEntity from '../../components/POEntity';
import {poInterface} from '../../dataIntefaces/interfaces'
import POList from './POList';

const DeletePO = () => {
    const [item, setItem] = useState<poInterface[]>([]);
    const navigate = useNavigate();
    const [id, setId] = useState<string>();
    const [formError, setFormError] = useState<string>();
    const [response,setResponse]=useState<any>("")
  
    useEffect(() => {
      POService.getPO().then((res) => {
         setItem(res.data);
     });
    }, []);

    // useEffect(()=>{
    //   console.log("---Use Effect called---")
    // },[response])
  
    //handling local storage
  
    const deleteItems = () => {
      setFormError(validate());
  
      if (id?.toString().trim().length !== 0 && !isNaN(Number(id))) {
        console.log(item);
        const items = item;
        console.log(items);
        console.log("Id :" + id);
        items.forEach((item:poInterface) => console.log(item.poNumber));
        const foundItem = items.find((item) => Number(item.poNumber) === Number(id));
        console.log("Found Items" + foundItem);
  
        if (foundItem) {
          POService.deletePO(Number(id))
          .then(response=>{
            setResponse(response.data)
            console.log(response.data)
          }).catch(err=>{
            
          })
          item.filter((po) => Number(po.poNumber) !== Number(id));
          toast.success(`PO deleted successfully with id : ${id}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose : ()=>{navigate("/PoData")}
          });
        } else {
          toast.info(`PO with id : ${id} is not present`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    };
  
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setId(e.target.value);
      setFormError("");
    };
  
    const validate = () => {
      let errors = "";
      const regexId = /^[0-9]*$/;
      
      if (!id) {
        errors = "PO Id is required!";
      } else if (!regexId.test(id)) {
        errors = "PO Id should be digits only!";
      }
  
      return errors;
    };
  
    return (
      <>
      <AppHeader/>
        <div>
          <h3>Delete PO using Id</h3>
  
          <div className="wrap-delete">
            <input
              className="input-text"
              type="text"
              value={id}
              placeholder="Enter the Id"
              onChange={onChange}
            />
  
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={deleteItems}
            >
              Delete
            </button>
          </div>
  
          <div className="error-delete">
            <p>{formError}</p>
          </div>
  
          <ToastContainer />
  
          <POList/>
            
            <Button
              className="flex-row addTopSpace"
              variant="outline-info"
              onClick={() => {
                navigate(`/`);
              }}
            >
              Home
            </Button>{" "}
          
        </div>
        <AppFooter/>
      </>
    );
}

export default DeletePO
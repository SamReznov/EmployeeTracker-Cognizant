import React, { ChangeEvent, useEffect, useState } from "react";

import "./DeleteEmployee.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import EmployeeService from "../../servises/EmployeeService";
import { employeeInterface, employeePageInterface } from "../../dataIntefaces/interfaces";
import Entity from "../../components/Entity";
import { Pagination } from "@mui/material";
import EmployeeList from "./EmployeeList";
import AppHeader from "../../containers/header/AppHeader";
import AppFooter from "../../containers/footer/AppFooter";
import { useSelector } from "react-redux";

const DeleteEmployee = () => {
  const [item, setItem] = useState<any[]>([]);
  const navigate = useNavigate();
  const [id, setId] = useState<string>();
  const [formError, setFormError] = useState<string>();

  const userDetails  = useSelector((state:any)=>state.user.currentUser)
 
  useEffect(() => {
    EmployeeService.getEmployee().then((res) => {
      setItem(res.data);
    });
  },[]);
  



  const deleteItems = () => {
    setFormError(validate());

    if (id?.toString().trim().length !== 0 && !isNaN(Number(id))) {
      console.log(item);
      const items = item;
      console.log(items);
      console.log("Id :" + id);
      items.forEach((item) => console.log(item.ctsEmpId));
      const foundItem = items.find((item) => item.ctsEmpId == id);
      console.log("Found Items" + foundItem);

      if (foundItem) {
        EmployeeService.deleteEmployee(Number(id),userDetails.token);
        item.filter((employee) => employee.ctsEmpId !== id);
        toast.success(`Employee deleted successfully with id : ${id}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose:() => navigate('/')
        });
      } else {
        toast.info(`Employee with id : ${id} is not present`, {
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
      errors = "Id is required!";
    } else if (!regexId.test(id)) {
      errors = "Id should be digits only!";
    }

    return errors;
  };

  return (
    <>
      <AppHeader/>
      <div>
        <h3>Delete Employee using Id</h3>

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

        <div className="table-container" role="table" aria-label="Destinations">
          
          <EmployeeList/>
          {/* {employeePage?.content.map((item: employeeInterface, index: any) => {
          return (
            <div>
              <Entity {...{ ...item }}/>
            </div>
          );
         })}

       <Pagination className="pagination"
        count={noOfPages}
        size="large"
        color="secondary"
        variant="outlined"
        shape="rounded"
        defaultPage={1}
        onChange={(event,value)=>{setPage(value)}}/> */}
          
          <Button className="flex-row addTopSpace" variant="outline-info" onClick={() => {navigate(`/`) }}>Home</Button>{" "}
        </div>
      </div>
      <AppFooter/>

    </>
  );
};
export default DeleteEmployee;

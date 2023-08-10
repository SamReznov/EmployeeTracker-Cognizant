import { log } from "console";

import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import EmployeeService from "../../servises/EmployeeService";
import AppHeader from "../../containers/header/AppHeader";
import AppFooter from "../../containers/footer/AppFooter";

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    ctsEmpId: "",
    empFirstName: "",
    empLastName: "",
    empEmail: "",
    empPhone: "",
    empLocation: "",
    empStartDate: "",
    empEndDate: "",
    teamName: "",
  });

  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [objIndex, setObjIndex] = useState(0)
  const navigate = useNavigate();
  const param = useParams();
  console.log(param.id);

  useEffect(() => {
    EmployeeService.getEmployeeById(Number(param.id))

      .then((response: any) => {
        let existEmp = response.data;

        setEmployee({

          ctsEmpId: existEmp.ctsEmpId,
          empFirstName: existEmp.empFirstName,
          empLastName: existEmp.empLastName,
          empEmail: existEmp.empEmail,
          empPhone: existEmp.empPhone,
          empLocation: existEmp.empLocation,
          empStartDate: existEmp.empStartDate,
          empEndDate: existEmp.empEndDate,
          teamName: existEmp.teamName,
        });
      })

      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const onChangeHandler = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployee({ ...employee, [name]: value });
  };

  const onClickHandler = (e: any) => {
    e.preventDefault();
    console.log(employee);
    EmployeeService.updateEmployee(employee);

    //alert("User updated successfully!");

    toast.success('User updated successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose:()=>navigate("/")
        })
    
  };

  return (
    <div>
      <AppHeader/>
      <div className="container">
      <div className="wrapper">
        <h2>Update Employee</h2>

        <form className="form-style">
          <div>
            <input
              className="input-style"
              placeholder="Id"
              name="ctsEmpId"
              value={employee.ctsEmpId}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <input
              className="input-style"
              placeholder="First Name"
              name="empFirstName"
              value={employee.empFirstName}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <input
              className="input-style"
              placeholder="Last Name"
              name="empLastName"
              value={employee.empLastName}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <input
              className="input-style"
              placeholder="Email"
              name="empEmail"
              value={employee.empEmail}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <input
              className="input-style"
              placeholder="Phone"
              name="empPhone"
              value={employee.empPhone}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <input
              className="input-style"
              placeholder="Location"
              name="empLocation"
              value={employee.empLocation}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <input
              type="date"
              className="input-style"
              placeholder="Employee Start Date"
              name="empStartDate"
              value={employee.empStartDate}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <input
              type="date"
              className="input-style"
              name="empEndDate"
              value={employee.empEndDate}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <input
              className="input-style"
              placeholder="Team"
              name="teamName"
              value={employee.teamName}
              onChange={onChangeHandler}
            />
          </div>

          <button
            className="btn btn-outline-info submit-button"
            onClick={onClickHandler}
          >
            Update Employee
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
      <AppFooter/>
    </div>
  );
};

export default UpdateEmployee;

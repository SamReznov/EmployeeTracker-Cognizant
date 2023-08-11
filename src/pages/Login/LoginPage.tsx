import React, { useState } from "react";
import "./LoginPage.scss";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { login } from "../../redux/apiCalls";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

interface creditentials{
  username:string|undefined,
  password:string|undefined
}

const LoginPage = () => {
  const [LoginDetails,setLoginDetails] = useState<creditentials|any>();
  const dispatch = useDispatch()
  const{isFetching,error} = useSelector((state:any)=>state.user)
  const user = useSelector((state:any)=>state.user)
  const navigate = useNavigate();

  const onChangeHandler =(e: { target: { name: any; value: any } })=>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(LoginDetails);
    setLoginDetails({ ...LoginDetails, [name]: value })   
  }

  const onClickHandler = (e:any)=>{
    console.log("___Clicked");
    e.preventDefault()
    login(dispatch,LoginDetails)
  }
 

  return (
    <div className="loginDesign">
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-50">
          <MDBCol col="12">
            <MDBCard className="bg-light my-4 text-color mx-auto" style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-200">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-color mb-2">
                  Please enter your login and password!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-color"
                  label="Email address"
                  name="username"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  onChange={onChangeHandler}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-color"
                  name="password"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  onChange={onChangeHandler}
                />

                <Button variant="primary" size="lg" onClick={onClickHandler}>
                  Log In
                </Button>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a onClick={()=>{navigate('/register')}} className="text-color fw-bold btn-primary">
                      Sign Up
                    </a>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer/>
    </div>
  );
};

export default LoginPage;

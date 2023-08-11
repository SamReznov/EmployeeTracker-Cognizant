import './SignUpPage.scss'
import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import UserService from '../../servises/UserService';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';



const SignUpPage = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    ctsEmpId: ""
  }

  const navigate=useNavigate();
  const [userdata, setUserData] = useState<any>(initialValues)

  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);


  const onChangeHandler = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setUserData({ ...userdata, [name]: value });
    setFormErrors(initialValues);

  }
  const onSubmitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("--------------" + userdata);
    setFormErrors(validate(userdata));
    setIsSubmit(true);

  }



  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (
        userdata.firstName &&
        userdata.lastName &&
        userdata.email &&
        userdata.password &&
        userdata.ctsEmpId
      ) {
        console.log(userdata)
        UserService.registerUser(userdata)
          .then(response => {
            console.log(response.data)
            toast.success(`${response.data}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => navigate("/login"),
            });
          })
          .catch(error => {
            console.log(error)
            toast.warning(`${error.response.data}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          })
      }
    }
  }, [formErrors])
  const validate = (values: any) => {
    const errors: any = {};
    const regexId = /^[0-9]*$/;
    const regexName = /^[A-Za-z\s]{2,50}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      errors.firstName = "First name is required!";
    } else if (!regexName.test(values.firstName)) {
      errors.firstName = "First name should me minimum of 2 characters!";
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    } else if (!regexName.test(values.lastName)) {
      errors.lastName = "Last name should me minimum of 2 characters!";
    }

    if (!values.ctsEmpId) {
      errors.ctsEmpId = "Id is required!";
    } else if (!regexId.test(values.ctsEmpId)) {
      errors.ctsEmpId = "Id should be digits only!";
    }
    if (!values.email) {
      errors.email = "email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }


    return errors;
  };
  return (
    <div className='signupDesign'>
      <MDBContainer fluid className='p-4'>

        <MDBRow>

          <MDBCol md='5' className='text-center text-md-start d-flex flex-column justify-content-center'>

            <h1 className="my-4 display-3 fw-bold ls-tight px-3">
              Cognizant <br />
              <span className="text-primary">Intuition Engineered</span>
            </h1>

            <p className='text-color px-3' >
            Cognizant's streamlined signup page offers a seamless onboarding experience, combining user-friendly design with robust security measures. Join our community effortlessly and unlock a world of opportunities with just a few clicks. Your journey with Cognizant starts here.
            </p>

          </MDBCol>

          <MDBCol md='7'>

            <MDBCard className='bg-light text-color my-4 mx-auto'>
              <MDBCardBody className='p-3'>

                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' name='firstName' value={userdata.firstName} label='First name' id='form1' type='text' onChange={onChangeHandler}/>
                    <p className="error-message">{formErrors.firstName}</p>
                  </MDBCol>

                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' name='lastName' value={userdata.lastName} label='Last name' id='form1' type='text' onChange={onChangeHandler}/>
                    <p className="error-message">{formErrors.lastName}</p>
                  </MDBCol>
                </MDBRow>

                <MDBInput wrapperClass='mb-4' name='ctsEmpId' value={userdata.ctsEmpId} label='Employee Id' id='form1' type='text' onChange={onChangeHandler}/>
                <p className="error-message">{formErrors.ctsEmpId}</p>

                <MDBInput wrapperClass='mb-4' name='email' value={userdata.email} label='Email' id='form1' type='email' onChange={onChangeHandler}/>
                <p className="error-message">{formErrors.email}</p>

                <MDBInput wrapperClass='mb-4' name='password' value={userdata.password} label='Password' id='form1' type='password' onChange={onChangeHandler}/>
                <p className="error-message">{formErrors.password}</p>

                <MDBRow>
                  <MDBCol col='6'>
                    <Button className='w-100 mb-6 primary' onClick={onSubmitHandler}>Sign Up</Button>
                  </MDBCol>
                  <MDBCol col='6'>
                    <Button className='w-100 mb-4 btn-secondary' onClick={()=>{navigate('/login')}} >
                        Back to Login
                    </Button>
                  </MDBCol>
                </MDBRow>

              </MDBCardBody>
            </MDBCard>

          </MDBCol>

        </MDBRow>

      </MDBContainer>
      <ToastContainer />
    </div>
  )
}

export default SignUpPage
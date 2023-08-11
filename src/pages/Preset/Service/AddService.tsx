import React, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom';
import './AddService.scss';
import { ToastContainer, toast} from "react-toastify";
import AccountService from '../../../servises/AccountService';
import ServicesService from '../../../servises/ServicesService';
import AppHeader from '../../../containers/header/AppHeader';
import AppFooter from '../../../containers/footer/AppFooter';

function AddService() {
    const initialValues={
        serviceId:"",
        serviceName:""
    }

    const navigate=useNavigate();
    const[service,setService]=useState<any>(initialValues)

    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setService({...service,[name]:value});
        setFormErrors(initialValues);

    }
    
    const onSubmitHandler=(event:{ preventDefault: () => void })=>{
        event.preventDefault();
        console.log("--------------"+service);
        setFormErrors(validate(service));
        setIsSubmit(true); 
    
    }

    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (
                service.serviceId &&
                service.serviceName
            ){
                ServicesService.createService(service)
                .then(response => {
                    console.log(response)
                    toast.success("Service added successfully!", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        onClose: () => navigate("/Preset"),
                    });
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    },[formErrors])
    const validate = (values: any) => {
        const errors: any = {};
        const regexId = /^[0-9]*$/;
        const regexName = /^[A-Za-z\s]{2,50}$/;
        
        if (!values.serviceId) {
            errors.serviceId = "Id is required!";
        } else if (!regexId.test(values.serviceId)) {
            errors.serviceId = "Id should be digits only!";
        }

        if (!values.serviceName) {
            errors.serviceName = "Service name is required!";
        } else if (!regexName.test(values.serviceName)) {
            errors.serviceName = "Service name should me minimum of 2 characters!";
        }
        return errors;
    };

    
  return (
    <div>
        <AppHeader/>
        <div className='container'>
            <div className='row p-2'>
                <div className='card'>
                    <h4 className='text-center p-2'>Add New Service</h4>
                    <div className='card-body'>
                        <form>
                            <div className='form-group p-2'>
                                <label>Service Id: </label>
                                <input placeholder='Service Id' name='serviceId' className='form-control' value={service.serviceId} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.serviceId}</p>
                            </div>
                            <div className='form-group p-2'>
                                <label>Service Name: </label>
                                <input placeholder='Service Name' name='serviceName' className='form-control' value={service.serviceName} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.serviceName}</p>
                            </div>
                            <div className='text-center'>
                            <button className='btn btn-outline-success' onClick={onSubmitHandler}>Add Service</button>
                            </div>          
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        <AppFooter/>
    </div>
  )
}

export default AddService
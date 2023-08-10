import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import './UpdateService.scss';
import { ToastContainer, toast} from "react-toastify";
import ServicesService from '../../../servises/ServicesService';

interface serviceInterface{
    serviceId: string|undefined,
    serviceName: string
  }

function UpdateService() {

    const params=useParams();

    const initialValues={
        serviceId: params.id,
        serviceName:""
    }

    const navigate=useNavigate();
    const[service,setService]=useState<serviceInterface>(initialValues);
    

    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        ServicesService.getServiceById(Number(service.serviceId))
          .then((response: any) => {
            let existService = response.data;
            console.log("---Exist Service---"+existService.serviceId)
            setService({
              serviceId : existService.serviceId,
              serviceName : existService.serviceName
            });
          })
          .catch((error: any) => {
            console.log(error.response.data);
          });
      }, []);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setService({...service,[name]:value});
        setFormErrors(initialValues);

    }
    
    const onUpdateHandler=(event:{ preventDefault: () => void })=>{
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
                ServicesService.updateService(service)
                .then(response => {
                    console.log(response)
                    toast.success("Service updated successfully!", {
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
        <div className='container'>
            <div className='row p-2'>
                <div className='card'>
                    <h4 className='text-center p-2'>Update Service</h4>
                    <div className='card-body'>
                        <form>
                            <div className='form-group p-2'>
                                <label>Service Id: </label>
                                <input placeholder='Service Id' name='serviceId' className='form-control' value={service.serviceId} onChange={onChangeHandler}/>
                            </div>
                            <div className='form-group p-2'>
                                <label>Service Name: </label>
                                <input placeholder='Service Name' name='serviceName' className='form-control' value={service.serviceName} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.serviceName}</p>
                            </div>
                            <div className='text-center'>
                            <button className='btn btn-outline-success' onClick={onUpdateHandler}>Update Service</button>
                            </div>          
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default UpdateService
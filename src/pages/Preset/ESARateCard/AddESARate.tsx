import React, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom';
import './AddESARate.scss';
import { ToastContainer, toast} from "react-toastify";
import AccountService from '../../../servises/AccountService';
import EsaRateCardService from '../../../servises/EsaRateCardService';
import ESARateCardList from './ESARateCardList';
import AppHeader from '../../../containers/header/AppHeader';
import AppFooter from '../../../containers/footer/AppFooter';

function AddESARate() {
    const initialValues={
        esaValue:"",
        esaAlphanumericValue:""
    }

    const navigate=useNavigate();
    const[esaRate,setEsaRate]=useState<any>(initialValues)

    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setEsaRate({...esaRate,[name]:value});
        setFormErrors(initialValues);

    }
    
    const onSubmitHandler=(event:{ preventDefault: () => void })=>{
        event.preventDefault();
        console.log("--------------"+esaRate);
        setFormErrors(validate(esaRate));
        setIsSubmit(true); 
    
    }

    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (
                esaRate.esaValue &&
                esaRate.esaAlphanumericValue
            ){
                EsaRateCardService.createEsaRate(esaRate)
                .then(response => {
                    console.log(response)
                    toast.success("ESA Rate added successfully!", {
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
        const regexId = /^\d*\.?\d+$/;
        const regexName = /^[A-Za-z0-9_]{2,50}$/;
        
        if (!values.esaValue) {
            errors.esaValue = "ESA Value is required!";
        } else if (!regexId.test(values.esaValue)) {
            errors.esaValue = "ESA Value should be digits only!";
        }

        if (!values.esaAlphanumericValue) {
            errors.esaAlphanumericValue = "ESA Alpha Numeric Value is required!";
        } else if (!regexName.test(values.esaAlphanumericValue)) {
            errors.esaAlphanumericValue = "ESA Aplha Numeric value should me minimum of 2 characters!";
        }
        return errors;
    };

    
  return (
    <div>
        <AppHeader/>
        <div className='container'>
            <div className='row p-2'>
                <div className='card'>
                    <h4 className='text-center p-2'>Add New ESA Rate</h4>
                    <div className='card-body'>
                        <form>
                            <div className='form-group p-2'>
                                <label>ESA Value: </label>
                                <input placeholder='ESA Value' name='esaValue' className='form-control' value={esaRate.esaValue} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.esaValue}</p>
                            </div>
                            <div className='form-group p-2'>
                                <label>ESA Alpha Numeric Value: </label>
                                <input placeholder='ESA Alpha Numeric Value' name='esaAlphanumericValue' className='form-control' value={esaRate.esaAlphanumericValue} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.esaAlphanumericValue}</p>
                            </div>
                            <div className='text-center'>
                            <button className='btn btn-outline-success' onClick={onSubmitHandler}>Add ESA Rate</button>
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

export default AddESARate
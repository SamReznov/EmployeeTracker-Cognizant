import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import './UpdateESARate.scss';
import { ToastContainer, toast} from "react-toastify";
import EsaRateCardService from '../../../servises/EsaRateCardService';
import AppHeader from '../../../containers/header/AppHeader';
import AppFooter from '../../../containers/footer/AppFooter';

interface esaRateInterface{
    esaAlphanumericValue: string|undefined,
    esaValue: string
  }

function UpdateESARate() {

    const params=useParams();

    const initialValues={
        esaAlphanumericValue: params.id,
        esaValue:""
    }

    const navigate=useNavigate();
    const[esaRate,setESARate]=useState<esaRateInterface>(initialValues);
    

    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        EsaRateCardService.getEsaRateById(String(esaRate.esaAlphanumericValue))
          .then((response: any) => {
            let existESA = response.data;
            setESARate({
              esaValue : existESA.esaValue,
              esaAlphanumericValue : existESA.esaAlphanumericValue
            });
          })
          .catch((error: any) => {
            console.log(error.response.data);
          });
      }, []);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setESARate({...esaRate,[name]:value});
        setFormErrors(initialValues);

    }
    
    const onUpdateHandler=(event:{ preventDefault: () => void })=>{
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
                EsaRateCardService.updateEsaRate(esaRate)
                .then(response => {
                    console.log(response)
                    toast.success("ESA Rate updated successfully!", {
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
                    <h4 className='text-center p-2'>Update ESA Rate</h4>
                    <div className='card-body'>
                        <form>
                        <div className='form-group p-2'>
                                <label>ESA Alpha Numeric Value: </label>
                                <input placeholder='ESA Alpha Numeric Value' name='esaAlphanumericValue' className='form-control' value={esaRate.esaAlphanumericValue} onChange={onChangeHandler}/>
                            </div>
                            <div className='form-group p-2'>
                                <label>ESA Value: </label>
                                <input placeholder='ESA Value' name='esaValue' className='form-control' value={esaRate.esaValue} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.esaValue}</p>
                            </div>
                            <div className='text-center'>
                            <button className='btn btn-outline-success' onClick={onUpdateHandler}>Update ESA Rate</button>
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

export default UpdateESARate
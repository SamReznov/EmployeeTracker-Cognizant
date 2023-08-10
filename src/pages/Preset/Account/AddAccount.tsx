import React, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom';
import './AddAccount.scss';
import { ToastContainer, toast} from "react-toastify";
import AccountService from '../../../servises/AccountService';

function AddAccount() {
    const initialValues={
        accountId:"",
        accName:""
    }

    const navigate=useNavigate();
    const[account,setAccount]=useState<any>(initialValues)

    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setAccount({...account,[name]:value});
        setFormErrors(initialValues);

    }
    
    const onSubmitHandler=(event:{ preventDefault: () => void })=>{
        event.preventDefault();
        console.log("--------------"+account);
        setFormErrors(validate(account));
        setIsSubmit(true); 
    
    }

    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (
                account.accountId &&
                account.accName
            ){
                AccountService.createAccount(account)
                .then(response => {
                    console.log(response)
                    toast.success("Account added successfully!", {
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
        
        if (!values.accountId) {
            errors.accountId = "Id is required!";
        } else if (!regexId.test(values.accountId)) {
            errors.accountId = "Id should be digits only!";
        }

        if (!values.accName) {
            errors.accName = "Account name is required!";
        } else if (!regexName.test(values.accName)) {
            errors.accName = "Account name should me minimum of 2 characters!";
        }
        return errors;
    };

    
  return (
    <div>
        <div className='container'>
            <div className='row p-2'>
                <div className='card'>
                    <h4 className='text-center p-2'>Add New Account</h4>
                    <div className='card-body'>
                        <form>
                            <div className='form-group p-2'>
                                <label>Account Id: </label>
                                <input placeholder='Account Id' name='accountId' className='form-control' value={account.accountId} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.accountId}</p>
                            </div>
                            <div className='form-group p-2'>
                                <label>Account Name: </label>
                                <input placeholder='Account Name' name='accName' className='form-control' value={account.accName} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.accName}</p>
                            </div>
                            <div className='text-center'>
                            <button className='btn btn-outline-success' onClick={onSubmitHandler}>Add Account</button>
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

export default AddAccount
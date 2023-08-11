import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import './UpdateAccount.scss';
import { ToastContainer, toast} from "react-toastify";
import AccountService from '../../../servises/AccountService';
import AppHeader from '../../../containers/header/AppHeader';
import AppFooter from '../../../containers/footer/AppFooter';

interface accountInterface{
    accountId: string|undefined,
    accName: string
  }

function UpdateAccount() {

    const params=useParams();

    const initialValues={
        accountId: params.id,
        accName:""
    }

    const navigate=useNavigate();
    const[account,setAccount]=useState<accountInterface>(initialValues);
    

    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        AccountService.getAccountById(Number(account.accountId))
          .then((response: any) => {
            let existAccount = response.data;
            console.log("---Exist Account---"+existAccount.accountId)
            setAccount({
              accountId : existAccount.accountId,
              accName : existAccount.accName
            });
          })
          .catch((error: any) => {
            console.log(error.response.data);
          });
      }, []);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setAccount({...account,[name]:value});
        setFormErrors(initialValues);

    }
    
    const onUpdateHandler=(event:{ preventDefault: () => void })=>{
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
                AccountService.updateAccount(account)
                .then(response => {
                    console.log(response)
                    toast.success("Account updated successfully!", {
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
        <AppHeader/>
        <div className='container'>
            <div className='row p-2'>
                <div className='card'>
                    <h4 className='text-center p-2'>Update Account</h4>
                    <div className='card-body'>
                        <form>
                            <div className='form-group p-2'>
                                <label>Account Id: </label>
                                <input placeholder='Account Id' name='accountId' className='form-control' value={account.accountId} onChange={onChangeHandler}/>
                            </div>
                            <div className='form-group p-2'>
                                <label>Account Name: </label>
                                <input placeholder='Account Name' name='accName' className='form-control' value={account.accName} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.accName}</p>
                            </div>
                            <div className='text-center'>
                            <button className='btn btn-outline-success' onClick={onUpdateHandler}>Update Account</button>
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

export default UpdateAccount
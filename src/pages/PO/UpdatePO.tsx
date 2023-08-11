import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import { ToastContainer, toast} from "react-toastify";
import AppFooter from '../../containers/footer/AppFooter';
import POService from '../../servises/POService';
import AppHeader from '../../containers/header/AppHeader';
import AccountService from '../../servises/AccountService';


interface accountInterface{
    accountId: string|undefined,
    accName: string
  }
  export interface poInterface{
    poNumber: string|undefined,
    poManager: string,
    dateIssued:string,
    expiryDate: string,
    extension: string
    account:accountInterface|undefined
  }

function UpdatePO() {

    const params=useParams();

    const intialValues = {
      poNumber: params.id,
      poManager: "",
      dateIssued: "",
      expiryDate: "",
      extension: "",
      account:{
        accountId:"",
        accName:""
      }
    };
  
    const intialValueFormError = {
      poNumber: "",
      poManager: "",
      dateIssued: "",
      expiryDate: "",
      extension: "",
      account:"",
    };

    const navigate=useNavigate();
    const [po, setPo] = useState<poInterface>(intialValues);
    const[accounts,setAccounts]=useState<accountInterface[]>([]);
  
    //error
  
    const [formErrors, setFormErrors] = useState(intialValueFormError);
    const[validation,setValidation]=useState({
      account:""
    })
  
    const [isSubmit, setIsSubmit] = useState(false);
  

    useEffect(() => {
        POService.getPOById(Number(po.poNumber))
          .then((response: any) => {
            let existPo = response.data;
            console.log("---Exist Account---"+existPo)
            setPo({...po,
              poNumber: existPo.poNumber,
              poManager: existPo.poManager,
              dateIssued: existPo.dateIssued,
              expiryDate: existPo.expiryDate,
              extension: existPo.extension,
              account:{
                accountId:existPo.account.accountId,
                accName:existPo.account.accName
              }

              
            });
          })
          .catch((error: any) => {
            console.log(error.response.data);
          });
      }, []);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setPo({...po,[name]:value});
        setFormErrors(intialValueFormError);

    }
    
    const onUpdateHandler=(event:{ preventDefault: () => void })=>{
        event.preventDefault();
        console.log("--------------"+po);
        setFormErrors(validate(po));
        setIsSubmit(true); 
    
    }
    useEffect(()=>{
      AccountService.getAccount()
      .then((response)=>{
        // console.log(response.data)
        setAccounts(response.data)
      }).catch((error)=>{
        console.log(error)
      })
    },[])

    

    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (
              po.poNumber &&
              po.poManager &&
              po.dateIssued &&
              po.expiryDate 
            ){
                POService.updatePO(po)
                .then(response => {
                    console.log(response)
                    toast.success("PO updated successfully!", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        onClose: () => navigate("/"),
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
  
      const regexId = /^[0-9.0-9]*$/;
  
      const regexName = /^[A-Za-z\s]{2,50}$/;
  
      const regexGender =
        /^(?:m|M|male|Male|f|F|female|Female|FEMALE|MALE|Not prefer to say|not prefer to say|NOT PREFER TO SAY)$/;
  
      const regexMobile = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
      const regexAddName = /^[A-Za-z\s]+$/;
  
      if (!values.poNumber) {
        errors.poNumber = "PO Number is required!";
      } else if (!regexId.test(values.poNumber)) {
        errors.poNumber = "PO should be digits only!";
      }
  
      if (!values.poManager) {
        errors.poManager = "Manager is required!";
      } else if (!regexName.test(values.poManager)) {
        errors.poManager = "Manager should me minimum of 2 characters!";
      }
  
      if (!values.dateIssued) {
        errors.dateIssued = "Date of issue is required!";
      }
  
      if (!values.expiryDate) {
        errors.expiryDate = "Expiry Date is required!";
      }
  
      // if (!values.extension) {
      //   errors.extension = "Extension is required!";
      // }
  
      if(validation.account==="" || validation.account==="Select Account"){
        // console.log(values.project)
        errors.account="Account is required!"
      }
  
      return errors;
    };
  
    return (
      <>
      <AppHeader/>
      <div className="container">
        <div className="w-100">
          <h2>Update PO</h2>
  
          <form className="form-style">
            <div className='form-group p-2'>
              <label>PO Number: </label>  
              <input
                className="input-style"
                placeholder="PO Number"
                name="poNumber"
                value={po.poNumber}
                onChange={onChangeHandler}
              />
  
              <p className="error-message">{formErrors.poNumber}</p>
            </div>
  
            <div className='form-group p-2'>
              <label>PO Manager: </label>  
              <input
                className="input-style"
                placeholder="PO Manager"
                name="poManager"
                value={po.poManager}
                onChange={onChangeHandler}
              />
  
              <p className="error-message">{formErrors.poManager}</p>
            </div>
  
            <div className='form-group p-2'>
              <label>Issue Date: </label>  
              <input
                type="date"
                className="input-style"
                placeholder="Date Of Issue"
                name="dateIssued"
                value={po.dateIssued}
                onChange={onChangeHandler}
              />
  
              <p className="error-message">{formErrors.dateIssued}</p>
            </div>
  
            <div className='form-group p-2'>
              <label>Expiry Date: </label>  
              <input
                type="date"
                className="input-style"
                placeholder="Expiry Date"
                name="expiryDate"
                value={po.expiryDate}
                onChange={onChangeHandler}
              />
  
              <p className="error-message">{formErrors.expiryDate}</p>
            </div>
  
            <div className='form-group p-2'>
              <label>Extension Date: </label>  
              <input
                type="date"
                className="input-style"
                placeholder="Extension"
                name="extension"
                value={po.extension}
                onChange={onChangeHandler}
              />
  
              <p className="error-message">{formErrors.extension}</p>
            </div>
  
            <div className='form-group p-2'>
              <label>Account: </label>  
              <select name="account" onChange={(e)=>{
                  setValidation({...validation,account:e.target.value})
                  const a = accounts?.find((x) => Number(x.accountId) === Number(e.target.value));
                  setPo({...po,account:a})
              }}>
                <option value="Select Account">Select Account</option>
                {accounts
                  ? accounts.map((account:accountInterface) => {
                      return (
                        <option key={account.accountId} value={account.accountId}>
                          {account.accName}
                        </option>
                      );
                    })
                  : null}
                  <option value="Project Not Available">Account Not Available</option>
              </select>
              <p className="error-message">{formErrors.account}</p>
            </div>
  
            <button
              className="btn btn-outline-info submit-button"
              onClick={onUpdateHandler}
            >
              Update PO
            </button>
          </form>
        </div>
  
        <ToastContainer />
      </div>
      <AppFooter/>
      </>
    );
  };
  
  export default UpdatePO;
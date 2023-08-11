import React, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom';
import './AddRole.scss';
import { ToastContainer, toast} from "react-toastify";
import RoleService from '../../../servises/RoleService';
import AppHeader from '../../../containers/header/AppHeader';
import AppFooter from '../../../containers/footer/AppFooter';

function AddRole() {
    const initialValues={
        roleId:"",
        roleName:""
    }

    const navigate=useNavigate();
    const[role,setRole]=useState<any>(initialValues)

    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setRole({...role,[name]:value});
        setFormErrors(initialValues);

    }
    
    const onSubmitHandler=(event:{ preventDefault: () => void })=>{
        event.preventDefault();
        console.log("--------------"+role);
        setFormErrors(validate(role));
        setIsSubmit(true); 
    
    }

    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (
                role.roleId &&
                role.roleName
            ){
                RoleService.createRole(role)
                .then(response => {
                    console.log(response)
                    toast.success("Role added successfully!", {
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
        
        if (!values.roleId) {
            errors.roleId = "Id is required!";
        } else if (!regexId.test(values.roleId)) {
            errors.roleId = "Id should be digits only!";
        }

        if (!values.roleName) {
            errors.roleName = "Role name is required!";
        } else if (!regexName.test(values.roleName)) {
            errors.roleName = "Role name should me minimum of 2 characters!";
        }
        return errors;
    };

    
  return (
    <div>
        <AppHeader/>
        <div className='container'>
            <div className='row p-2'>
                <div className='card'>
                    <h4 className='text-center p-2'>Add New Role</h4>
                    <div className='card-body'>
                        <form>
                            <div className='form-group p-2'>
                                <label>Role Id: </label>
                                <input placeholder='Role Id' name='roleId' className='form-control' value={role.roleId} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.roleId}</p>
                            </div>
                            <div className='form-group p-2'>
                                <label>Role Name: </label>
                                <input placeholder='Role Name' name='roleName' className='form-control' value={role.roleName} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.roleName}</p>
                            </div>
                            <div className='text-center'>
                            <button className='btn btn-outline-success' onClick={onSubmitHandler}>Add Role</button>
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

export default AddRole
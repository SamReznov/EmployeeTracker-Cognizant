import React, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom';
import './AddProject.scss';
import { ToastContainer, toast} from "react-toastify";
import { projectInterface, roleInterface } from '../../../dataIntefaces/interfaces';
import ProjectService from '../../../servises/ProjectService';
import RoleService from '../../../servises/RoleService';
import { CloseButton } from 'react-bootstrap';

function AddProject() {
    const initialValues={
        projectId:"",
        projectName:""
    }

    const navigate=useNavigate();
    const[project,setProject]=useState<any>(initialValues)
    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setProject({...project,[name]:value});
        setFormErrors(initialValues);

    }
    
    const onSubmitHandler=(event:{ preventDefault: () => void })=>{
        event.preventDefault();
        console.log("--------------"+project);
        setFormErrors(validate(project));
        setIsSubmit(true); 
    
    }

    

    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (
                project.projectId &&
                project.projectName
            ){
                ProjectService.createProject(project)
                .then(response => {
                    console.log(response)
                    toast.success("Project added successfully!", {
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
        
        if (!values.projectId) {
            errors.projectId = "Id is required!";
        } else if (!regexId.test(values.projectId)) {
            errors.projectId = "Id should be digits only!";
        }

        if (!values.projectName) {
            errors.projectName = "Project name is required!";
        } else if (!regexName.test(values.projectName)) {
            errors.projectName = "Project name should me minimum of 2 characters!";
        }
        return errors;
    };

    
  return (
    <div>
        <div className='container'>
            <div className='row p-2'>
                <div className='col card'>
                    <h4 className='text-center p-2'>Add New Project</h4>
                    <div className='card-body'>
                        <form>
                            <div className='form-group p-2'>
                                <label>Project Id: </label>
                                <input placeholder='Project Id' name='projectId' className='form-control' value={project.projectId} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.projectId}</p>
                            </div>
                            <div className='form-group p-2'>
                                <label>Project Name: </label>
                                <input placeholder='Project Name' name='projectName' className='form-control' value={project.projectName} onChange={onChangeHandler}/>
                                <p className="error-message">{formErrors.projectName}</p>
                            </div>
                           
                            <div className='text-center'>
                            <button className='btn btn-outline-success' onClick={onSubmitHandler}>Add Project</button>
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

export default AddProject
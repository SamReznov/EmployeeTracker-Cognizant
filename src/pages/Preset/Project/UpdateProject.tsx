import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import './UpdateProject.scss';
import { ToastContainer, toast} from "react-toastify";
import ProjectService from '../../../servises/ProjectService';
import { roleInterface, serviceInterface } from '../../../dataIntefaces/interfaces';
import RoleService from '../../../servises/RoleService';
import { CloseButton } from 'react-bootstrap';
import ServicesService from '../../../servises/ServicesService';
import AppHeader from '../../../containers/header/AppHeader';
import AppFooter from '../../../containers/footer/AppFooter';

interface projectInterface{
    projectId: string|undefined,
    projectName: string,
    roleSet:roleInterface[]|undefined,
    servicesSet:serviceInterface[]|undefined
  }

function UpdateProject() {
    const [roleList,setRoleList] = useState<roleInterface[]|any>([]);
    const [selectedRoleList,setSelectedRoleList] = useState<roleInterface[]>([]);

    const [serviceList,setServiceList] = useState<serviceInterface[]|any>([]);
    const [selectedServiceList,setSelectedServiceList] = useState<serviceInterface[]>([]);

    const params=useParams();
    // const id=params.id;
    const initialValues={
        projectId: params.id,
        projectName:"",
        roleSet:[],
        servicesSet:[]
    }
    const navigate=useNavigate();
    const [project,setProject]=useState<projectInterface>(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);

    const onRoleSelectHandler = (e:any)=>{
        e.preventDefault();
        //setResult(result => [...result, response]);
        console.log(selectedRoleList)
        console.log(project)
        setSelectedRoleList(selectedRoleList=> [...selectedRoleList,roleList.find((role:roleInterface)=>{return role.roleName === e.target.value})])
        console.log(e.target.value)
        
        
    }
    const onRoleDeselectHandler = (e:any)=>{
        e.preventDefault();
        console.log(project)
        console.log(selectedRoleList)
        setSelectedRoleList(selectedRoleList.filter((role:roleInterface)=>{return role.roleName != e.target.value}))
        
    }
    const onServiceSelectHandler = (e:any)=>{
        e.preventDefault();
        setSelectedServiceList(selectedServiceList=> [...selectedServiceList,serviceList.find((service:serviceInterface)=>{return service.serviceName === e.target.value})])
        console.log(e.target.value)
    }
    const onServiceDeselectHandler = (e:any)=>{
        e.preventDefault();
        setSelectedServiceList(selectedServiceList.filter((service:serviceInterface)=>{return service.serviceName != e.target.value}))  
    }

    useEffect(()=>{
        RoleService.getRole()
        .then((response)=>{
            setRoleList(response.data)
        })
        .catch((err)=>{
            
        })
        ServicesService.getService()
        .then((response)=>{
            setServiceList(response.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })

    },[])


    useEffect(() => {
        ProjectService.getProjectById(Number(project.projectId))
          .then((response: any) => {
            let existProject = response.data;
            console.log("---Exist Project---"+existProject.projectId)
            setProject({
              projectId : existProject.projectId,
              projectName : existProject.projectName,
              roleSet:existProject.roleSet,
              servicesSet:existProject.servicesSet
            });
            setSelectedServiceList(response.data.servicesSet)
            setSelectedRoleList(response.data.roleSet)
          })
          .catch((error: any) => {
            console.log(error.response.data);
          });
      }, []);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setProject({...project,[name]:value});
        setFormErrors(initialValues);

    }
    
    const onUpdateHandler=(event:{ preventDefault: () => void })=>{
        event.preventDefault();
        setProject({...project,roleSet:selectedRoleList,servicesSet:selectedServiceList})
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
                console.log(project)
                ProjectService.updateAllValues(project)
                .then(response => {
                    console.log(response)
                    toast.success("Project updated successfully!", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                       // onClose: () => navigate("/Preset"),
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
        const regexName = /^[A-Za-z0-9\s]{2,50}$/;
        
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
        <AppHeader/>
    <div className='container'>
        <div className='row p-2'>

        <div className='col card ' >
                   <div className='text-center'>
                         <h4 className='text-center p-2'>Selected Services</h4>         
                   </div>
                        {selectedServiceList.map((service:serviceInterface)=>{
                             return(
                                <div className='roleCard' >
                                    <div className='roleText'>
                                        <p >{service.serviceName}</p>
                                    </div>
                                    <div className='roleCardCloseButton'>
                                        <CloseButton value={service.serviceName} onClick={onServiceDeselectHandler} />
                                    </div>
                                    
                                </div>
                            );
                        })}
            </div>




            <div className='col card'>
                <h4 className='text-center p-2'>Add New Project</h4>
                <div className='card-body'>
                    <form>
                        <div className='form-group p-2'>
                            <label>Project Id: </label>
                            <input placeholder='Project Id' name='projectId' className='form-control' value={project.projectId} onChange={onChangeHandler}/>
                        </div>
                        <div className='form-group p-2'>
                            <label>Project Name: </label>
                            <input placeholder='Project Name' name='projectName' className='form-control' value={project.projectName} onChange={onChangeHandler}/>
                            <p className="error-message">{formErrors.projectName}</p>
                        </div>
                        <div className='form-group p-2'>
                            <label>Select Multiple Roles  </label>
                          
                                <select name="roleDropdownList" onChange={onRoleSelectHandler}>
                                        {roleList.map((role:roleInterface)=>{
                                            return(
                                                <option key ={role.roleId} value={role.roleName}>{role.roleName}</option>
                                            );
                                        })}
                                        
                                </select>
                                <label>Select Multiple Services  </label>
                                <select name="serviceDropdownList" onChange={onServiceSelectHandler}>
                                        {serviceList.map((service:serviceInterface)=>{
                                            return(
                                                <option key ={service.serviceId} value={service.serviceName}>{service.serviceName}</option>
                                            );
                                        })}
                                        
                                </select>
                        </div>
                        <div className='text-center'>
                        <button className='btn btn-outline-success' onClick={onUpdateHandler}>Update Project</button>
                        </div>          
                    </form>
                </div>
                
            </div>

            <div className='col card ' >
                   <div className='text-center'>
                         <h4 className='text-center p-2'>Selected Roles</h4>         
                   </div>
                        {selectedRoleList.map((role:roleInterface)=>{
                             return(
                                <div className='roleCard' >
                                    <div className='roleText'>
                                        <p >{role.roleName}</p>
                                    </div>
                                    <div className='roleCardCloseButton'>
                                        <CloseButton value={role.roleName} onClick={onRoleDeselectHandler} />
                                    </div>
                                    
                                </div>
                            );
                        })}
            </div>
        </div>
    </div>
    <ToastContainer />
    <AppFooter/>
</div>
  )
}

export default UpdateProject
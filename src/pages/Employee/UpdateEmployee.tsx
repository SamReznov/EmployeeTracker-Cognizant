import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import './UpdateEmployee.scss';
import { ToastContainer, toast} from "react-toastify";
import EmployeeService from '../../servises/EmployeeService';
import AppHeader from "../../containers/header/AppHeader";
import AppFooter from "../../containers/footer/AppFooter";
import RoleService from "../../servises/RoleService";
import ServicesService from "../../servises/ServicesService";
import POService from "../../servises/POService";
import EsaRateCardService from "../../servises/EsaRateCardService";
import ProjectService from "../../servises/ProjectService";
import { useSelector } from 'react-redux';



interface projectInterface {
  projectId: number;
  projectName: string;
}
interface roleInterface {
  roleId: number;
  roleName: string;
}
interface serviceInterface {
  serviceId: number;
  serviceName: string;
}
interface poInterface {
  poNumber: number,
  poManager: string,
  dateIssued: string,
  expiryDate: string,
  extension: string,
  account: {
      accountId: number,
      accName: string
  }
}

interface esaRateCardinterface {
  esaAlphanumericValue: string,
  esaValue: number
}
interface employeeInterface {
  ctsEmpId: string|undefined;
  empFirstName: string;
  empLastName: string;
  empEmail: string;
  empPhone: string;
  empLocation: string;
  empStartDate: string;
  empEndDate: string;
  teamName: string;
  project: projectInterface | undefined;
  role: roleInterface | undefined;
  service: serviceInterface | undefined;
  projectSiteLocation: string;
  po: poInterface | undefined;
  esaRateCard: esaRateCardinterface | undefined;
}

function UpdateEmployee() {

    const params=useParams();

    const intialValues = {
      ctsEmpId: params.id,
      empFirstName: "",
      empLastName: "",
      empEmail: "",
      empPhone: "",
      empLocation: "",
      empStartDate: "",
      empEndDate: "",
      teamName: "",
      project: {
          projectId: 0,
          projectName: "",
      },
      role: {
          roleId: 0,
          roleName: "",
      },
      service: {
          serviceId: 0,
          serviceName: "",
      },
      projectSiteLocation: "",
      po: {
          poNumber: 0,
          poManager: "",
          dateIssued: "",
          expiryDate: "",
          extension: "",
          account: {
              accountId: 0,
              accName: ""
          }

      },
      esaRateCard: {
          esaAlphanumericValue: "",
          esaValue: 0
      },
  };

    const initialValueFormError={
        ctsEmpId:"",
        empFirstName: "",
        empLastName: "",
        empEmail: "",
        empPhone: "",
        empLocation: "",
        empStartDate: "",
        empEndDate: "",
        teamName: "",
        project: "",
        role: "",
        service: "",
        projectSiteLocation: "",
        po: "",
        esaRateCard: "",
    }

    const navigate=useNavigate();
    const[employee,setEmployee]=useState<employeeInterface>(intialValues);
    const [projects, setProjects] = useState<projectInterface[]>([]);
    const [roles, setRoles] = useState<roleInterface[]>([]);
    const [services, setServices] = useState<serviceInterface[]>([]);
    const [pos, setPos] = useState<poInterface[]>([]);
    const [esaRates, setEsaRates] = useState<esaRateCardinterface[]>([]);
    const [selectedProject,setSelectedProject]=useState<projectInterface|undefined>({projectId:0,projectName:""});
    //error
    const [formErrors, setFormErrors] = useState(initialValueFormError);
    const [validation, setValidation] = useState({
        project: "",
        role: "",
        service: "",
        po: "",
        esaRateCard: ""

    })
    
    const [isSubmit, setIsSubmit] = useState(false);
    const userDetails  = useSelector((state:any)=>state.user.currentUser)
  
    useEffect(() => {
      ProjectService.getProjectByAccount(userDetails.token)
          .then((response) => {
              console.log("*************Project*******************")
              console.log(response.data);
              setProjects(response.data);
          })
          .catch((error) => {
              console.log(error);
          });

      
  
      POService.getPO()
          .then((response) => {
              console.log(response)
              setPos(response.data)
          })
          .catch((error) => {
              console.log(error)
          })

      EsaRateCardService.getEsaRate()
          .then((response) => {
              console.log("----ESA----" + response.data)
              setEsaRates(response.data)
          }).catch((error) => {
              console.log(error)
          })



  }, []);

  useEffect(()=>{
      RoleService.getRoleListByProject(selectedProject?.projectId)
          .then((response) => {
              console.log(response)
              setRoles(response.data)
          })
          .catch((error) => {
              console.log(error)
          })

          ServicesService.getServiceListByProject(selectedProject?.projectId)
          .then((response) => {
              console.log(response)
              setServices(response.data)
          })
          .catch((error) => {
              console.log(error)
          })
  },[selectedProject])

    useEffect(() => {
        EmployeeService.getEmployeeById(Number(employee?.ctsEmpId))
          .then((response: any) => {
            let existEmployee = response.data;
            console.log("---Exist Employeee---"+existEmployee.project.projectName)
            setEmployee({...employee,
              ctsEmpId: existEmployee.ctsEmpId,
              empFirstName: existEmployee.empFirstName,
              empLastName: existEmployee.empLastName,
              empEmail: existEmployee.empEmail,
              empPhone: existEmployee.empPhone,
              empLocation: existEmployee.empLocation,
              empStartDate: existEmployee.empStartDate,
              empEndDate: existEmployee.empEndDate,
              teamName: existEmployee.teamName
            //      project: {
            //     projectId: existEmployee.project.projectId,
            //     projectName: existEmployee.project.projectName,
            // },
            //   role: existEmployee.role.roleName,
            //   service: existEmployee.service.serviceName,
            //   projectSiteLocation: existEmployee.projectSiteLocation,
            //   po: existEmployee.po.poNumber,
            //   esaRateCard: existEmployee.esaRateCard.esaAlphanumericValue,
            });
          })
          .catch((error: any) => {
            console.log(error.response.data);
          });
      }, []);


    const onChangeHandler= (event:{ target: { name: any; value: any } })=>{
        const {name,value}=event.target;
        setEmployee({...employee,[name]:value});
        setFormErrors(initialValueFormError);

    }
    
    const onUpdateHandler=(event:{ preventDefault: () => void })=>{
        event.preventDefault();
        console.log("--------------"+employee);
        setFormErrors(validate(employee));
        setIsSubmit(true); 
    
    }

    

    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (
              employee.ctsEmpId &&
              employee.empFirstName &&
              employee.empLastName &&
              employee.empEmail &&
              employee.empPhone &&
              employee.empLocation &&
              employee.empStartDate &&
              employee.empEndDate &&
              employee.teamName &&
              employee.projectSiteLocation
            ){
                EmployeeService.updateEmployee(employee)
                .then(response => {
                    console.log(response)
                    toast.success("Employee updated successfully!", {
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
    const validate = (values: employeeInterface) => {
      const errors: any = {};
      const regexId = /^[0-9]*$/;
      const regexName = /^[A-Za-z\s]{2,50}$/;
      const regexGender =
          /^(?:m|M|male|Male|f|F|female|Female|FEMALE|MALE|Not prefer to say|not prefer to say|NOT PREFER TO SAY)$/;
      const regexMobile = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const regexAddName = /^[A-Za-z\s]+$/;
      if (!values.ctsEmpId) {
          errors.ctsEmpId = "Id is required!";
      } else if (!regexId.test(values.ctsEmpId)) {
          errors.ctsEmpId = "Id should be digits only!";
      }

      if (!values.empFirstName) {
          errors.empFirstName = "First name is required!";
      } else if (!regexName.test(values.empFirstName)) {
          errors.empFirstName = "First name should me minimum of 2 characters!";
      }

      if (!values.empLastName) {
          errors.empLastName = "Last name is required!";
      } else if (!regexName.test(values.empLastName)) {
          errors.empLastName = "Last name should me minimum of 2 characters!";
      }

      if (!values.empLocation) {
          errors.empLocation = "Location is required!";
      } else if (!regexAddName.test(values.empLocation)) {
          errors.empLocation = "Location is invalid!";
      }

      if (!values.empStartDate) {
          errors.empStartDate = "Start date is required!";
      }

      if (!values.empEndDate) {
          errors.empEndDate = "End date is required!";
      }

      if (!values.teamName) {
          errors.teamName = "Team name is required!";
      }

      if (!values.empEmail) {
          errors.empEmail = "Email is required!";
      } else if (!regexEmail.test(values.empEmail)) {
          errors.empEmail = "This is not a valid email format!";
      }

      if (!values.empPhone) {
          errors.empPhone = "Phone no. is required!";
      } else if (!regexMobile.test(values.empPhone)) {
          errors.empPhone = "This is not a valid phone number!";
      }

      if (validation.project === "" || validation.project === "Select Project") {
          console.log(values.project)
          errors.project = "Project is required!"
      }


      if (validation.role === "" || validation.role === "Select Role") {
          errors.role = "Role is required!"
      }


      if (validation.service === "" || validation.service === "Select Service") {
          errors.service = "Service is required!"
      }


      if (validation.po === "" || validation.po === "Select PO") {
          errors.po = "PO is required!"
      }

      if (validation.esaRateCard === "" || validation.esaRateCard === "Select ESA Rate") {
          errors.esaRateCard = "ESA Rate is required!"
      }

      if (!values.projectSiteLocation) {
          errors.projectSiteLocation = "Site location is required!"
      }


      return errors;
  };

  return (
      <div>
        <AppHeader/>
        <div className="container">   
          <div>  
              <h2 className="text-center p-2">Update Employee</h2>
          </div>
          <div className='w-100'>
              <form className="form-style">
                  <div className='form-group p-2'>
                      <label>Employee Id: </label>
                      <input
                          className="input-style"
                          placeholder="Id"
                          name="ctsEmpId"
                          value={employee.ctsEmpId}
                          onChange={onChangeHandler}
                      />
                      <p className="error-message">{formErrors.ctsEmpId}</p>
                  </div>

                  <div className='form-group p-2'>
                      <label>First Name: </label>
                      <input
                          className="input-style"
                          placeholder="First Name"
                          name="empFirstName"
                          value={employee.empFirstName}
                          onChange={onChangeHandler}
                      />

                      <p className="error-message">{formErrors.empFirstName}</p>
                  </div>

                  <div className='form-group p-2'>
                      <label>Last Name: </label>
                      <input
                          className="input-style"
                          placeholder="Last Name"
                          name="empLastName"
                          value={employee.empLastName}
                          onChange={onChangeHandler}
                      />

                      <p className="error-message">{formErrors.empLastName}</p>
                  </div>

                  <div className='form-group p-2'>
                      <label>Email: </label>
                      <input
                          className="input-style"
                          placeholder="Email"
                          name="empEmail"
                          value={employee.empEmail}
                          onChange={onChangeHandler}
                      />

                      <p className="error-message">{formErrors.empEmail}</p>
                  </div>

                  <div className='form-group p-2'>
                      <label>Phone: </label>
                      <input
                          className="input-style"
                          placeholder="Phone"
                          name="empPhone"
                          value={employee.empPhone}
                          onChange={onChangeHandler}
                      />

                      <p className="error-message">{formErrors.empPhone}</p>
                  </div>

                  <div className='form-group p-2'>
                      <label>Phone: </label>
                      <input
                          className="input-style"
                          placeholder="Location"
                          name="empLocation"
                          value={employee.empLocation}
                          onChange={onChangeHandler}
                      />

                      <p className="error-message">{formErrors.empLocation}</p>
                  </div>

                  <div className='form-group p-2'>
                  <label>Emp Start date: </label>
                      <input
                          type="date"
                          className="input-style"
                          placeholder="Employee Start Date"
                          name="empStartDate"
                          value={employee.empStartDate}
                          onChange={onChangeHandler}
                      />

                      <p className="error-message">{formErrors.empStartDate}</p>
                  </div>

                  <div className='form-group p-2'>
                  <label>Emp End Date: </label>
                      <input
                          type="date"
                          className="input-style"
                          name="empEndDate"
                          value={employee.empEndDate}
                          onChange={onChangeHandler}
                      />

                      <p className="error-message">{formErrors.empEndDate}</p>
                  </div>

                  <div className='form-group p-2'>
                  <label>Team Name: </label>
                      <input
                          className="input-style"
                          placeholder="Team"
                          name="teamName"
                          value={employee.teamName}
                          onChange={onChangeHandler}
                      />

                      <p className="error-message">{formErrors.teamName}</p>
                  </div>

                  <div className='form-group p-2'>
                  <label>Project Name: </label>
                      <select name="project" onChange={(e) => {
                          setValidation({ ...validation, project: e.target.value })
                          setSelectedProject(projects?.find((x) => x.projectName === e.target.value));
                          // setSelectedProject();
                          console.log("----------Selected Project---------"+selectedProject)
                          setEmployee({ ...employee, project: projects?.find((x) => x.projectName === e.target.value) })
                      }}>
                          <option value="Select Project">Select Project</option>
                          {projects
                              ? projects.map((project: projectInterface) => {
                                  return (
                                      <option key={project.projectId} value={project.projectName}>
                                          {project.projectName}
                                      </option>
                                  );
                              })
                              : null}
                          <option value="Project Not Available">Project Not Available</option>
                      </select>
                      <p className="error-message">{formErrors.project}</p>
                  </div>


                  <div className='form-group p-2'>
                  <label>Role Name: </label>
                      <select name="role" onChange={(e) => {
                          setValidation({ ...validation, role: e.target.value })
                          const r = roles?.find((x) => x.roleName === e.target.value);
                          setEmployee({ ...employee, role: r })
                      }}>
                          <option value="Select Role">Select Role</option>
                          {roles
                              ? roles.map((role: roleInterface) => {
                                  return (
                                      <option key={role.roleId} value={role.roleName}>
                                          {role.roleName}
                                      </option>
                                  );
                              })
                              : null}
                      </select>
                      <p className="error-message">{formErrors.role}</p>
                  </div>

                  <div className='form-group p-2'>
                  <label>Service Area/Line: </label>
                      <select name="service" onChange={(e) => {
                          setValidation({ ...validation, service: e.target.value })
                          const s = services?.find((x) => x.serviceName === e.target.value);
                          setEmployee({ ...employee, service: s })
                      }}>
                          <option value="Select Service">Select Service</option>
                          {services
                              ? services.map((service: serviceInterface) => {
                                  return (
                                      <option key={service.serviceId} value={service.serviceName}>
                                          {service.serviceName}
                                      </option>
                                  );
                              })
                              : null}
                          <option value="Service Not Listed">Service Not Listed</option>
                      </select>
                      <p className="error-message">{formErrors.service}</p>
                  </div>

                  <div className='form-group p-2'>
                  <label>PO Name: </label>
                      <select name="po" defaultValue={""} onChange={(e) => {
                          setValidation({ ...validation, po: e.target.value })
                          const p = pos?.find((x) => x.poNumber === Number(e.target.value));
                          setEmployee({ ...employee, po: p })
                      }}>
                          <option value="Select PO">Select PO</option>
                          {pos
                              ? pos.map((po: poInterface) => {
                                  return (
                                      <option key={po.poNumber} value={po.poNumber}>
                                          {po.poNumber}
                                      </option>
                                  );
                              })
                              : null}
                          <option value="PO Not Listed">PO Not Listed</option>
                      </select>
                      <p className="error-message">{formErrors.po}</p>
                  </div>

                  <div className='form-group p-2'>
                  <label>Billing/Rate card: </label>
                      <select name="esaRateCard" onChange={(e) => {
                          setValidation({ ...validation, esaRateCard: e.target.value })
                          const esa = esaRates?.find((x) => x.esaValue === Number(e.target.value));
                          setEmployee({ ...employee, esaRateCard: esa })
                      }}>
                          <option value="Select ESA Rate">Select ESA Rate</option>
                          {esaRates
                              ? esaRates.map((esa: esaRateCardinterface) => {
                                  return (
                                      <option key={esa.esaValue} value={esa.esaValue}>
                                          {esa.esaAlphanumericValue}
                                      </option>
                                  );
                              })
                              : null}
                          <option value="ESA Rate Not Listed">ESA Rate Not Listed</option>
                      </select>
                      <p className="error-message">{formErrors.esaRateCard}</p>
                  </div>

                  <div className='form-group p-2'>
                      <label className="proj-location">Project Site Location</label>
                      <span className="ui-radio">
                          <input type="radio" name="projectSiteLocation" value={"OFF"} 
                              onChange={onChangeHandler} /></span>Offshore                        
                      <span className="ui-radio">
                          <input type="radio" name="projectSiteLocation" value={"ON"} 
                              onChange={onChangeHandler} /></span>Onsite                        
                      <p className="error-message">{formErrors.projectSiteLocation}</p>
                  </div>

                  {/* <div className="text-center"> */}
                  <button
                      className="btn btn-outline-info submit-button"
                      onClick={onUpdateHandler}
                  >
                      Update Employee
                  </button>
                  
              </form>
          </div>
          <ToastContainer />
      </div>
        <AppFooter/>
      </div>
  );
};

export default UpdateEmployee;
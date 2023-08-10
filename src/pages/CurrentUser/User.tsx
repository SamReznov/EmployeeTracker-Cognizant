import React,{useEffect, useState} from 'react'
import UserService from '../../servises/UserService'
import { error } from 'console';
import './User.scss';
import { useSelector } from 'react-redux';


function User() {
    const intialValues = {
        ctsEmpId: "",
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


//     const headers={
//         'Authorization':'Bearer'+localStorage.getItem("token")?.slice(1,-1)
//     }
//     const header2={
//         'Authorization':'Bearer'+localStorage.getItem("token")
//     }
//     const headers3={'Authorization' : 'Bearer' +"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW50aGlsQGdtYWlsLmNvbSIsInJvbGVzIjoiUk9MRV8jTi9BIiwiaWF0IjoxNjkxMjQyMTMyLCJleHAiOjE2OTEyNjAxMzJ9.Sn3XYXxVmKl8N0utqt7_tuZcfnw3Pwlc8qat4ZZbSDU"
// }
            
    const userDetails  = useSelector((state:any)=>state.user.currentUser)

    const[currentUser,setCurrentUser]=useState<string>();
    const[employee,setEmployee]=useState<any>(intialValues)

    useEffect(()=>{
        UserService.getCurrentUser()
        .then(response=>{
            setCurrentUser(response.data)
        }).catch(error=>{
            console.log(error)
        })
        UserService.getCurrentEmployee(userDetails.token)
        .then(response=>{
            setEmployee(response.data)
            console.log("Employee       "+response.data)
        }).catch(error=>{
            console.log(error)
        })
    },[])

    // const clickHandler=()=>{
    //     console.log(headers)
    //     console.log(header2)
    //     console.log(headers3)
    //     console.log(header2==headers3)
    // }

    
  return (

    
    <div>
        <div className='align-right text-center'>
        {currentUser}
        {/* <button onClick={clickHandler}>User</button> */}
        </div>
        <div className='text-center'>
        {employee.po?.account.accName}
        </div>
        
    </div>
  )
}

export default User
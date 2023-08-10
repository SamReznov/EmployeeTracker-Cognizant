import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";





const USER_API_BASE_URL="http://localhost:8080/api/users/register";


const headers={
    'Authorization':'Bearer '+localStorage.getItem("token")
}




class UserService{

   
    registerUser(user: any){

        return axios.post(USER_API_BASE_URL,user);

    }

    getCurrentUser(){
       return axios.get("http://localhost:8080/api/users/current-user",{
            headers:
                {
                    'Authorization':'Bearer'+localStorage.getItem("token")
                    // 'Authorization':'Bearer'+localStorage.getItem("token")?.slice(1,-1)
                    //  'Authorization' : 'Bearer' +"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW50aGlsQGdtYWlsLmNvbSIsInJvbGVzIjoiUk9MRV8jTi9BIiwiaWF0IjoxNjkxMjQyMTMyLCJleHAiOjE2OTEyNjAxMzJ9.Sn3XYXxVmKl8N0utqt7_tuZcfnw3Pwlc8qat4ZZbSDU"
                }
                
               
            
        })
    }

    getCurrentEmployee(token:any){
        return axios.get("http://localhost:8080/api/users/current-employee",{
            headers:
                {
                    // 'Authorization':'Bearer'+localStorage.getItem("token")
                    'Authorization':'Bearer'+token
                    // 'Authorization':'Bearer'+localStorage.getItem("token")?.slice(1,-1)
                    //  'Authorization' : 'Bearer' +"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW50aGlsQGdtYWlsLmNvbSIsInJvbGVzIjoiUk9MRV8jTi9BIiwiaWF0IjoxNjkxMjQyMTMyLCJleHAiOjE2OTEyNjAxMzJ9.Sn3XYXxVmKl8N0utqt7_tuZcfnw3Pwlc8qat4ZZbSDU"
                }
                
               
            
        })
    }

}

export default new UserService

import React from "react";

import axios from "axios";





const PROJECT_API_BASE_URL="http://localhost:8080/api/project";

const PROJECT_API_BASE_URL_TO_GET="http://localhost:8080/api/projects"




const headers={

    'Content-Type':'application/json'

}




class ProjectService{




    getProject(){

        return axios.get(PROJECT_API_BASE_URL_TO_GET);

    }

    getProjectByAccount(token:any){
        return axios.get("http://localhost:8080/api/account/project",{
            headers:
                {
                    
                    'Authorization':'Bearer'+token
                    
                }
                
               
            
        })
    }




    getProjectById(id:number){

        return axios.get(`${PROJECT_API_BASE_URL}/${id}`);

    }




    createProject(project: any){
        console.log("----inside create project")
        return axios.post(PROJECT_API_BASE_URL,project);

    }




    updateProject(project:any){




        return axios.put(PROJECT_API_BASE_URL,project);




    }

    updateAllValues(project:any){
        return axios.put('http://localhost:8080/api/update-all-values-in-project',project)
    }




    deleteProject(id:number){

        return axios.delete(`${PROJECT_API_BASE_URL}/${id}`);

    }




}

export default new ProjectService
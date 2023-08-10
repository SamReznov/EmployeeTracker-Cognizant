import React, {useState, useEffect} from 'react'
import { useNavigate,useParams} from 'react-router-dom';
import ProjectService from '../../../servises/ProjectService';
import { ToastContainer, toast} from "react-toastify";

interface projectInterface{
    projectId: string,
    projectName: string
  }

function ProjectList() {

    
    const [projects, setProjects]=useState<projectInterface[]>([]);
    const navigate=useNavigate();



    useEffect(()=>{
        ProjectService.getProject()
        .then(res => {
            console.log(res.data)
            setProjects(res.data)
        })
        .catch(err => {
            console.log(err)
        })
            
    },[])

    const addProject=()=>{
        navigate('/addProject');

    }
    const editProject=(id:string)=>{
        // console.log('----'+id);
        navigate(`/updateProject/${id}`);
    }

    const deleteProject=(id:number)=>{
        ProjectService.deleteProject(Number(id))
        .then((response)=>{
            console.log(response);
            toast.success(`Project deleted successfully with id : ${id}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => navigate("/"),
            });
            setProjects(projects.filter(project=> Number(project.projectId) !==id))
        })

    }

    
  return (
    <div>
        <h2 className='text-center p-4'>Project List</h2>
        <div className='text-center col-md-6 offset-md-3 offset-md-3'>
            <button className='btn btn-outline-primary' onClick={addProject}>Add Project</button>
        </div>
        <div className='row col-md-6 offset-md-3 offset-md-3'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Project Id</th>
                        <th>Project Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map(
                            project => 
                            <tr key={project.projectId}>
                                <td>{project.projectId}</td>
                                <td>{project.projectName}</td>
                                <td>
                                    <button onClick={()=>editProject(project.projectId)} className='btn btn-outline-info m-2'>Update</button>
                                    <button onClick={()=>deleteProject(Number(project.projectId))} className='btn btn-outline-danger m-2'>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        <div>
                
    </div>

    </div>
    <ToastContainer />
    </div>
  )
}

export default ProjectList


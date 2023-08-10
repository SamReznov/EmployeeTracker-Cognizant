import React, {useState, useEffect} from 'react'
import { useNavigate,useParams} from 'react-router-dom';
import ProjectService from '../../../servises/ProjectService';
import { ToastContainer, toast} from "react-toastify";
import RoleService from '../../../servises/RoleService';

interface roleInterface{
    roleId: string,
    roleName: string
  }

function RoleList() {

    
    const [roles, setRoles]=useState<roleInterface[]>([]);
    const navigate=useNavigate();



    useEffect(()=>{
        RoleService.getRole()
        .then(res => {
            console.log(res.data)
            setRoles(res.data)
        })
        .catch(err => {
            console.log(err)
        })
            
    },[])

    const addRole=()=>{
        navigate('/addRole');

    }
    const editRole=(id:string)=>{
        // console.log('----'+id);
        navigate(`/updateRole/${id}`);
    }

    const deleteRole=(id:number)=>{
        RoleService.deleteRole(Number(id))
        .then((response)=>{
            console.log(response);
            toast.success(`Role deleted successfully with id : ${id}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => navigate("/"),
            });
            setRoles(roles.filter(role=> Number(role.roleId) !==id))
        })

    }

    
  return (
    <div>
        <h2 className='text-center p-4'>Role List</h2>
        <div className='text-center col-md-6 offset-md-3 offset-md-3'>
            <button className='btn btn-outline-primary' onClick={addRole}>Add Role</button>
        </div>
        <div className='row col-md-6 offset-md-3 offset-md-3'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Role Id</th>
                        <th>Role Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roles.map(
                            role => 
                            <tr key={role.roleId}>
                                <td>{role.roleId}</td>
                                <td>{role.roleName}</td>
                                <td>
                                    <button onClick={()=>editRole(role.roleId)} className='btn btn-outline-info m-2'>Update</button>
                                    <button onClick={()=>deleteRole(Number(role.roleId))} className='btn btn-outline-danger m-2'>Delete</button>
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

export default RoleList


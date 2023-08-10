import React, {useState, useEffect} from 'react'
import { useNavigate,useParams} from 'react-router-dom';
import { ToastContainer, toast} from "react-toastify";
import AccountService from '../../../servises/AccountService';
import ServicesService from '../../../servises/ServicesService';

interface serviceInterface{
    serviceId: string,
    serviceName: string
  }

function ServiceList() {

    
    const [services, setServices]=useState<serviceInterface[]>([]);
    const navigate=useNavigate();



    useEffect(()=>{
        ServicesService.getService()
        .then(res => {
            console.log(res.data)
            setServices(res.data)
        })
        .catch(err => {
            console.log(err)
        })
            
    },[])

    const addService=()=>{
        navigate('/addService');

    }
    const editService=(id:string)=>{
        navigate(`/updateService/${id}`);
    }

    const deleteService=(id:number)=>{
        ServicesService.deleteService(Number(id))
        .then((response)=>{
            console.log(response);
            toast.success(`Service deleted successfully with id : ${id}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => navigate("/"),
            });
            setServices(services.filter(service=> Number(service.serviceId) !==id))
        })

    }

    
  return (
    <div>
        <h2 className='text-center p-4'>Service List</h2>
        <div className='text-center col-md-6 offset-md-3 offset-md-3'>
            <button className='btn btn-outline-primary' onClick={addService}>Add Service</button>
        </div>
        <div className='row col-md-6 offset-md-3 offset-md-3'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Service Id</th>
                        <th>Service Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map(
                            service => 
                            <tr key={service.serviceId}>
                                <td>{service.serviceId}</td>
                                <td>{service.serviceName}</td>
                                <td>
                                    <button onClick={()=>editService(service.serviceId)} className='btn btn-outline-info m-2'>Update</button>
                                    <button onClick={()=>deleteService(Number(service.serviceId))} className='btn btn-outline-danger m-2'>Delete</button>
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

export default ServiceList


import React, {useState, useEffect} from 'react'
import { useNavigate,useParams} from 'react-router-dom';
import { ToastContainer, toast} from "react-toastify";
import EsaRateCardService from '../../../servises/EsaRateCardService';

interface esaRateCardInterface{
    esaValue: string,
    esaAlphanumericValue: string
  }

function ESARateCardList() {

    
    const [esaRateLists, setESARateLists]=useState<esaRateCardInterface[]>([]);
    const navigate=useNavigate();



    useEffect(()=>{
        EsaRateCardService.getEsaRate()
        .then(res => {
            console.log(res.data)
            setESARateLists(res.data)
        })
        .catch(err => {
            console.log(err)
        })
            
    },[])

    const addESARate=()=>{
        navigate('/addESARate');

    }
    const editESARate=(id:string)=>{
        navigate(`/updateESARate/${id}`);
    }

    const deleteESARate=(id:string)=>{
        EsaRateCardService.deleteEsaRate(id)
        .then((response)=>{
            console.log(response);
            toast.success(`ESA Rate deleted successfully with id : ${id}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => navigate("/"),
            });
            setESARateLists(esaRateLists.filter(esa=> esa.esaAlphanumericValue !==id))
        })

    }

    
  return (
    <div>
        <h2 className='text-center p-4'>ESA Rate List</h2>
        <div className='text-center col-md-6 offset-md-3 offset-md-3'>
            <button className='btn btn-outline-primary' onClick={addESARate}>Add ESA Rate</button>
        </div>
        <div className='row col-md-6 offset-md-3 offset-md-3'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>ESA Value</th>
                        <th>ESA Alpha Numeric Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        esaRateLists.map(
                            esa => 
                            <tr key={esa.esaValue}>
                                <td>{esa.esaValue}</td>
                                <td>{esa.esaAlphanumericValue}</td>
                                <td>
                                    <button onClick={()=>editESARate(esa.esaAlphanumericValue)} className='btn btn-outline-info m-2'>Update</button>
                                    <button onClick={()=>deleteESARate(esa.esaAlphanumericValue)} className='btn btn-outline-danger m-2'>Delete</button>
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

export default ESARateCardList


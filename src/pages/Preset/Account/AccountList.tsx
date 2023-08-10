import React, {useState, useEffect} from 'react'
import { useNavigate,useParams} from 'react-router-dom';
import { ToastContainer, toast} from "react-toastify";
import AccountService from '../../../servises/AccountService';

interface accountInterface{
    accountId: string,
    accName: string
  }

function AccountList() {

    
    const [accounts, setAccounts]=useState<accountInterface[]>([]);
    const navigate=useNavigate();



    useEffect(()=>{
        AccountService.getAccount()
        .then(res => {
            console.log(res.data)
            setAccounts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
            
    },[])

    const addAccount=()=>{
        navigate('/addAccount');

    }
    const editAccount=(id:string)=>{
        navigate(`/updateAccount/${id}`);
    }

    const deleteAccount=(id:number)=>{
        AccountService.deleteAccount(Number(id))
        .then((response)=>{
            console.log(response);
            toast.success(`Account deleted successfully with id : ${id}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => navigate("/"),
            });
            setAccounts(accounts.filter(account=> Number(account.accountId) !==id))
        })

    }

    
  return (
    <div>
        <h2 className='text-center p-4'>Account List</h2>
        <div className='text-center col-md-6 offset-md-3 offset-md-3'>
            <button className='btn btn-outline-primary' onClick={addAccount}>Add Account</button>
        </div>
        <div className='row col-md-6 offset-md-3 offset-md-3'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Account Id</th>
                        <th>Account Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.map(
                            account => 
                            <tr key={account.accountId}>
                                <td>{account.accountId}</td>
                                <td>{account.accName}</td>
                                <td>
                                    <button onClick={()=>editAccount(account.accountId)} className='btn btn-outline-info m-2'>Update</button>
                                    <button onClick={()=>deleteAccount(Number(account.accountId))} className='btn btn-outline-danger m-2'>Delete</button>
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

export default AccountList


import React, { useState } from 'react'
import './UploadPOBLOBData.scss'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import { poBlobDataInterface } from '../../dataIntefaces/interfaces';


const UploadPOBLOBData = () => {
    const [lineItemFields, setLineItemFields] = useState([
        {
            lineItemNumber: '',
            description: '',
            extension: '',
            deliveryDate: '',
            tax: '',
            id: uuidv4()
        }
    ])
    

    const [poBlobData, setPoBlobData] = useState<poBlobDataInterface>({
        poNumber:"",
        revisionDate:"",
        revisionNumber:"",
        totalAmount:"",
        poBlobFile:new FormData(),
        arrayOfLineItems:lineItemFields
    })

    



    const addFields = () => {
        let newfield = [...lineItemFields]
        newfield.push({
            lineItemNumber: '',
            description: '',
            extension: '',
            deliveryDate: '',
            tax: '',
            id: uuidv4()
        })
        setLineItemFields(newfield)
        
    }

    const removeFields = (id: string) => {
        let newfield = [...lineItemFields]
        newfield = newfield.filter(input => input.id != id)
        console.log(newfield)
        setLineItemFields(newfield)
        setPoBlobData({...poBlobData, "arrayOfLineItems":newfield})
    }

    const changeHandler = (id: String, event: any) => {
        const index = lineItemFields.findIndex(f => f.id === id)
        let newfield = [...lineItemFields] as any
        newfield[index][event.target.name] = event.target.value
        setLineItemFields(newfield)
        console.log(poBlobData)
        setPoBlobData({...poBlobData, "arrayOfLineItems":lineItemFields})
    }

    const onChangeHandler = (e:any)=>{
        e.preventDefault();
        console.log(poBlobData); 
        setPoBlobData({...poBlobData, [e.target.name]:e.target.value})

    }
    const onUploadHandler = (e:any)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("pdfFile",e.target.files[0])
        setPoBlobData({...poBlobData, [e.target.name]:formData})
    }

    const submitHandler = () => {

        console.log(poBlobData);
    }

    return (
        <div className='container'>
            <div className='card'>
            <div className='card-body'>
                <div className='text-center p-2'>
                <div className='form-group p-2'>
                    <label htmlFor='poNumber'>PO Number :</label>
                    <input name='poNumber' type='text' onChange={onChangeHandler} />
                </div>
                <div className='form-group p-2'>
                    <label htmlFor='revisionDate'>Date Of This Revision : </label>
                    <input name='revisionDate' type='text' onChange={onChangeHandler} />
                </div>
                <div className='form-group p-2'>
                    <label htmlFor='revisionNumber'>Revision Number :</label>
                    <input name='revisionNumber' type='text' onChange={onChangeHandler} />
                </div>
                <div className='form-group p-2'>
                    <label htmlFor='totalAmount'>Total Amount :</label>
                    <input name='totalAmount' type='text' onChange={onChangeHandler} />
                </div>
                <div className='form-group p-2'>
                    <label htmlFor='poBlobFile'>Upload File :</label>
                    <input name='poBlobFile' type='file' onChange={onUploadHandler} />
                </div>
                <div className=''>
                    {
                        lineItemFields.map(input => (
                            <div className='form-row'>
                                <div className='input-group'>
                                    <label htmlFor='lineItemNumber'>Line Item Number</label>
                                    <input name='lineItemNumber' type='text' value={input.lineItemNumber} onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea name='description' value={input.description} onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='extension'>Extension</label>
                                    <input name='extension' value={input.extension} type='text' onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='deliveryDate'>Delivery Date</label>
                                    <input name='deliveryDate' value={input.deliveryDate} type='text' onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='tax'>TAX</label>
                                    <input name='tax'value={input.tax} type='text' onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                {
                                    lineItemFields.length > 1 && <Button variant="danger"  onClick={() => removeFields(input.id)}>-</Button>
                                }

                                <Button variant="primary" color='success' onClick={addFields}>+</Button>
                            </div>

                        ))
                    }
                    <Button className='btn-success' onClick={submitHandler}>Submit</Button>

                </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default UploadPOBLOBData
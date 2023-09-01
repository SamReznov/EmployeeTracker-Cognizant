import React, { useState } from 'react'
import './UploadPOBLOBData.scss'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';


const UploadPOBLOBData = () => {

    const [poBlobData, setPoBlobData] = useState({

    })

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

        newfield = newfield.filter(input => input.id !== id)
        setLineItemFields(newfield)
    }

    const changeHandler = (id: String, event: any) => {
        const index = lineItemFields.findIndex(f => f.id === id)
        let newfield = [...lineItemFields] as any
        newfield[index][event.target.name] = event.target.value

        setLineItemFields(newfield)
    }

    const submitHandler = () => {
        console.log(lineItemFields);
    }

    return (
        <div className='container'>
            <div className='card'>
            <div className='card-body'>
                <div className='text-center p-2'>
                <div className='form-group p-2'>
                    <label htmlFor='poNumber'>PO Number :</label>
                    <input name='poNumber' type='text' onChange={(e) => changeHandler("abc", e)} />
                </div>
                <div className='form-group p-2'>
                    <label htmlFor='revisionDate'>Date Of This Revision : </label>
                    <input name='revisionDate' type='text' onChange={(e) => changeHandler('abx', e)} />
                </div>
                <div className='form-group p-2'>
                    <label htmlFor='revisionNumber'>Revision Number :</label>
                    <input name='revisionNumber' type='text' onChange={(e) => changeHandler("abc", e)} />
                </div>
                <div className='form-group p-2'>
                    <label htmlFor='totalAmount'>Total Amount :</label>
                    <input name='totalAmount' type='text' onChange={(e) => changeHandler("abc", e)} />
                </div>
                <div className='form-group p-2'>
                    <label htmlFor='poBlobFile'>Upload File :</label>
                    <input name='poBlobFile' type='file' onChange={(e) => changeHandler("abc", e)} />
                </div>
                <div className=''>
                    {
                        lineItemFields.map(input => (
                            <div className='form-row'>
                                <div className='input-group'>
                                    <label htmlFor='lineItemNumber'>Line Item Number</label>
                                    <input name='lineItemNumber' type='text' onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea name='description' onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='extension'>Extension</label>
                                    <input name='extension' type='text' onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='deliveryDate'>Delivery Date</label>
                                    <input name='deliveryDate' type='text' onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='tax'>TAX</label>
                                    <input name='tax' type='text' onChange={(e) => changeHandler(input.id, e)} />
                                </div>
                                {
                                    lineItemFields.length > 1 && <button onClick={() => removeFields(input.id)}>-</button>
                                }

                                <button onClick={addFields}>+</button>
                            </div>

                        ))
                    }
                    <button className='btn-primary' onClick={submitHandler}>Submit</button>

                </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default UploadPOBLOBData
import React, { useEffect, useState } from 'react'
import './UploadPOBLOBData.scss'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import { poBlobDataInterface } from '../../dataIntefaces/interfaces';
import PoBlobService from '../../servises/PoBlobService';
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";





interface lineItemInterface {
    lineItemNumber: string,
    description: string,
    extension: string,
    deliveryDate: string,
    tax: string,
    id: string
}
const UploadPOBLOBData = () => {

    const navigate = useNavigate();
    const [lineItemFields, setLineItemFields] = useState<lineItemInterface[]>([
        {
            lineItemNumber: '',
            description: '',
            extension: '',
            deliveryDate: '',
            tax: '',
            id: uuidv4()
        }
    ])

    const [file, setFile] = useState<any>();




    const [poBlobData, setPoBlobData] = useState<poBlobDataInterface>({
        poNumber: "",
        revisionDate: "",
        revisionNumber: "",
        totalAmount: "",
        // file:new FormData(),
        lineItemDTOList: lineItemFields
    })


    const [formErrors, setFormErrors] = useState({poNumber: "",revisionDate: "",revisionNumber: "",totalAmount: "",lineItemNumber: '',description: '',extension: '',deliveryDate: '',tax: '',});

    const [isSubmit, setIsSubmit] = useState(false);



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
        setPoBlobData({ ...poBlobData, "lineItemDTOList": newfield })
    }

    const changeHandler = (id: String, event: any) => {
        const index = lineItemFields.findIndex(f => f.id === id)
        let newfield = [...lineItemFields] as any
        newfield[index][event.target.name] = event.target.value
        setLineItemFields(newfield)
        console.log(poBlobData)
        setPoBlobData({ ...poBlobData, "lineItemDTOList": lineItemFields })
    }

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        console.log(poBlobData);
        setPoBlobData({ ...poBlobData, [e.target.name]: e.target.value })

    }
    const onUploadHandler = (e: any) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("pdfFile",e.target.files[0])
        // setPoBlobData({...poBlobData, [e.target.name]:formData})
        setFile(e.target.files[0]);

    }





    const submitHandler = () => {

        console.log(poBlobData);
        // const formData = new FormData();
        // formData.append("blobData", JSON.stringify(poBlobData));
        // formData.append("file", file);
        setFormErrors(validate(poBlobData));
        setIsSubmit(true);

    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // if (
            //     poBlobData.poNumber
            // ) {
                console.log(poBlobData);
        const formData = new FormData();
        formData.append("blobData", JSON.stringify(poBlobData));
        formData.append("file", file);
                PoBlobService.sendPoBlobData(formData)
                    .then((response) => {
                        console.log(response.data);

                        toast.success(`${response.data}`, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            onClose: () => navigate("/"),
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error(`${error.response.data}`, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            onClose: () => navigate("/addPO"),
                        });
                    });
            // }
        }
    }, [formErrors])

    const validate = (values: any) => {
        const errors: any = {};
        const regexId = /^[0-9]*$/;
        const regexName = /^[A-Za-z\s]{2,50}$/;

        if (!values.poNumber) {
            errors.poNumber = "PO Number is required!";
        } else if (!regexId.test(values.poNumber)) {
            errors.poNumber = "PO Number should be digits only!";
        }

        if(!values.revisionDate){
            errors.revisionDate="Date of revision is required!";
        }

        if(!values.revisionNumber){
            errors.revisionNumber="Revision Number is required!";
        }

        if(!values.totalAmount){
            errors.totalAmount="Total amount is required!";
        }

        for(let index = 0; index < lineItemFields.length; index++) {
            const element = lineItemFields[index];
            if(!element.lineItemNumber){
                errors.lineItemNumber="Line item number is required"
            }
            if(!element.description){
                errors.description="Line item description required"
            }
            if(!element.extension){
                errors.extension="Extension is required"
            }
            if(!element.deliveryDate){
                errors.deliveryDate="Delivery date is required"
            }
            if(!element.tax){
                errors.tax="Tax is required"
            }
              
            
        }
       

        console.log(errors);
        return errors;
    };


    return (
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                    <div className='text-center p-2'>
                        <div className='form-group p-2'>
                            <label htmlFor='poNumber'>PO Number :</label>
                            <input name='poNumber' type='text' value={poBlobData.poNumber} onChange={onChangeHandler} required />
                            <p className="error-message">{formErrors.poNumber}</p>
                        </div>
                        <div className='form-group p-2'>
                            <label htmlFor='revisionDate'>Date Of This Revision : </label>
                            <input name='revisionDate' type='date' value={poBlobData.revisionDate} onChange={onChangeHandler} />
                            <p className="error-message">{formErrors.revisionDate}</p>
                        </div>
                        <div className='form-group p-2'>
                            <label htmlFor='revisionNumber'>Revision Number :</label>
                            <input name='revisionNumber' type='text' value={poBlobData.revisionNumber} onChange={onChangeHandler} />
                            <p className="error-message">{formErrors.revisionNumber}</p>
                        </div>
                        <div className='form-group p-2'>
                            <label htmlFor='totalAmount'>Total Amount :</label>
                            <input name='totalAmount' type='text' value={poBlobData.totalAmount} onChange={onChangeHandler} />
                            <p className="error-message">{formErrors.totalAmount}</p>
                        </div>
                        <div className='form-group p-2'>
                            <label htmlFor='file'>Upload File :</label>
                            <input name='file' type='file' onChange={onUploadHandler} />
                        </div>
                        <div className=''>
                            {
                                lineItemFields.map(input => (
                                    <div className='form-row'>
                                        <div className='input-group'>
                                            <label htmlFor='lineItemNumber'>Line Item Number</label>
                                            <input name='lineItemNumber' type='text' value={input.lineItemNumber} onChange={(e) => changeHandler(input.id, e)} />
                                            <p className="error-message">{formErrors.lineItemNumber}</p>
                                        </div>
                                        <div className='input-group'>
                                            <label htmlFor='description'>Description</label>
                                            <textarea name='description' value={input.description} onChange={(e) => changeHandler(input.id, e)} />
                                            <p className="error-message">{formErrors.description}</p>
                                        </div>
                                        <div className='input-group'>
                                            <label htmlFor='extension'>Extension</label>
                                            <input name='extension' value={input.extension} type='text' onChange={(e) => changeHandler(input.id, e)} />
                                            <p className="error-message">{formErrors.extension}</p>
                                        </div>
                                        <div className='input-group'>
                                            <label htmlFor='deliveryDate'>Delivery Date</label>
                                            <input name='deliveryDate' value={input.deliveryDate} type='date' onChange={(e) => changeHandler(input.id, e)} />
                                            <p className="error-message">{formErrors.deliveryDate}</p>
                                        </div>
                                        <div className='input-group'>
                                            <label htmlFor='tax'>TAX</label>
                                            <input name='tax' value={input.tax} type='text' onChange={(e) => changeHandler(input.id, e)} />
                                            <p className="error-message">{formErrors.tax}</p>
                                        </div>
                                        {
                                            lineItemFields.length > 1 && <Button variant="danger" onClick={() => removeFields(input.id)}>-</Button>
                                        }

                                        {/* {
                                    lineItemFields.length == 1 && <Button variant="primary" color='success' onClick={addFields}>+</Button>
                                } */}



                                    </div>

                                ))

                            }
                            <div className='input-group'>
                                {
                                    lineItemFields.length && <Button variant="primary" color='success' onClick={addFields}>Click Here To Add New Line Item</Button>
                                }

                            </div>

                            <Button className='btn-success' onClick={submitHandler}>Submit</Button>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UploadPOBLOBData
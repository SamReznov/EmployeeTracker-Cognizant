import React from 'react'
import './UploadPOBLOBData.scss'
import { Button, Col, Form, Row } from 'react-bootstrap'


const UploadPOBLOBData = () => {

    const onClickHandler = (e:any)=>{
        e.preventDefault();
    }

  return (
    <div>
        <Form>

        <Row className='mb-3'>
            <Form.Group className="mb-3" as={Col} controlId="formBasicLineItem">
                <Form.Label>Line Item</Form.Label>
                <Form.Control type="number" placeholder="Line Item Number" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="formBasicRevision">
                <Form.Label>Revision Number</Form.Label>
                <Form.Control type="number" placeholder="Revision Number" />
            </Form.Group>
        </Row>

        <Row className='mb-3'>
            <Form.Group className="mb-3" controlId="formLineItemDescription">
                <Form.Label>Line Item Description</Form.Label>
                <Form.Control as="textarea"  placeholder='Line Item Description' />
            </Form.Group>
        </Row>

        <Row className='mb-3'>
            <Form.Group className="mb-3" as={Col} controlId="formStartDate">
                <Form.Label>Line Item Start Date</Form.Label>
                <Form.Control type='date' placeholder='Line Item Start Date'/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="formEndDate">
                    <Form.Label>Line Item End Date</Form.Label>
                    <Form.Control type='date' placeholder='Line Item End Date'/>
            </Form.Group>
        </Row>
      
        <Row className='mb-3'>
            <Form.Group className="mb-3" as={Col} controlId="formLineItemValue">
                <Form.Label>Line Item Value</Form.Label>
                <Form.Control type='number' placeholder='Line Item Value'/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="formLineItemValue">
                <Form.Label>Total Amount</Form.Label>
                <Form.Control type='number' placeholder='Total Amount'/>
            </Form.Group>
        </Row>

        <Row className='mb-3'>
            <Form.Group className="mb-3" as={Col} controlId="formLineItemValue">
                    <Form.Label>Upload PO here</Form.Label>
                    <Form.Control type='file' placeholder='Upload PO Here'/>
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label>Click here to Automatically Populate Above Fields</Form.Label>
                <Button variant="secondary" onClick={onClickHandler}>
                    Populate Fields
                </Button>
            </Form.Group>
            
        </Row>

        
      
      
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default UploadPOBLOBData
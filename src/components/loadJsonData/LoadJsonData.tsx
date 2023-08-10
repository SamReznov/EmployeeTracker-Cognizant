import axios, { AxiosResponse }  from 'axios';

import React,{useState,useEffect} from 'react';




import './LoadJsonData.scss';

import { isTemplateMiddle } from 'typescript';

import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.css';

import { Interface } from 'readline';

import Entity from '../Entity';




function LoadJsonData() {

 

  const [data, setData] = React.useState<any[]>([]);

   

  const navigate = useNavigate();

  const employeeListInLocalStorage = localStorage.getItem("employeeData");

  const employeeListFromLocalStorage = employeeListInLocalStorage !== null ? JSON.parse(employeeListInLocalStorage) : [] ;

 

  interface employeeList{

    // id : string,

    // firs_name: string,

    // last_name: string,

    // Ofclocation: string,

    // city: string,

    // email: string,

    // phone: string




    ctsEmpId: string,

    empFirstName: string,

    empLastName: string,

    empEmail: string,

    empPhone: string,

    empLocation: string,

    empStartDate: string,

    empEndDate: string,

    teamName: string

  }






  return (

    <div className="App">

      <div className="table-container" role="table" aria-label="Destinations">

        <div className="flex-table header" role="rowgroup">

          <div className="flex-row first" role="columnheader">Emp Id</div>

          <div className="flex-row" role="columnheader">First Name</div>

          <div className="flex-row" role="columnheader">Last Name</div>

          <div className="flex-row" role="columnheader">Ofc Location</div>

          <div className="flex-row" role="columnheader"></div>

          <div className="flex-row" role="columnheader"></div>

        </div>




        {employeeListFromLocalStorage.map((item : employeeList, index: any) => {

          return (

           

            <div>

              {/* <Entity {...{...item}}/>              */}

            </div>

          );

        })

      }

      </div>    

    </div>

  );

}




export default LoadJsonData;
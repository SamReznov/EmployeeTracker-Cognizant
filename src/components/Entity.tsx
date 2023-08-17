import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";

import "./Entity.scss";

import { useNavigate } from "react-router-dom";

import {employeeInterface} from '../dataIntefaces/interfaces'

const Entity = (props: employeeInterface) => {
  const [folded, setFolded] = useState(true);
  const [editedProps,setEditedProps] = useState<employeeInterface>(props);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex-table custom-table" role="rowgroup">
        <div className="flex-row first" role="cell">
          {props.ctsEmpId}
        </div>

        <div className="flex-row" role="cell">
          {props?.empFirstName.length > 8 ? props?.empFirstName.substring(0,6)+"..":props?.empFirstName}
        </div>

        <div className="flex-row" role="cell">
          {props?.empLastName.length > 8 ? props?.empLastName.substring(0,6)+"..":props?.empLastName}
        </div>

        <div className="flex-row" role="cell">
          {props.empLocation}
        </div>

        <div className="flex-row btnFlex">
          <button
            className="btn-update"
            onClick={() => {
              navigate(`/UpdateEmployee/${props.ctsEmpId}`);
            }}
          >
            UPDATE
          </button>
        </div>

        <div className="flex-row accordion">
          <div className="accordion-item">
            <button
              className="btn btn-info w-100"
              type="button"
              onClick={() => {
                folded == true ? setFolded(false) : setFolded(true);
              }}
            >
              <span>{folded == true ? "+" : "-"}</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className={folded == true ? "content" : "content show"}>
          <section >
            <ul className="custom-ul">
              <li className="align-left"><span className="font-14 w-40">Full Name: </span><span className="font-14">{props?.empFirstName +" "+ props?.empLastName}</span></li>
              
              <li className="align-left"><span className="font-14 w-40">Email: </span><span className="font-14">{props?.empEmail}</span></li>

              <li className="align-left"><span className="font-14 w-40">Phone: </span><span className="font-14">{props?.empPhone}</span></li>

              <li className="align-left"><span className="font-14 w-40">Team: </span><span className="font-14">{props?.teamName}</span></li>

              <li className="align-left"><span className="font-14 w-40">Start Date: </span><span className="font-14">{props?.empStartDate}</span></li>

              <li className="align-left"><span className="font-14 w-40">End Date: </span><span className="font-14">{props?.empEndDate}</span></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Entity;

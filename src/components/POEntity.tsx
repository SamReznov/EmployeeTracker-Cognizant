import './POEntity.scss';

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Entity.scss";
import { useNavigate } from "react-router-dom";
import {poInterface} from '../dataIntefaces/interfaces'
// interface POProps {
//     poNumber: string,
//     poManager: string,
//     dateIssued: string,
//     expiryDate: string,
//     extension: string,
//     account: string
// }



const POEntity = (props:poInterface) => {
    const [folded, setFolded] = useState(true);
    const navigate = useNavigate();
  return (
    <div>
      <div className="flex-table custom-table" role="rowgroup">
        <div className="flex-row first" role="cell">
          {props.poNumber}
        </div>

        <div className="flex-row" role="cell">
          {props.poManager != "" ? props.poManager:"Null"}
        </div>

        <div className="flex-row" role="cell">
          {props.dateIssued?.substring(0,10)}
        </div>

        <div className="flex-row" role="cell">
          {props.expiryDate?.substring(0,10)}
        </div>

        <div className="flex-row" role="cell">
          {props.extension != null ? props.extension:"Null"}
        </div>

       
        {/* <div className="flex-row" role="cell">
          {}
        </div>
        <div className="flex-row" role="cell">
          {}
        </div> */}

        <div className="flex-row btnFlex">
          <button
            className="btn-update"
            onClick={() => {
              navigate(`/UpdatePO/${props.poNumber}`);
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
            <ul className='collapsableView'>
              <li>Account Id: {props?.account?.accountId}</li>
              <li>Account Name: {props?.account?.accName}</li>
              <li>Full Issued Date: {props?.dateIssued}</li>
              <li>Full Expiry Date: {props?.expiryDate}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default POEntity;
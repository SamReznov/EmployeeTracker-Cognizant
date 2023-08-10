import { log } from "console";

import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import POService from "../../servises/POService";
import AppHeader from "../../containers/header/AppHeader";
import AppFooter from "../../containers/footer/AppFooter";

const UpdatePO = () => {
  const [po, setPo] = useState({
    poNumber: "",
    poManager: "",
    dateIssued: "",
    expiryDate: "",
    extension: "",
    accountId: "",
  });

  const [poList, setPoList] = useState<any[]>([]);
  const [objIndex, setObjIndex] = useState(0);
  const navigate = useNavigate();
  const param = useParams();
  console.log(param.id);

  useEffect(() => {
    POService.getPOById(Number(param.id))
      .then((response: any) => {
        let existPo = response.data;
        setPo({
          poNumber: existPo.poNumber,
          poManager: existPo.poManager,
          dateIssued: existPo.dateIssued,
          expiryDate: existPo.expiryDate,
          extension: existPo.extension,
          accountId: existPo.accountId,
        });
      })

      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const onChangeHandler = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    const value = e.target.value;
    setPo({ ...po, [name]: value });
  };

  const onClickHandler = (e: any) => {
    e.preventDefault();
    console.log(po);
    POService.updatePO(po);

    //alert("User updated successfully!");

    toast.success("PO updated successfully!", {

      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => navigate("/"),
    });
  };

  return (
    <div>
        <AppHeader/>
        <div className="container">
      <div className="wrapper">
        <h2>Update PO</h2>

        <form className="form-style">
          <div>
            <input
              className="input-style"
              placeholder="PO Number"
              name="poNumber"
              value={po.poNumber}
              onChange={onChangeHandler}
            />

            {/* <p className="error-message">{formErrors.poNumber}</p> */}
          </div>

          <div>
            <input
              className="input-style"
              placeholder="PO Manager"
              name="poManager"
              value={po.poManager}
              onChange={onChangeHandler}
            />

            {/* <p className="error-message">{formErrors.poManager}</p> */}
          </div>

          <div>
            <input
              type="date"
              className="input-style"
              placeholder="Date Of Issue"
              name="dateIssued"
              value={po.dateIssued}
              onChange={onChangeHandler}
            />

            {/* <p className="error-message">{formErrors.dateIssued}</p> */}
          </div>

          <div>
            <input
              type="date"
              className="input-style"
              placeholder="Expiry Date"
              name="expiryDate"
              value={po.expiryDate}
              onChange={onChangeHandler}
            />

            {/* <p className="error-message">{formErrors.expiryDate}</p> */}
          </div>

          <div>
            <input
              type="date"
              className="input-style"
              placeholder="Extension"
              name="extension"
              value={po.extension}
              onChange={onChangeHandler}
            />

            {/* <p className="error-message">{formErrors.extension}</p> */}
          </div>

          <div>
            <input
              className="input-style"
              placeholder="Account Id"
              name="accountId"
              value={po.accountId}
              onChange={onChangeHandler}
            />

            {/* <p className="error-message">{formErrors.accountId}</p> */}
          </div>

          <button className="btn btn-outline-info submit-button" onClick={onClickHandler}>
            Update PO
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
    <AppFooter/>
    </div>
  );
};

export default UpdatePO;

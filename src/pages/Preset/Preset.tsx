import React, { useEffect } from "react";

import './Preset.scss';
import { useOutletContext } from "react-router-dom";
import ProjectList from "./Project/ProjectList";
import RoleList from "./Role/RoleList";
import AccountList from "./Account/AccountList";
import ESARateCardList from "./ESARateCard/ESARateCardList";
import ServiceList from "./Service/ServiceList";



const Preset= () => {
  const [selectedOutlet,setSelectedOutlet] = useOutletContext<any>();

    const PresetData = {
      label:"PRESET",
      routes:["/addPreset","/updatePreset","/deletePreset"]
    }

    
    useEffect(()=>{
      setSelectedOutlet(PresetData);
    },[])

    

    

  let tables= [
    { label: "Project", value: "Project" },
    { label: "Role", value: "Role" },
    { label: "Account", value: "Account" },
    { label: "EsaRateCard", value: "EsaRateCard" },
    { label: "Service", value: "Service" }
]
    
   
    let [table, setTable] = React.useState("⬇️ Choose an Option ⬇️")
    const [display, setDisplay] = React.useState({whichTable:''});
    
  
    let handleTableChange= (e:any) => {
      setTable(e.target.value);
      console.log(e.target.value);
      setDisplay({whichTable:e.target.value});
    }

    

    return(

      
      <div>
        <select className="dropdownStyle" onChange={handleTableChange}> 
            <option value="⬇️ Choose an Option ⬇️"> -- Choose an Option -- </option>
            {tables.map((table) => <option value={table.value}>{table.label}</option>)}
        </select>
        

    
    <section>
         <div className={display.whichTable == "Project"? "show": "hide"}><ProjectList/></div>
         <div className={display.whichTable == "Role"? "show": "hide"}><RoleList/></div>
         <div className={display.whichTable == "Account"? "show": "hide"}><AccountList/></div>
         <div className={display.whichTable == "EsaRateCard"? "show": "hide"}><ESARateCardList/></div>
         <div className={display.whichTable == "Service"? "show": "hide"}><ServiceList/></div>
         


    </section>
    
      </div>
    );
}
export default Preset;
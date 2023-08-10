import React, { useState } from 'react'
import './NavigationBar.scss'
import { useNavigate } from 'react-router-dom'

const NavigationBar = () => {
  
const [display, setDisplay] = useState({whichTab:'EmployeeList'});
  const handleChange = (e:any) => {
    let updatedValue = {};
    updatedValue = {item1:e};
    console.log(e);
    setDisplay({whichTab:e});
     }
  const navigate = useNavigate();
  return (
    <div className='navigationBar'>
    <div className={display.whichTab == "LandingPage" ? "navButton active": "navButton"} onClick={()=>{handleChange('LandingPage');navigate('/')}}>Home (Employee)</div>
    <div className={display.whichTab == "EsaData" ? "navButton active": "navButton"} onClick={()=>{handleChange('EsaData');navigate('/EsaData')}}>ESA DATA</div>
    <div className={display.whichTab == "RTData" ? "navButton active": "navButton"} onClick={()=>{handleChange('RTData');navigate('/RTData')}}>RT DATA</div>
    <div className={display.whichTab == "PoData" ? "navButton active": "navButton"} onClick={()=>{handleChange('PoData');navigate('/PoData')}}>PO DATA</div>
    <div className={display.whichTab == "Preset" ? "navButton active": "navButton"} onClick={()=>{handleChange('Preset');navigate('/Preset')}}>PRESET</div>
    
    </div>
  )
}

export default NavigationBar
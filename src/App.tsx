//Checking the change2
import './App.scss';

import AppHeader, { AppHeaderProps }  from './containers/header/AppHeader';
import { Routes, Route, Router, BrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AddEmployee from './pages/Employee/AddEmployee';

import DeleteEmployee from './pages/Employee/DeleteEmployee';
import UpdateEmployee from "./pages/Employee/UpdateEmployee";
import EsaData from './pages/ESA/EsaData';
import PoData from './pages/PO/PoData';
import DeletePO from './pages/PO/DeletePO';
import RTData from './pages/RT/RTData';
import AddPO from './pages/PO/AddPO';
import UpdatePO from './pages/PO/UpdatePO';
import EmployeeData from './pages/Employee/EmployeeData';
import Preset from './pages/Preset/Preset';
import AddProject from './pages/Preset/Project/AddProject';
import UpdateProject from './pages/Preset/Project/UpdateProject';
import AddRole from './pages/Preset/Role/AddRole';
import UpdateRole from './pages/Preset/Role/UpdateRole';
import AddAccount from './pages/Preset/Account/AddAccount';
import UpdateAccount from './pages/Preset/Account/UpdateAccount';
import AddESARate from './pages/Preset/ESARateCard/AddESARate';
import UpdateESARate from './pages/Preset/ESARateCard/UpdateESARate';
import AddService from './pages/Preset/Service/AddService';
import UpdateService from './pages/Preset/Service/UpdateService';
import { useSelector } from 'react-redux';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUpPage';

const headerProps: AppHeaderProps = {
  title: 'Employee tracker',
  description: 'Employee trcaker for rsa intact account',
  links: [
    {
      label: 'Employee list',
      route: '/logs/list',
    },
    {
      label: 'Add employee',
      route: '/logs/create',
    },
  ],
};

function App() {


  const user  = useSelector((state:any)=>state.user.currentUser)
  console.log(user)
  return (
    <BrowserRouter>
    
       <Routes>      
            <Route path="/" element={<LandingPage/>} >
              <Route path="/EsaData" element={<EsaData />} />  
              <Route path="/RTData" element={<RTData />} />  
              <Route path="/PoData" element={<PoData />} />
              <Route path="/Preset" element={<Preset/>}/>
              <Route index element={<EmployeeData/>} />  
            </Route> 
            

            <Route path = "/login" element={user ? <Navigate to="/"/>:<LoginPage/>}/> 
            <Route path = "/register" element={user ? <Navigate to="/"/>:<SignUpPage/>}/> 
              
            

            <Route path="/AddEmployee" element={<AddEmployee />} />
            <Route path="/DeleteEmployee" element={<DeleteEmployee />} />
            <Route path="/UpdateEmployee/:id" element={<UpdateEmployee />} /> 

            <Route path="/deletePO" element={<DeletePO/>}/> 
            <Route path="/addPO" element={<AddPO/>}/>     
            <Route path="/updatePO" element={<UpdatePO/>}/>   

            <Route path="/addProject" element={<AddProject/>}/>
            <Route path="/updateProject/:id" element={<UpdateProject/>}/>

            <Route path="/addRole" element={<AddRole/>}/>
            <Route path="/updateRole/:id" element={<UpdateRole/>}/>

            <Route path="/addAccount" element={<AddAccount/>}/>
            <Route path="/updateAccount/:id" element={<UpdateAccount/>}/>

            <Route path="/addESARate" element={<AddESARate/>}/>
            <Route path="/updateESARate/:id" element={<UpdateESARate/>}/>

            <Route path="/addService" element={<AddService/>}/>
            <Route path="/updateService/:id" element={<UpdateService/>}/>
          </Routes>
    </BrowserRouter>
    
    
    
  );
}

export default App;

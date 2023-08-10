import React, { PropsWithChildren, ReactElement, ReactNode, useEffect, useState } from 'react';
import LoadJsonData from '../../components/loadJsonData/LoadJsonData';
import LoginButton from '../../components/LoginButton';

import './AppBody.scss';
import NavigationBar from '../../components/Navigation/NavigationBar';
import { Outlet } from 'react-router-dom';
import SideBar from '../sidebar/SideBar';
import { useSelector } from 'react-redux';

interface outletProps  {
  label :string
  routes:string[]
}

const AppBody =  ()=> {
  const user  = useSelector((state:any)=>state.user.currentUser)
  const [selectedOutlet,setSelectedOutlet] = useState<any>();

  


  return (
   <div>


<section className="app-body">
      
      <section className="body-content">
           
           
    {!user &&<h4>You Are Not Logged In Please Log In.</h4>}
    {user && <Outlet context={[selectedOutlet,setSelectedOutlet]}/>}         
        
      </section>
        <section className="side-bar">
         <SideBar label = {selectedOutlet?.label} routes = {selectedOutlet?.routes}/>
        </section>    
    </section>
    
   </div>
  );
  }

export default AppBody;
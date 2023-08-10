import React from 'react';

import './AppHeader.scss';
import AppHeaderNavLink, { NavLink } from '../../components/AppHeaderNavLink';
import { ReactComponent as Logo } from '../../images/cog-pride-logo.svg';
import LogoutButton from '../../components/LogoutButton';

import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

import NavigationBar from '../../components/Navigation/NavigationBar';
import LoginButton from '../../components/LoginButton';
import { useSelector } from 'react-redux';
import User from '../../pages/CurrentUser/User';

// define our AppHeader properties that will be passed into the component
export type AppHeaderProps = {
  title: string;
  description: string;
  links: NavLink[];
};



// create React Functional Component variable that will render our code for our header.
// React.FC takes a type of the props that can be passed into the component
function AppHeader() {

  const navigate = useNavigate();//This is for navigating within pages
  const user  = useSelector((state:any)=>state.user.currentUser)


  const onClickHandlerAdd = ()=>{
    console.log("Clicked")
    navigate('/AddEmployee')
  }

  const onClickHandlerDelete = ()=>{
    console.log("Clicked")
    navigate('/DeleteEmployee')
  }

  return (
    <header>
      <section className="app-header">
        <section className="app-title-left">
          <Logo />                   
        </section>
        <section className="app-title-center" style={{cursor:'pointer'}} onClick={()=>{navigate('/')}  }><h4>Employee Tracker</h4> </section>
        <section className="element-style-right">
          <>
            <div className='right-style'>
                
              <div>
                {!user &&  <LoginButton />}
                {user && <LogoutButton /> }</div>  
                {user && <div><User/></div>}
            </div>
          
              {/* {links &&
                links.map((link: NavLink) => (
                  <AppHeaderNavLink
                    label={link.label}
                    route={link.route}
                    key={link.label}
                  />
                ))} */}

          </>
        </section>
      </section>
      <div className="sub-header">
        {user &&  <NavigationBar/>}
      </div>
    </header>
  );
}


export default AppHeader;
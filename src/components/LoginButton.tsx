
import React, { useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return <> <Button variant="outline-info" onClick={() =>{navigate('/login')} }>Log In</Button></>
}

export default LoginButton;
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
{
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  z-index: 3;
  position: absolute;
  display: flex;
  -webkit-box-pack: center;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  backdrop-filter: blur(1px);
  flex-direction: column;
/* opacity: ${props =>props.isVisable ==="true" ? 1 :0.2};*/
`
const DialogBox = styled.div`
height: 200px;
width: 500px;
background-color: #8e8e8f;
border-radius: 3%;
padding:5px;
`
const Head = styled.div`
display: flex;
justify-content: flex-end;

`
const CancelButton = styled.div`
cursor: pointer;
`
const Middle = styled.div`
display: flex;
justify-content: center;
align-items: center;


`
const WarningMessage = styled.div`
padding-top: 30px;
`
const Bottom = styled.div`
display: flex;
padding-top: 50px;
justify-content: space-around;
align-items: center;
`
const Button = styled.button`
cursor:pointer;
height:40px;
width: 90px;
border: none;
border-radius: 2%;
background-color: white;

`

const ExportConfirmation = ({setVisable ,projectName,exportHandler}) => {
  return (
    <Container >
    <DialogBox>
        <Head><CancelButton onClick={()=>{setVisable(false)}}><CancelIcon/></CancelButton></Head>
        <Middle><WarningMessage><h4>Are You Sure You Want to export all the resource datails of {projectName} in Excel? </h4></WarningMessage></Middle>
        <Bottom>
            <button className='btn btn-danger' type='button' onClick={()=>{setVisable(false)}}>CANCEL</button>
            <button className='btn btn-success' type='button' onClick={()=>{exportHandler();setVisable(false)}}>CONTINUE</button>
        </Bottom>
    </DialogBox>
</Container>
  )
}

export default ExportConfirmation
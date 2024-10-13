
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const cardStyle = {
  width: '176px',
  height: '170px',
  position: 'absolute',
};

const firstCardStyle = {
  ...cardStyle,
  top: '118px',
  left: '542px',
};

const secondCardStyle = {
  ...cardStyle,
  top: '118px',
  left: '729px',
};

const continueButtonStyle = {
  marginTop: '316px', 
  textAlign: 'center', 
  marginLeft:'107px',
  color:'#EC1944'
};

const UserCheckInValidation = () => {
  const [isApproved, setIsApproved] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleToggle = () => {
    setIsApproved(!isApproved);
  };
  const handleAuthenticate = () =>{
    setIsAuthenticated(!isAuthenticated)
  }

  return (

    <div>
      <Card style={firstCardStyle}>
        <CardContent style={{ backgroundColor: '#606060' }}>
          <Typography variant="h6" style={{color:'white',textAlign:'center',fontSize:'14px',fontFamily:'Poppins'}}>Approved</Typography>
        </CardContent>
        <CardContent style={{ backgroundColor: 'white',textAlign:'center' }}>
          {isApproved ? <DoneIcon /> : <CloseIcon style={{color:'red'}}/>}
        </CardContent>
        <CardContent style={{ backgroundColor: '#EC1944' ,fontSize:'12px',textAlign:'center'}}>
          <Typography style={{fontSize:'12px',textAlign:'center',color:'white',fontFamily:'Poppins'}}>Send Request to Admin</Typography>
        </CardContent>
      </Card>

      <Card style={secondCardStyle}>
        <CardContent style={{ backgroundColor: '#606060' }}>
          <Typography variant="h6" style={{color:'white',textAlign:'center',fontSize:'14px',fontFamily:'Poppins'}}>Authenticate</Typography>
        </CardContent>
        <CardContent style={{ backgroundColor: 'white',textAlign:'center' }}>
          {isAuthenticated ? <DoneIcon style={{color:'green'}} /> : <CloseIcon  style={{color:'red'}}/>}
        </CardContent>
        <CardContent style={{ backgroundColor: '#EC1944' }}>
          <Typography style={{fontSize:'12px',textAlign:'center',color:'white',fontFamily:'Poppins' }}> Verify Email</Typography>
        </CardContent>
      </Card>
      <div style={continueButtonStyle}>
    <Button variant="outlined" color="primary" style={{ color: '#EC1944', borderColor: '#EC1944',fontFamily:'Poppins' }} >
      Continue
      <ArrowForwardIcon />
    </Button>
  </div> 
    </div>
    
 
  );
};

export default UserCheckInValidation;

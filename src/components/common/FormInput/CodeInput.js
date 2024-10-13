import React from "react";
// import VerificationInput from "react-verification-input";
import VerificationInput from "react-verification-input";
import { Api } from "../../Api";
import { verifyOtpFromEmail } from "../../../EndPoints"
import { toast } from 'react-toastify';
import '../../../css/register.css';



export default function CodeInput  ({ length = 6, onComplete, onConfirm, ...props })  {
  const[value , setValue] = React.useState('')
  const[otp , setotp] = React.useState()
  const onChange = (e) => {
    let value = e.target.value
    if (value.length >= length) {
      return onComplete();
    }
  };
  const handleChange = (event) => {
    let value = event.target.value;
    setValue(value)
    if (value.length >= length && typeof onComplete === 'function') {
      return onComplete();
    }
};

const handleConfirmation = () => {
  // Check if onConfirm is a function before calling it
  if (typeof onConfirm === 'function') {
      onConfirm();
  }
};


const handleOnComplete = async() => {
  let response = await Api.verifyOtpFromEmail(verifyOtpFromEmail,props.user.txId,otp,props.user.email);
  if (response) {  
    props.handleTostMessage(response.data,props.user.email)
  }
};

  const inputProps = {
    onChange
  };
  return (
    <VerificationInput
    classNames={{
      container: "container",
      character: "character",
      characterInactive: "character--inactive",
      characterSelected: "character--selected",
      characterFilled: "character--filled",
    }}
    autoFocus
    validChars="0-9"
    length={length}
    removeDefaultStyles
    onChange={(e) => {setotp(e)}}
    onComplete={() => handleOnComplete()}
    onConfirm={handleConfirmation}
    {...props}
    />
  );
};



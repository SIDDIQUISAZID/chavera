import React from 'react';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';


export default function TextInput(props) {
  return (
    <div> <TextField
    disabled = {props.disabled}
    error = {props.error}
    required = {props.required}
    id={props.id}
    label={props.label}
    type={props.type}
    defaultValue={props.defaultValue}
    helperText={props.helperText}
    variant={props.variant}
    InputProps={{
        //readOnly: false,
        //shrink: true,
        startAdornment: <InputAdornment position="start"></InputAdornment>,
      }}
  /></div>
  )
}

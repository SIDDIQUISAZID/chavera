import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions } from '@mui/material';
import { useFormik } from 'formik';
import { Api } from './Api';
import * as yup from 'yup';
import { updatePassword} from '../EndPoints';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ToastService from './Toast/ToastService';


export default function ResetPassword(props) {

    const validationSchema = yup.object({
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .max(40, 'Password should be of maximum 40 characters length')
            .matches(/^\S*$/, 'Password should not contain spaces')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Invalid Password'
            )
            .required('Password is required'),
        confpassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),

    });

    const WithMaterialUI = () => {
        const [showPassword, setShowPassword] = React.useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);


        const handleClickShowPassword = () => {
            setShowPassword(!showPassword);
          };

          const handleClickShowConfirmPassword = () => {
            setShowConfirmPassword(!showConfirmPassword);
          };

          const validate = (values) => {
            const errors = {};
            if (values.password !== values.confpassword) {
                errors.confpassword = 'Passwords do not match';
            }
            return errors;
        };

        const formik = useFormik({
            initialValues: {},
            validationSchema: validationSchema,
            validate: validate,
            onSubmit: (async (values) => {
              let outputData = {
                password : values.confpassword,
                key : props.user[0].key,
                userId :  props.user[0].userId

              }

              let response = await Api.resetPassword(updatePassword, outputData);
                if (response?.statusCode === 200) {
                 
                  props.handleUserData(response.data);  
                  props.handleSetActiveWindow('password'); 
                }
                else{
                   ToastService.Toast("error", `${response.message}`);
                }
            }),
        });

        return (

            <form onSubmit={formik.handleSubmit}>
                <div className='registerForm'>
                    <TextField
                        id="password"
                        name="password"
                        placeholder="New Password"
                        type={showPassword ? "text" : "password"}
                        variant='standard'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HttpsOutlinedIcon fontSize='0.9em'/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment
                                  position="end"
                                  onClick={handleClickShowPassword}
                                  style={{ cursor: "pointer" }}
                                >
                                  {showPassword ? (
                                    <VisibilityIcon fontSize="1em" />
                                  ) : (
                                    <VisibilityOffIcon fontSize="1em" />
                                  )}
                                </InputAdornment>
                              ),
                            style:{fontSize:'0.8em'}
                        }}
                        style={{ marginBottom: '1%' }}
                    />
                     <div style= {{fontSize:'0.6em', color: 'rgba(0, 0, 0, 0.6)', marginBottom: '4%' ,}}> Password must contain at least one letter, one number, one special character, and be at least 8 characters long</div>
                    <TextField
                        id="password"
                        name="confpassword"
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        variant='standard'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confpassword}
                        error={formik.touched.confpassword && Boolean(formik.errors.confpassword)}
                        helperText={formik.touched.confpassword && formik.errors.confpassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HttpsOutlinedIcon fontSize='0.9em' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment
                                  position="end"
                                  onClick={handleClickShowConfirmPassword}
                                  style={{ cursor: "pointer" }}
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityIcon fontSize="1em" />
                                  ) : (
                                    <VisibilityOffIcon fontSize="1em" />
                                  )}
                                </InputAdornment>
                              ),
                            style:{fontSize:'0.8em'}
                        }}
                        style={{ marginBottom: '6%' }}
                    />


                    <Button type="submit" style={{ background: '#EC1944', marginBottom: '10px',marginTop:'1em',opacity: !formik.isValid || formik.isSubmitting|| !formik.dirty? 0.6 : 1,color:'white' }} variant="contained" disabled={!formik.isValid || formik.isSubmitting|| !formik.dirty}>
                        Reset Password
                    </Button>
                </div>
            </form>)
    }

    return (
        <div className='card'>
                <CardContent>
                <div className='header'> Reset Password</div>
                <div className='headerContent'>Set the new password for your account so you can login and access all the features.</div>
                    <WithMaterialUI />
                </CardContent>
            <CardActions>

            </CardActions>
        </div>
    );



}
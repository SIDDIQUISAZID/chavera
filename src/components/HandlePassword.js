import * as React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Link } from 'react-router-dom';
import '../css/register.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function HandlePassword(props) {
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        username: yup.string('Enter your User Name')
            .required('User Name is required'),
    });

    const WithMaterialUI = () => {
        const formik = useFormik({
            initialValues: {},
            validationSchema: validationSchema,
            onSubmit: (values) => {

            },
        });

        return (

            <form onSubmit={formik.handleSubmit}>
                <div className='registerForm'>

                    {props.reset && <TextField
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                        variant='standard'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon fontSize='0.9em'/>
                                </InputAdornment>
                            ),
                            style:{fontSize:'0.8em'}
                        }}
                        style={{ marginBottom: '4%' }}
                    />}
                    <TextField
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
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
                            style:{fontSize:'0.8em'}
                        }}
                        style={{ marginBottom: '4%' }}
                    />
                    <TextField
                        id="password"
                        name="password"
                        placeholder="Confirm Password"
                        type="password"
                        variant='standard'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HttpsOutlinedIcon fontSize='0.9em' />
                                </InputAdornment>
                            ),
                            style:{fontSize:'0.8em'}
                        }}
                        style={{ marginBottom: '6%' }}
                    />


                    <Button type="submit" style={{ background: '#EC1944', marginBottom: '10px',marginTop:'1em' }} variant="contained">
                        <Link style={{ color: 'white', textDecoration: 'none' }}> Save Password</Link>
                    </Button>
                    {/* <div> Go Back  <Link  to = "/"style = {{color : '#EC1944'}}> Login</Link> </div> */}
                </div>
            </form>)
    }

    return (
        <div className='card'>
            {/* <CardActionArea> */}

                <CardContent>
                <div className='header'> Save Password</div>
                <div className='headerContent'>Please fill details to continue</div>
                    <WithMaterialUI />

                </CardContent>
            {/* </CardActionArea> */}
            <CardActions>

            </CardActions>
        </div>
    );



}
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Grid, Typography } from '@mui/material';
import axios from '../../../config/axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../config/redux/slices/users';
import { useNavigate } from 'react-router-dom';

import cls from './UserRegister.module.scss';

const UserRegister = () => {
    const alertText = 'New user has been successfully created.';
    const titleText = 'Let\'s create NEW User!';
    const btnText = 'Submit New User';
    const navigate = useNavigate();
    const [ dataCount, setDataCount ] = useState( 0 );
    const [ popupState, setPopupState ] = useState( false );
    const dispatch = useDispatch();
    const [ dataLoaded, setDataLoaded ] = useState( false );
    const initailValue = {
        name: '',
        username: '',
        email: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: '',
            },
        },
        phone: '',
        website: '',
        company: {
            name: '',
            catchPhrase: '',
            bs: ''
        },
    };

    const classes = {
        formTitle: 'form-title-wrapper',
        formSection: 'form-section',
        userForm: 'user-form',
        btnWrap: 'btn-wrap',
        inputWrap: 'input-wrap',
        formTitleAlert: 'form-Title-alert',
        validationErr: 'validation-error',
        ivalidInput: 'invalid-input',
        popup: 'popup',
        popupContainer: 'popup-container',
        
    }

    const userCountStore = useSelector( state => {
        const data = state.users.posts.items.data;

        if ( !Array.isArray(data) ) {
          return false;
        }

        const count = data.length;

        return count || false;
    } );

    useEffect( () => {
        if ( !userCountStore && !dataLoaded ) {
            async function fetchData() {
                try {
                    dispatch( fetchUsers() ).then( response => setDataCount(response.payload?.data.length + 1) );

                    setDataLoaded( true );

                } catch ( error ) {
                    console.error( 'GET error:', error );
                }
            }
    
            fetchData();
        }
    }, [dispatch, userCountStore, dataCount, dataLoaded] );

    const userCount = userCountStore ? userCountStore + 1 : dataCount;

    const handleSubmit = async ( values, {setSubmitting} ) => {
        try {
            if ( values && typeof values === 'object' ) {
                values.id = userCount;

                const response = await axios.post( '/users', JSON.stringify(values) );

                setPopupState( true );

                setTimeout( () => {
                    setPopupState( false );
                    navigate('/');
                }, 2000 );


                console.log( 'POST response:', response.data );
            }

        } catch ( error ) {
            console.error( 'POST error:', error );

        } finally {
            setSubmitting( false );
        }
    };

    return (
        <main>
            <Grid container className={ cls[classes.formSection] }>

                { popupState && (
                    <div className={ cls[classes.popup] }>
                        <Typography
                                variant="h4" 
                                component="span"
                        >
                            { alertText }
                        </Typography>
                    </div>
                ) }

                <div className={ cls[classes.formTitle] }>
                    <Typography
                            variant="h4" 
                            component="h1"
                    >
                        { titleText }
                    </Typography>
                </div>
                <Formik
                    initialValues={ initailValue }
                    validate={ values => {
                        const errors = {};

                        if ( !values.email ) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( values.email )
                        ) {
                            errors.email = 'Invalid email address';
                        }

                        return errors;
                    } }

                    onSubmit={ ( values, { setSubmitting } ) => {
                        setTimeout( () => {
                            handleSubmit(values, { setSubmitting });
                        }, 400 );
                    } }
                >
                    { ( { isSubmitting, errors, touched } ) => (
                        <Form className={ cls[classes.userForm] }>
                            <div className={ cls[classes.inputWrap] }>
                                <Field
                                    className={touched.email && errors.email ? cls[classes.ivalidInput] : ''}
                                    type="email"
                                    name="email"
                                    placeholder="Email*"
                                />
                                <ErrorMessage
                                    className={ cls[classes.validationErr] }
                                    name="email"
                                    component="div"
                                />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="name" placeholder="Name" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="username" placeholder="Username" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="address.street" placeholder="Street" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="address.suite" placeholder="Suite" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="address.city" placeholder="City" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="address.zipcode" placeholder="Zipcode" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="address.geo.lat" placeholder="Latitude" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="address.geo.lng" placeholder="Longitude" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="tel" name="phone" placeholder="Phone" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="website" placeholder="Website" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="company.name" placeholder="Company Name" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="company.catchPhrase" placeholder="Catch Phrase" />
                            </div>
                            <div className={ cls[classes.inputWrap] }>
                                <Field type="text" name="company.bs" placeholder="Business" />
                            </div>

                            <div className={ cls[classes.btnWrap] }>
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    disabled={ isSubmitting }
                                >
                                    { btnText }
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </main>
    );
};

export default UserRegister;
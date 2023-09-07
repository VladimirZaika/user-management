import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Grid, Typography } from '@mui/material';
import axios from '../../../config/axios/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById } from '../../../config/redux/slices/users';

import cls from './UserEdit.module.scss';

const UserEdit = () => {
    const titleText = 'Let\'s edit User!';
    const alertTextSuccess = 'User has been successfully upgraded.';
    const btnText = 'Submit New User';
    const errText = 'Ooops! Somthing going wrong.';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{ id } = useParams();
    const [ userData, setUserData ] = useState();
    const [ userId, setUserId ] = useState( id );
    const [ dataLoaded, setDataLoaded ] = useState( false );
    const [ popupState, setPopupState ] = useState( false );
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
    };

    const user = useSelector( state => {
        const data = state.users.posts.items.data;

        if ( !Array.isArray(data) ) {
          return false;
        }

        const findUser = data.find( obj => Number(obj.id) === Number(userId) );

        return findUser || false;
    } );
  
    useEffect( () => {
        if ( !user && !dataLoaded ) {
            dispatch( fetchUserById(userId) ).then( response => {
                setUserData( response );
            } );

            setDataLoaded( true );
        }
    }, [ dispatch, user, id, dataLoaded ] );

    const userObj = user ? user : userData?.payload?.data;

    const { id: extractedId, ...cleaneduserObj } = userObj || {};

    const handleSubmit = async ( values, {setSubmitting} ) => {
        try {

            if ( values && typeof values === 'object' ) {
                values.id = userId;

                const response = await axios.put( `/users/${userId}`, JSON.stringify(values) );

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
            { userObj ? (
                <Grid container className={ cls[classes.formSection] }>
                    <div className={ cls[classes.formTitle] }>
                        <Typography
                                variant="h4" 
                                component="h1"
                        >
                            { titleText }
                        </Typography>
                    </div>
                    <Formik
                        initialValues={ cleaneduserObj }
                        validate={ values => {
                            const errors = {};

                            if (!values.email) {
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
                                        className={ touched.email && errors.email ? cls[classes.ivalidInput] : '' }
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
                        ) }
                    </Formik>

                    { popupState && (
                        <div className={ cls[classes.popup] }>
                            <Typography
                                    variant="h4" 
                                    component="span"
                            >
                                { alertTextSuccess }
                            </Typography>
                        </div>
                    ) }

                </Grid>
            ) : (
                <Grid container className={ cls[classes.formSection] }>
                    <div className={ cls[classes.formTitleAlert] }>
                        <Typography
                                variant="h3" 
                                component="h1"
                        >
                            { errText }
                        </Typography>
                    </div>
                </Grid>
            ) }
        </main>
    );
};

export default UserEdit;
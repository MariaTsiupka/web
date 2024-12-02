import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Button from '../Button.js';
import ErrorMessages from "../error.message.js";

function Checkout() {
    const navigate = useNavigate();
    return(<>
    <h1 className="checkout-title">Checkout</h1>
    <Formik
        initialValues={{
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            Adress: '',
        }}
        validationSchema={Yup.object({
            FirstName: Yup.string()
                .matches(/^[a-zA-Z0-9 ]+$/, "Special characters are not allowed")
                .min(3, 'Must be at least 3 characters')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            LastName: Yup.string()
                .matches(/^[a-zA-Z0-9 ]+$/, "Special characters are not allowed")
                .min(5, 'Must be at least 5 characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            Email: Yup.string()
                .matches(/.+@gmail\.com$/, "Email must end with @gmail.com")
                .required('Required'),
            Phone: Yup.string()
                .matches(/^[0-9]+$/, 'Phone number must contain only digits')
                .length(10, "Phone number must be exactly 10 digits")
                .required('Required'),
            Adress: Yup.string()
                .min(5, 'Must be at least 5 characters')
                .required('Required'),
        })}
        onSubmit={(values) => {
            console.log('Form data:', values);
            navigate("/success");
        }}
    >
    {() => (
        <Form>
            <div className="fields-name">
                <div className="field-first-name">
                    <label>First Name</label>
                    <Field className="input-first-name" name="FirstName" type="text"/>
                    <ErrorMessages name="FirstName" />
                </div>
                <div className="field-last-name">
                    <label>Last Name</label>
                    <Field className="input-first-name" name="LastName" type="text"/>
                    <ErrorMessages name="LastName" />
                </div>
            </div>
            <div className="fields-email-phone">
                <div className="field-email">
                    <label>Email</label>
                    <Field className="input-first-name" name="Email" type="text"/>
                    <ErrorMessages name="Email" />
                </div>
                <div className="field-phone">
                    <label>Phone</label>
                    <Field className="input-first-name" name="Phone" type="text"/>
                    <ErrorMessages name="Phone" />
                </div>
            </div>
            <div className="field-adress">
                <label className="label-adress">Adress</label>
                <Field className="input-adress" name="Adress" type="text"/>
                <ErrorMessages name="Adress" />
            </div>
            <div className="buttons">
                <Link className="link" to="/cart">
                    <Button className="back-btn" text="Go Back"/>
                </Link>
                <Button className="add-btn" text="Continue" type="submit" />
            </div>
        </Form>
        )}
    </Formik>
    </>)
}

export default Checkout;
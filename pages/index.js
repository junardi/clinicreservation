import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";

import GeneralLayout from '../components/layouts/generallayout';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import doctorImage from "../images/doctor.jpg";
import Image from 'next/image';

const defaultFormFields = {
  username: '',
  password: ''
};

function Home() {


  const router = useRouter();

  const [isLoginError, setIsLoginError] = useState(false);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;

  const handleFormInputsChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const doLogin = async(event) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password,
    });

    if(result.error) {
      setIsLoginError(true);
    } else {
      //router.push("/admin");
    }


  };  

  return (
    <>
      <Head>
        <title>Online Reservation and Appointment With Records System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <Container>
        <Row>
          <Col xs="12">
            <br />
            <h1>RGT CLinic</h1>
            <p><strong>Opening Hours:</strong> Monday to Saturday 8:00 am - 12:00 pm/1:00 pm - 5:00pm</p>
            <br />
          </Col>

          <Col xs="5">
            <div className='items-container'>

              <form>
                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="name"><strong>Name of Patient</strong>: </label></p>
                  <input className='form-control' type="text" />
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="address"><strong>Patient Address</strong>: </label></p>
                  <input className='form-control' type="text" />
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="number"><strong>Contact Number</strong>: </label></p>
                  <input className='form-control' type="text" />
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="gender"><strong>Gender</strong>: </label></p>
                  <input className='form-control' type="text" />
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="age"><strong>Age</strong>: </label></p>
                  <input className='form-control' type="text" />
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 10}}><label htmlFor="email"><strong>Email Address</strong>: </label></p>
                  <input className='form-control' type="text" />
                </div>

                <button type='button' className='btn btn-primary'>Process Reservation</button>

              </form>
            
            </div>
          </Col>

          <Col xs="7" style={{ paddingLeft: '40px' }} className="position-relative">
            <Image
              src={doctorImage}
              alt="Picture of the author"
              layout="responsive"
            />
          </Col>


        </Row>
      </Container>  
      
    
    </>
  )

}

Home.layout = GeneralLayout;
export default Home;
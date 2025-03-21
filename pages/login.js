import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head'

import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";
import GeneralLayout from '../components/layouts/generallayout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import doctorImg from '././../images/admin-doctor.jpg';
import Image from 'next/image';

const defaultFormFields = {
  username: '',
  password: ''
};

function Login() {


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

    console.log(username);
    console.log(password);

    const result = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password,
    });

    console.log(result);

    if(result.error) {
      setIsLoginError(true);
    } else {
      router.push("/admin");
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
      <main>

        <div className="login-container">

          <Container>
            <Row>
              
              <Col>
                
                <div className="login-wrap">
                  <h1>Login</h1>
                  <Form>
                    
                    <Form.Group className="mb-3 inline-group" controlId="formBasicUsername">
                      <Form.Label className='label'>Username:</Form.Label>
                      <Form.Control type="text" name="username" onChange={handleFormInputsChange} />
                    </Form.Group>

                    <Form.Group className="mb-3 inline-group" controlId="formBasicPassword">
                      <Form.Label className='label'>Password:</Form.Label>
                      <Form.Control type="password" name="password" onChange={handleFormInputsChange} />
                    </Form.Group>

                    { isLoginError &&
                    <p className='login-error'>Invalid username or password.</p>
                    }
                  
                    <div className="submit-button-container">
                      <Button size='sm' className='btn-primary' type="submit" onClick={doLogin}>
                        LOG IN
                      </Button>
                    </div>
                  
                  </Form>
                </div>
                 
              </Col>

              <Col>
                <Image 
                  src={doctorImg} 
                  alt={`Doctor image`} 
                  width={600}
                  height={500}
                />
              </Col>

            </Row>
          </Container>

        </div>
      
      </main>
    </>
  )

}


Login.layout = GeneralLayout;

export default Login;
import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";

import GeneralLayout from '../components/layouts/generallayout';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import doctorImage from "../images/doctor.jpg";
import Image from 'next/image';

import Calendar from 'react-calendar';
import NonSSRWrapper from '../components/nonssr/nonssr.component';
import { hashPassword } from '../lib/data-helper';
import { toast } from 'react-toastify';


const defaultFormFields = {
  username: '',
  password: ''
};


const defaultReserveFormFields = {
  name: '',
  address: '',
  contactNumber: '',
  gender: '', 
  age: '',
  email: '',
  date: ''
};


const dateToday = new Date();
dateToday.setDate(dateToday.getDate() + 2);
const year = dateToday.getFullYear();
const month = dateToday.getMonth();
const dayOfTheMonth = dateToday.getDate();


const makeid = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


function Home() {


  const router = useRouter();


  // below is for authentication related 
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

  // below is for fields

  const [reserveFormFields, setDefaultReserveFormFields] = useState(defaultReserveFormFields);
  const { name, address, contactNumber, gender, age, email, date } = reserveFormFields;

  const handleReserveFormInputsChange = (event) => {
    const { name, value } = event.target;
    setDefaultReserveFormFields({...reserveFormFields, [name]: value});
  };

  const [dateValue, onChangeDate] = useState(new Date());

  const newDateChange = (dateObj) => {
   // console.log(event)
   onChangeDate(dateObj);

    const month = dateObj.getMonth() + 1; 
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const date = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);

    setDefaultReserveFormFields({...reserveFormFields, ['date']: date});
  };


  const disableSunday = ({activeStartDate, date, view }) => date.getDay() === 0;
  const sundayText = ({ activeStartDate, date, view }) => {
    //view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null

    if(view === 'month' && date.getDay() === 0 ) {
      return ' - Close';
    } else {
      return null;
    }
  };


  const doReserve = async(event) => {
    event.preventDefault();
 
   
    if(name != '' && address != '' && contactNumber != '' && gender != '' && age != '' && email != '' && date != '') {                                         
      
      const pass = makeid(7);
      const data = {
        username: makeid(6),
        password: await hashPassword(pass),
        passwordText: pass,
        role: 'user',
        patientName: name,
        patientAddress: address,
        contactNumber: contactNumber,
        gender: gender, 
        age: age,
        emailAddress: email,
        date: date,
        status: 'pending'
      };

      //console.log(data);

      try {
        const fetchData = await fetch('/api/patients',{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const jsonData = await fetchData.json();

        const userId = jsonData.data.insertId;

        try {
          const fetchDataPresc = await fetch('/api/userprescriptions',{
            method: 'POST',
            body: JSON.stringify({prescription: 'Not set', userId: userId}),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const jsonDataPresc = await fetchDataPresc.json();

          //console.log(jsonDataPresc);

          toast('Generated username and password is sent to your email: ' + email);
          toast('Check email and proceed to login to view appointment status...');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          
        } catch(error) {
          console.log(error);
        }

      } catch(error) {
        console.log(error);
      }
      

    } else {
      console.log('There is an empty value');
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

          <Col xs="6">
            <div className='items-container'>

              <form>
                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="name"><strong>Name of Patient</strong>: </label></p>
                  <input className='form-control' type="text" name="name" onChange={handleReserveFormInputsChange} />                                                        
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="address"><strong>Patient Address</strong>: </label></p>
                  <input className='form-control' type="text" name="address" onChange={handleReserveFormInputsChange} />
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="number"><strong>Contact Number</strong>: </label></p>
                  <input className='form-control' type="text" name="contactNumber" onChange={handleReserveFormInputsChange} />
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="gender"><strong>Gender</strong>: </label></p>
                  <select className='form-control' name="gender" onChange={handleReserveFormInputsChange}>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Male">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 2}}><label htmlFor="age"><strong>Age</strong>: </label></p>
                  <input className='form-control' type="text" name="age" onChange={handleReserveFormInputsChange} />
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 10}}><label htmlFor="email"><strong>Email Address</strong>: </label></p>
                  <input className='form-control' type="text" name="email" onChange={handleReserveFormInputsChange} />
                </div>

                <div className="form-group">
                  <p style={{marginBottom: 10}}><label htmlFor="date"><strong>Select Date</strong>: </label></p>
               
                  <NonSSRWrapper>
                    <Calendar 
                      onChange={newDateChange} 
                      value={dateValue} 
                      minDate={new Date(year, month, dayOfTheMonth)}
                      tileDisabled={disableSunday}
                      tileContent={sundayText}

                    />
                  </NonSSRWrapper>

  
                </div>

                <br />
                
                <button type='button' className='btn btn-primary' onClick={doReserve}>Process Reservation</button>

              </form>
            
            </div>
          </Col>

          <Col xs="6" style={{paddingLeft: '30px'}}  className="position-relative">
            <br />
            <Image
              src={doctorImage}
              alt="Picture of the author"
              priority
            />
          </Col>

          


        </Row>
      </Container>  
      
    
    </>
  )

}

Home.layout = GeneralLayout;
export default Home;
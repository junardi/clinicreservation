import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

import { useSession, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { toast } from 'react-toastify';
import { sendEmail } from '../../utils/email/email.util';


const setupDate = (dateString) => {
  const dateObj = new Date('2023-02-01T16:00:00.000Z');
  //console.log(dateObj);

  const month = dateObj.getMonth() + 1; 
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const date = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);

  return date;

};

function AdminComponent() {

  

  const router = useRouter();

  const { data: session, status } = useSession();
  //console.log(session);

  // const { data: session, status } = useSession();
  // if(status === "authenticated") {
  //   console.log(session);
  // }

  // useEffect(()=>{
  //   getSession().then(session => {
  //     if(!session) {
  //       router.push('/');
  //     }
  //   })
  // }, []);

  const [reserveData, setReserveData] = useState({});

  const [recall, setRecall] = useState(false);


  useEffect(() => {
    const getReservations = async() => {
      try {
        const fetchData = await fetch('/api/patients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const jsonData = await fetchData.json();

        console.log(jsonData);
        setReserveData(jsonData);
        return jsonData;
       

      } catch(error) {
        console.log(error);
        return error;
      }
    };

    getReservations();
  }, [recall]);


  const approve = async(event, data) => {
    event.preventDefault();

    data.date = setupDate(data.date);
    data.status = 'approved';

    try {
      const fetchData = await fetch('/api/patients', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const jsonData = await fetchData.json();

      console.log(jsonData);
      toast("approved.");
      const templateParams = {
        from_name: 'From CLinic', 
        to_name: data.patientName,
        to_email: data.emailAddress,
        intro_message: "Appointment Status",
        message: "Your appointment is approved"
      };

      await sendEmail(templateParams);
      setRecall(!recall);
    } catch(error) {
      console.log(error);
      toast("something went wrong.");
    }
  };

  const reject = async(event, data) => {
    event.preventDefault();

    data.date = setupDate(data.date);
   
    try {
      const fetchData = await fetch('/api/patients', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const jsonData = await fetchData.json();

      console.log(jsonData);
      toast("Rejected.");
      const templateParams = {
        from_name: 'From CLinic', 
        to_name: data.patientName,
        to_email: data.emailAddress,
        intro_message: "Appointment Status",
        message: "Your appointment is rejected"
      };

      await sendEmail(templateParams);
      setRecall(!recall);
    } catch(error) {
      console.log(error);
      toast("something went wrong.");
    }
  };




  return (
    <>
      <Head>
        <title>Admin - Child mapping information system</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Row>
          <Col>

            <br />
            <h3>List of Appointments</h3>
            <br />

            { reserveData && reserveData.data &&
            <Table striped hover>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Address</th>
                  <th>Contact Number</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Prescription</th>
                </tr>
              </thead>
              <tbody>
              {
                reserveData.data.map((el, index) => {
                  return(
                    <tr key={el.userId}>
                      <td>{el.patientName}</td>
                      <td>{el.patientAddress}</td>
                      <td>{el.contactNumber}</td>
                      <td>{el.gender}</td>
                      <td>{el.age}</td>
                      <td>{el.emailAddress}</td>
                      <td>{setupDate(el.date)}</td>
                      <td>
                        { el.status === 'pending' &&
                          <Fragment>
                           <Button variant="primary" onClick={(evt) => approve(evt, el)}>Approve</Button>{' '}                            
                           <Button variant="danger" onClick={(evt) => reject(evt, el)}>Reject</Button>
                          </Fragment>
                        } 
                        { el.status === 'approved' &&
                          el.status
                        }
                      </td>
                      <td>
                        <Button disabled={el.status === 'pending' } variant='primary' onClick={() => router.push('/admin/' + el.prescriptionId)}>Set Prescription</Button>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </Table>
            }
            
          </Col>
        </Row>
      </Container>
      
    </>

  )

};


export default AdminComponent;
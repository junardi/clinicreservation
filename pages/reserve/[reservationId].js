import { useSession } from "next-auth/react";
import GeneralLayout from "../../components/layouts/generallayout";
import { useRouter } from "next/router";
import { Container, Row, Col, Form, Button, Table, FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";

import logo from '../../images/clinic.png';
import Image from "next/image";

const defaultFormFields = {
  'prescription': '',
  'userId': ''
}

function SpecificReservation() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const reservationId = router.query.reservationId;

  console.log(reservationId);

  return (  
    <>
      <Container>
        <Row>
          <Col>
            <div className="prescriptionContainer">
              <div className="inner">
                
                <div className="topInner">
                  <Image 
                    src={logo}
                    alt="logo"
                    width={160}
                  />

                  <div>
                    <h2>DR. REY C. TALLADOR MEDICAL CLINIC</h2>     
                    <p>General Medicine/Pediatrics</p>       
                    <p>Aquino Nobleza Street, Janiuay, Iloilo</p>      
                    <p>Jehca Complex Balabag, Pavia, Iloilo</p>
                  </div>
                </div>


              </div>
            </div>
          </Col>
        </Row>
      </Container>

    </>
  )
   
}


SpecificReservation.layout = GeneralLayout;
export default SpecificReservation;
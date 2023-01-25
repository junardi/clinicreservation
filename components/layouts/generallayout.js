import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function GeneralLayout({children}) {
  return (
    <>
      <div className="navigation-container">
        <Container>
          <Row>
            <Col className='navigation-header'>
              
              <h1>
                <Link href='/'>Online Reservation and Appointment With Records System</Link>
              </h1>

              <div className="left-header">
                <Link href="/">Home</Link>
                <Link href="/login">Admin/Patient Login</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="main-container">
        {children}
      </div>

      <div className="footer">
        <Container className='footer-inner'>
          <Row>
            <Col>
              <p>Copyright &copy; 2022 Online Reservation and Appointment With Records System. All Rights Reserved.</p>                 
            </Col>
          </Row>
        </Container>
      </div>


    </>
  )
};
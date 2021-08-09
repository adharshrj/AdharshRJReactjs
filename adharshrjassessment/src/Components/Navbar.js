import React, {useState} from 'react'
import Login from './Login';
import {Navbar, Nav, Form, Button, Modal} from 'react-bootstrap';
import './Navbar.css'
export default function MyNavbar() {

    const [showa, setShowa] = useState(false);
    const handleAClose = () => setShowa(false);
    const handleAShow = () => setShowa(true);
 
    return (
            <div className="MyNavbar">
                <Navbar id = "nav-bar" variant="custom" expand="lg">
                    <Navbar.Brand href="/home"><img
                        src="/favicon.ico"
                        width="40"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Adharsh RJ"
                    /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav">Menu</Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link id = "nav-link" href="/home">Home</Nav.Link>
                            <Nav.Link id = "nav-link" href="#About">About</Nav.Link>
                        </Nav>
                        <Form inline>
                            
                            <Button variant="outline-success" onClick={handleAShow}>Login</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Modal size="md" show={showa} onHide={handleAClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <h2> Welcome User </h2>
                        </Modal.Header>
                        <Login/>
                        </Modal>
            </div>     
    )
}

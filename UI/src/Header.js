import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col, Nav, Navbar, useState } from "react-bootstrap";
import { bounce } from "react-animations";
import Modal from "react-bootstrap/Modal";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import localStorage from "localStorage";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { MDBCol, MDBBtn } from "mdbreact";
import { Tab, Tabs } from "react-bootstrap";
import "./App.css";

const Bounce = styled.div`
  animation: 3s ${keyframes`${bounce}`} infinite;
`;

//Provide ip and port for the call
var ip="149.165.169.244";
var port='';
var urlc="http://"+ip;
class Header extends Component {
  
  constructor(props) {
    //http://user_management-service:8082/
    super(props);
    this.state = {
      isLogin: false,
      showModal1: false,
      showModal2: false,
      showModal3: false,
      email: "",
      password: "",
      newEmail: "",
      newPassword: "",
      newFirstName: "",
      newLastName: "",
      newContact: "",
      modalIsOpen: false,
      user: []
    };
    this.changeState1 = this.changeState1.bind(this);
    this.changeState2 = this.changeState2.bind(this);
    this.changeState3 = this.changeState3.bind(this);

    this.sendLoginData = this.sendLoginData.bind(this);
    this.logout = this.logout.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  componentDidMount() {
    //console.log(localStorage);
    console.log("URL ISSSSS"+urlc);
    this.getUser();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  changeState1() {
    this.setState({
      showModal1: !this.state.showModal1
    });
    this.setState({
      showModal2: false
    });
  }

  changeState2() {
    this.setState({
      showModal2: !this.state.showModal2
    });
    this.setState({
      showModal1: false
    });
  }

  logout() {
    localStorage.setItem("isLogin", "false");
    localStorage.setItem("currentUser", "");
    this.setState({
      isLogin: false,
      showModal1: false
    });
    ToastsStore.success("Successful Log Out");
    window.location.reload();
  }

  onChange1(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  changeState() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  // Axios call to get current user profile
  getUser() {
    var postData = {
      email: localStorage.getItem("currentUser")
    };
    return axios({
      method: "post",
      url: urlc+"/getUser",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: postData
    })
      .then(response => {
        this.setState({
          user: response.data,
          updatedFirstName: response.data.firstName,
          updatedLastName: response.data.lastName,
          updatedContactNumber: response.data.contactNumber
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //axios call to update this user profile
  updateDetails() {
    var postData = {
      email: this.state.user.email,
      password: this.state.updatedPassword,
      firstName: this.state.updatedFirstName,
      lastName: this.state.updatedLastName,
      contactNumber: this.state.updatedContactNumber
    };
    return axios({
      method: "post",
      url: urlc+"/updateUserProfile",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
      .then(response => {
        this.closeModal();
        this.getUser();
        ToastsStore.success("Profile Updated");
      })
      .catch(err => {
        console.log("error while updating" + err);
      });
  }

  sendLoginData() {
    var userCreds = {
      email: this.state.email,
      password: this.state.password
    };

    return axios({
      method: "post",
      url: urlc+"/login",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: userCreds
    })
      .then(response => {
        if (response["data"] == "Incorrect Username") {
          ToastsStore.error(
            "Incorrect Credentials. Please Enter Valid Email and Password"
          );
        }

        if (response["data"] == "Login Success") {
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("currentUser", this.state.email);
          localStorage.setItem("Password", this.state.password);
          localStorage.setItem("firstName:", this.state.newFirstName);
          localStorage.setItem("lastName:", this.state.newLastName);
          ToastsStore.success("Successful Log In");
          window.location.reload();

          this.setState({
            isLogin: true
          });
        }

        if (response["data"] == "Incorrect Password") {
          ToastsStore.error(
            "Incorrect Credentials. Please Enter Valid Email and Password"
          );
        }
      })
      .catch(err => {
        //alert(err);
        console.log(err);
      });
  }

  createNewUser() {
    var newUserData = {
      email: this.state.newEmail,
      password: this.state.newPassword,
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName,
      contactNumber: this.state.newContact,
      points: 0
    };

    return axios({
      method: "post",
      url: urlc+"/signUp",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: newUserData
    })
      .then(response => {
        if (response["data"] == "success") {
          this.sendEmail(newUserData);
          this.changeState2();
        }
      })
      .catch(err => {});
  }

  sendEmail(user) {
    return axios({
      method: "post",
      url: urlc+"/welcomeEmail",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: user
    })
      .then(response => {})
      .catch(err => {});
  }

  changeState3() {
    this.getUserNotificationStatus();
    this.setState({
      showModal3: !this.state.showModal3
    });
  }


  render() {
    if (localStorage.getItem("isLogin") == "true") {
      
      return (
       
        <div>
           
          <Modal
            show={this.state.modalIsOpen}
            onHide={this.closeModal}
            style={{ zIndex: 50000 }}
            contentLabel="Example Modal"
          >
            <div
              style={{
                // fontFamily: "Patua One",
                color: "Black",
                fontSize: "28px",
                padding: "1%",
                textAlign:"center"
              }}
            >
              User Profile
            </div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
              <Tab
                className="myClass"
                eventKey="home"
                title="Account Details"
                style={{ width: "700px" }}
              >
                <div style={{ padding: "3%" }}>
                  <p
                    style={{
                      color: "#0277bd",
                      marginBottom: "0px",
                      fontSize: "14px"
                    }}
                  >
                    Email:
                  </p>
                  <p
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      fontSize: "18px"
                    }}
                  >
                    {this.state.user.email}
                  </p>
                  <br></br>
                  <p
                    style={{
                      color: "#0277bd",
                      marginBottom: "0px",
                      fontSize: "14px"
                    }}
                  >
                    First Name:
                  </p>
                  <p
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      fontSize: "18px"
                    }}
                  >
                    {this.state.user.firstName}
                  </p>
                  <br></br>
                  <p
                    style={{
                      color: "#0277bd",
                      marginBottom: "0px",
                      fontSize: "14px"
                    }}
                  >
                    Last Name:
                  </p>
                  <p
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      fontSize: "18px"
                    }}
                  >
                    {this.state.user.lastName}
                  </p>
                  <br></br>
                  <p
                    style={{
                      color: "#0277bd",
                      marginBottom: "0px",
                      fontSize: "14px"
                    }}
                  >
                    Contact Number:
                  </p>
                  <p
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      fontSize: "18px"
                    }}
                  >
                    {this.state.user.contactNumber}
                  </p>
                  <br></br>
                </div>
              </Tab>
              <Tab eventKey="profile" title="Edit" className="myClass">
                <Form>
                  <div style={{ padding: "3%" }}>
                    <fieldset className="form-group">
                      <br></br>
                      <p
                        style={{
                          color: "#0277bd",
                          marginBottom: "0px",
                          fontSize: "14px"
                        }}
                      >
                        Email:
                      </p>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        onChange={this.onChange1}
                        value={this.state.user.email}
                      />
                      <br></br>
                      <p
                        style={{
                          color: "#0277bd",
                          marginBottom: "0px",
                          fontSize: "14px"
                        }}
                      >
                        First Name:
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        id="updatedFirstName"
                        name="updatedFirstName"
                        value={this.state.updatedFirstName}
                        onChange={this.onChange1}
                      />
                      <br></br>
                      <p
                        style={{
                          color: "#0277bd",
                          marginBottom: "0px",
                          fontSize: "14px"
                        }}
                      >
                        Last Name:
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        id="updatedLastName"
                        name="updatedLastName"
                        value={this.state.updatedLastName}
                        onChange={this.onChange1}
                      />
                      <br></br>
                      <p
                        style={{
                          color: "#0277bd",
                          marginBottom: "0px",
                          fontSize: "14px"
                        }}
                      >
                        Password:
                      </p>
                      <input
                        className="form-control"
                        type="password"
                        id="updatedPassword"
                        name="updatedPassword"
                        value={this.state.updatedPassword}
                        onChange={this.onChange1}
                        placeholder="Update Password..."
                      />
                      <br></br>
                      <p
                        style={{
                          color: "#0277bd",
                          marginBottom: "0px",
                          fontSize: "14px"
                        }}
                      >
                        Contact Number:
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        id="updatedContactNumber"
                        name="updatedContactNumber"
                        value={this.state.updatedContactNumber}
                        onChange={this.onChange1}
                      />
                    </fieldset>
                    <button
                      className="btn btn-success"
                      style={{ float: "right" }}
                      type="button"
                      onClick={this.updateDetails}
                    >
                      Update
                    </button>
                    <br></br>
                  </div>
                </Form>
              </Tab>
            </Tabs>
          </Modal>
          
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content />
          <meta name="author" content />
          <title>DevoTeam</title>
          <link
            href="./vendor/bootstrap/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            href="./vendor/fontawesome-free/css/all.min.css"
            rel="stylesheet"
          />
          <link
            href="./vendor/simple-line-icons/css/simple-line-icons.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic"
            rel="stylesheet"
            type="text/css"
          />
          <link href="./css/landing-page.min.css" rel="stylesheet" />
          <nav
            className="navbar navbar-light bg-light static-top"
            style={{ padding: "0%" }}
          >
            <div
              className="container-fluid"
              style={{ backgroundColor: "#37bc6f", color: "white", paddingTop:"20px" }}
            >
              <a
                className="navbar-brand"
                style={{ fontSize: "50px", color: "white", marginLeft:"20%"  }}
                href="/home"
              >
                DEVOTEAM WEATHER SERVICES
              </a>

              <Form>
                <MDBBtn>
                  <a style={{ color: "white", fontSize: "22px" }} onClick={this.logout}>
                    Logout
                  </a>
                </MDBBtn>
                <MDBBtn>
                  <i
                    className="fas fa-user-circle fa-2x"
                    onClick={this.openModal}
                  ></i>
                </MDBBtn>
              </Form>
            </div>
          </nav>
          <ToastsContainer store={ToastsStore} />
        </div>
      );
    } else {
      return (
        <div>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content />
          <meta name="author" content />
          <title>DevoTeam</title>
          <link
            href="./vendor/bootstrap/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            href="./vendor/fontawesome-free/css/all.min.css"
            rel="stylesheet"
          />
          <link
            href="./vendor/simple-line-icons/css/simple-line-icons.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic"
            rel="stylesheet"
            type="text/css"
          />
          <link href="./css/landing-page.min.css" rel="stylesheet" />
          <nav
            className="navbar navbar-light bg-light static-top"
            style={{ padding: "0%" }}
          >
            <div
              className="container-fluid"
              style={{ backgroundColor: "#37bc6f", color: "white" , paddingTop:"20px"}}
            >
              <a
                className="navbar-brand"
                style={{ fontSize: "50px", color: "white",marginLeft:"20%" }}
                href="/home"
              >
               DEVOTEAM WEATHER SERVICES           
               </a>
              <Form>
                <MDBBtn>
                  <a
                    onClick={this.changeState1}
                    show={this.state.isLogin}
                    style={{ color: "white" ,fontSize: "22px"}}
                  >
                    Login
                  </a>
                </MDBBtn>
                <Modal
                  style={{ zIndex: 50000 }}
                  show={this.state.showModal1}
                  onHide={this.changeState1}
                >
                  <Form style={{ padding: "20px" }}>
                    <Form.Group controlId="Header">
                      <h1 style={{ textAlign: "center" }}>Login</h1>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label style={{ fontSize: 18 }}>
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label style={{ fontSize: 18 }}>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                      />
                    </Form.Group>
                    <Button
                      style={{ float: "right" }}
                      variant="primary"
                      type="Button"
                      onClick={this.sendLoginData}
                    >
                      Login
                    </Button>
                  </Form>
                </Modal>
                &nbsp;&nbsp;&nbsp;
                <MDBBtn>
                  <a
                    onClick={this.changeState2}
                    show={this.state.isLogin}
                    style={{ color: "white" ,fontSize: "22px"}}
                  >
                    Sign Up
                  </a>
                </MDBBtn>
                <Modal
                  style={{ zIndex: 50000 }}
                  show={this.state.showModal2}
                  onHide={this.changeState2}
                >
                  <Form style={{ padding: "20px" }}>
                    <Form.Group controlId="Header">
                      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
                    </Form.Group>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label style={{ fontSize: 18 }}>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={this.state.newEmail}
                          name="newEmail"
                          onChange={this.onChange}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label style={{ fontSize: 18 }}>
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={this.state.newPassword}
                          name="newPassword"
                          onChange={this.onChange}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridFirstName">
                      <Form.Label style={{ fontSize: 18 }}>
                        First Name
                      </Form.Label>
                      <Form.Control
                        placeholder=""
                        value={this.state.newFirstName}
                        name="newFirstName"
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGridLastName">
                      <Form.Label style={{ fontSize: 18 }}>
                        Last Name
                      </Form.Label>
                      <Form.Control
                        placeholder=""
                        value={this.state.newLastName}
                        name="newLastName"
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridContact">
                        <Form.Label style={{ fontSize: 18 }}>
                          Contact
                        </Form.Label>
                        <Form.Control
                          value={this.state.newContact}
                          name="newContact"
                          onChange={this.onChange}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Button
                      style={{ float: "right" }}
                      variant="primary"
                      type="Button"
                      onClick={this.createNewUser}
                    >
                      Sign Up
                    </Button>
                  </Form>
                </Modal>
              </Form>
            </div>
          </nav>
          <ToastsContainer store={ToastsStore} />
        </div>
      );
    }
  }
}

export default Header;

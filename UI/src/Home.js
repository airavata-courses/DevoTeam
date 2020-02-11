import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {default as UUID} from "node-uuid";
import axios from "axios";

//import LandingPage from './LandingPage'
import localStorage from "localStorage";
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);{
      this.state={
        year:"",
        month:"",
        day:"",
        radar:"",
        key:""
      };
      this.onChange = this.onChange.bind(this);
      this.userInput = this.userInput.bind(this);

    }
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  componentWillMount() {
    this.id = UUID.v4();
    console.log("Key is",this.id);
  }

  userInput() {
    var inputData = {
      year: this.state.year,
      month: this.state.month,
      day: this.state.day,
      radar: this.state.radar,
      key: this.id,
      email: localStorage.getItem("currentUser")
    };

    return axios({
      method: "post",
      url: "http://localhost:8081/weather",
      headers: {
        "Access-Control-Allow-Origin": "*"

      },
      data: inputData
    })
      .then(response => {
        this.setState({
          user: response.data,
          spectrum_width: response.data.max_spectrum_width,
          plot: response.data.plot,
        });
       /* if (response["data"] == "success") {
       console.log("Success");}*/ 

      })
      .catch(err => {});
  }

  

  render() {
    if (localStorage.getItem("isLogin") == "true") {
    return (
      <React.Fragment>
       
        <div>
          <br></br>
          <br></br>
          <h4><center>Find your weather</center></h4>
          <Form>
          <Link to={{ pathname: "/Sessions" }} style={{ float: "right", fontSize:"30px" }}>
           Sessions
          </Link>
                  <div style={{ padding: "3%" }}>
                    <fieldset className="form-group">
                      <br></br>
                      <p
                        style={{
                          color: "#0277bd",
                          marginBottom: "0px",
                          fontSize: "20px"
                        }}
                      >
                        Enter Year:
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        name="year"
                        value={this.state.year}
                        onChange={this.onChange}
                        
                      />
                      <br></br>
                      <p
                        style={{
                          color: "#0277bd",
                          marginBottom: "0px",
                          fontSize: "20px"
                        }}
                      >
                        Enter Month:
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        name="month"
                        value={this.state.month}
                        onChange={this.onChange}
                       
                      />
                      <br></br>
                      <p
                        style={{
                          color: "#0277bd",
                          marginBottom: "0px",
                          fontSize: "20px"
                        }}
                      >
                        Enter Day:
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        name="day"
                        value={this.state.day}
                        onChange={this.onChange}
                       
                      />
                      <br></br>
                      <p
                        style={{
                          color: "#0277bd",
                          marginBottom: "0px",
                          fontSize: "20px"
                        }}
                      >
                        Radar station:
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        name="radar"
                        value={this.state.radar}
                        onChange={this.onChange}
                        
                      />
                    </fieldset>
                    <button
                      className="btn btn-success"
                      style={{ float: "right" }}
                      type="button"
                      onClick={this.userInput}
                    >
                      Find
                    </button>
                    <br></br>
                  </div>
                </Form>
                <div>
                  <img src="data:image/png;base64, +{this.state.plot}" alt="Red dot"/>
                </div>
        </div>
      </React.Fragment>
    );
  }

else{
  return(
    <div>
   
    
          <br></br>
          <br></br>
          <h4><center>Login to get the weather data</center></h4>
        
     
        </div>
  );
}
  }
}

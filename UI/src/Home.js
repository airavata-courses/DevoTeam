import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import {default as UUID} from "node-uuid";
import axios from "axios";
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
      url: "http://localhost:8080",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: inputData
    })
      .then(response => {
        if (response["data"] == "success") {
         console.log("Success");
        }
      })
      .catch(err => {});
  }

  getSession(){
    var postData = {
      email: localStorage.getItem("currentUser")
    };
    return axios({
      method: "post",
      url: "http://localhost:8080/getSession",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: postData
    })
      .then(response => {
        this.setState({
          
        });
      })
      .catch(err => {
        console.log(err);
      });
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
            <div>
              <button
                className="btn btn-success"
                style={{ float: "right" }}
                type="button"
                onClick={this.userInput}
                    >
                     Sessions
              </button>
              </div>
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

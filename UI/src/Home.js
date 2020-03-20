import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {default as UUID} from "node-uuid";
import axios from "axios";

//import LandingPage from './LandingPage'
import localStorage from "localStorage";

//Provide ip and port for the call
var temp=0;
var ip="149.165.169.244:30000";
var urlc="http://"+ip;
export default class HomeComponent extends Component {
    constructor(props) {
        super(props);{
            this.state={
                year:"",
                month:"",
                day:"",
                radar:"",
                t_id:""
            };
            this.onChange = this.onChange.bind(this);
            this.userInput = this.userInput.bind(this);
            

        }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            isChange: true
        });


    }
    
    componentWillMount() {
        console.log(this.state.id)
    }

 
    userInput() {
        if(this.state.isChange==true) {
            this.setState({
                isChange: false
            })
            this.id = UUID.v4();
        }
        console.log("Key on find",this.id)
        var inputData = {
            year: this.state.year,
            month: this.state.month,
            day: this.state.day,
            radar: this.state.radar,
            t_id: this.id,
            email: localStorage.getItem("currentUser")
        };

        return axios({
            method: "post",
            url: urlc+"/weather",
            headers: {
                "Access-Control-Allow-Origin": "*"

            },
            data: inputData
        })
            .then(response => {
                console.log("Plot image:", response.data)
                this.setState({
                    data: response.data,
                   
                    plot: response.data.plot,
                });
                if (response["data"] == "Sent user input to micro-services")
                {
                   this.setState(
                       {
                            output: response.data,
                            status: "Status:  "
                       }
                   )
                }
                else if(response["data"] == "Request in process please wait"){
                    this.setState(
                        {
                             output: response.data,
                             status: "Status:  "
                        }
                    )  
                }
                else{
                    this.setState(
                        {
                            output: response.data.max_spectrum_width,
                            status: "Maximum spectrum width is: ",
                            imgurl: "data:image/png;base64, "+response.data.plot

                        }
                    )
                    
                }

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

                             <h5><center>{this.state.status}   {this.state.output}</center></h5>
                            

                            <img src={this.state.imgurl}/>


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

import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import axios from "axios";
import localStorage from "localStorage";
import {default as UUID} from "node-uuid";

//Provide ip and port for the call
var ip="149.165.169.244:30001";
var urlc="http://"+ip;
export default class Sessions extends Component{
    constructor(props) {
        
        super(props);{
            this.state={
                email:"",
            };
            this.getSession = this.getSession.bind(this);
        }
    }
    componentDidMount() {
        console.log("cdvbdskhv")
        this.getSession();
    }
    getSession(){
        var postData = {
            email: localStorage.getItem("currentUser")
        };
        console.log(postData)
        return axios({
            method: "post",
            url: urlc+"/fetch",
            headers: { "Access-Control-Allow-Origin": "*" },
            data: postData
        })
            .then(response => {

                this.setState({
                    output: JSON.stringify(response.data)
                });
                console.log("abcv",response.data);
                this.state.output.map((el, ind) => {
                    console.log("ashvcjh",el);
                    console.log("axa",el.email)
                })
            })
            .catch(err => {
                console.log(err);
            });
    }



    render(){
        let sessions;
        return(
            <>
            <div><br></br><center>
                <h3>History of previous sessions</h3>
                </center>
            </div>
            <div  style={{
                display: "inline-block",
                marginBottom: 18,
                marginRight: 18,
                marginLeft: 38,
                paddingTop: "0px",
                fontColor: "black"}}>
                    <br></br><br></br>
                    {this.state.output}<br></br>



            </div>
           </>
            
        )
            
    }
}

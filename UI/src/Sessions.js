import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import axios from "axios";
import localStorage from "localStorage";
import {default as UUID} from "node-uuid";

export default class Sessions extends Component{
    constructor(props) {
        super(props);{
            this.state={
                email:"",
                year:"",
                month:"",
                day:"",
                radar:"",
                key:""
            };
            this.getSession = this.getSession.bind(this);
        }
    }
    componentWillMount() {
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
            url: "http://localhost:8081/sessions/fetch",
            headers: { "Access-Control-Allow-Origin": "*" },
            data: postData
        })
            .then(response => {

                this.setState({
                    output: JSON.stringify(response.data)
                });
            })
            .catch(err => {
                console.log(err);
            });
    }



    render(){
        console.log("eee:", this.state.output)
        return(

             <div>
               <p>
                     <h3><center> History of your previous sessions here</center></h3>
                   {/*}  //          {this.state.output.map((el, i) =>(
            //             <div>
            //                 style={{
            //                 display: "inline-block",
            //                 marginBottom: 18,
            //                 marginRight: 18,
            //                 marginLeft: 38,
            //                 paddingTop: "0px",
            //                 fontColor: "black"}}
            //                 >
            //
            //                 <pre>Your input Year:{el.year}, Month:{el.month}, Day:{el.day}, Radar station:{el.radar}</pre>
            //
            //
            //             </div>

                   // ))}


{/*rgrg: {this.state.output[0].email}*/}

                </p>
            </div>

        );
    }
}

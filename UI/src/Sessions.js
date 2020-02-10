import React, { Component } from "react";
import axios from "axios";
import localStorage from "localStorage";

export default class Sessions extends Component{
    constructor(props) {
        super(props);{
          this.state={
            year:"",
            month:"",
            day:"",
            radar:"",
            key:""
          };
          this.getSession = this.getSession.bind(this);
    
        }
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
render(){
    return(
<div>
<p>
   <h3><center> History of your previous sessions here</center></h3>
   {this.getSession}
</p>
</div>
    );
}
} 

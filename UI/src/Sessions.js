import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import axios from "axios";
import localStorage from "localStorage";

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
          this.userInput = this.userInput.bind(this);
    
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
              /*yyyy:response.data.year,
              mm:response.data.month,
              dd:response.data.day,
              radarst:response.data.radar,
              time:response.data.updatedAt*/
              output:response.data
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
   {this.state.output.map((el, i) =>(
       <div>
           style={{
                    display: "inline-block",
                    marginBottom: 18,
                    marginRight: 18,
                    marginLeft: 38,
                    paddingTop: "0px",
                    fontColor: "black"}}
        >

        <pre>Your input Year:{el.year}, Month:{el.month}, Day:{el.day}, Radar station:{el.radar}</pre>
       {/*<Link to={{ pathname: "/SessionResult" }} style={{ float: "right", fontSize:"30px" }}>
           Sessions
           </Link>*/}
       </div>

   ))}
   
</p>
</div>
    );
}
} 

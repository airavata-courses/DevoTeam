import React, { Component } from "react";
//import LandingPage from './LandingPage'
import localStorage from "localStorage";
export default class HomeComponent extends Component {
  render() {
    if (localStorage.getItem("isLogin") == "true") {
    return (
      <React.Fragment>
        {/*<LandingPage/>*/}
        <div>
          <br></br>
          <br></br>
          <h4><center>Give your input</center></h4>
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

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBCol, MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import ls from "local-storage";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      location: ""
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    //this.state = { location: "" };
  }

  _onButtonClick = id => {
    this.setState({ [id]: true });
  };

  handleChange = event => {
    this.setState({ location: event.target.value });
    ls.set("city", event.target.value);
  };

  handleClick(data) {
    console.log(data);
  }

  componentDidMount() {
    this.setState({ location: ls.get("city") });
  }

  render() {
    return (
      <React.Fragment>
        <div className="search-bar" >
          <MDBCol md="12">
            <div className="input-group md-form form-sm form-1 pl-0">
              <input
                className="form-control my-0 py-1"
                type="text"
                placeholder="Enter destination"
                aria-label="Search"
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
              />
              &nbsp;&nbsp;&nbsp;
              <div className="input-group-prepend">
                <Link
                  to={{ pathname: "/Dashboard", data: this.state.location }}
                >
                  <MDBBtn
                    id="searchButton"
                    onClick={() => this._onButtonClick()}
                    rounded
                    size="md"
                    color="secondary"
                  >
                    <i className="fas fa-search-location fa-1.5x"></i>
                    {/* Search */}
                  </MDBBtn>
                </Link>
              </div>
            </div>
          </MDBCol>
        </div>
      </React.Fragment>
    );
  }
}

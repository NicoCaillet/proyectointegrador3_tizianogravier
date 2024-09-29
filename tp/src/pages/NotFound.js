import React, { Component } from "react";
import "../components/NotFound/NotFound.css";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <img
          src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"
          alt="404 Not Found"
          className="gif"
        />
        <h1 className="NotFound">404: Not Found</h1>
        <h2 className="NotFound">Parece que esta página no existe!</h2>
      </div>
    );
  }
}

export default NotFound;

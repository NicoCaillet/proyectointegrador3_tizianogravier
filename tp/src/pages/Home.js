// Home.js
import React from "react";
import Peliculas from "../components/Peliculas/Peliculas";
import SearchForm from "../components/SearchForm/SearchForm";

const Home = (props) => {
  return (
    <div className="home">
      <SearchForm {...props} /> 
      <Peliculas {...props} /> 
    </div>
  );
}

export default Home;

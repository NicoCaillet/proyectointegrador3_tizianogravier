import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos";
import SearchResults from "./pages/SearchResults"; 
import Detalle from "./pages/Detalle";
import NotFound from "./pages/NotFound"; 
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"; 
import MasPopulares from "./pages/MasPopulares";
import VerMas from "./pages/VerMas";



function App() {
  return (
    <>
    <Router>
    <Header /> 
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/favorites" component={Favoritos} /> 
    <Route path="/detalle/id/:id" component={Detalle} /> 
    <Route path="/search" component={SearchResults} /> 
    <Route path="/more/category/:category" component={VerMas} />
    <Route path="/vermas/category/popular" component={MasPopulares} />
    <Route component={NotFound} /> 

    </Switch>
    <Footer />
    </Router>
    </>
  );
}

export default App;

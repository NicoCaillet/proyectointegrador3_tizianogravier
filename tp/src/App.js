import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos";
import SearchResults from "./pages/SearchResults"; 
import Detalle from "./pages/Detalle";
import NotFound from "./pages/NotFound"; 



function App() {
  return (
    <>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/favorites" component={Favoritos} /> {/* Ruta para favoritos */}
    <Route path="/detalle/id/:id" component={Detalle} /> {/* Ruta para detalle de película */}
    <Route path="/search" component={SearchResults} /> {/* Ruta para resultados de búsqueda */}
    
    
    <Route component={NotFound} /> 

    </Switch>
    
    </>
  );
}

export default App;

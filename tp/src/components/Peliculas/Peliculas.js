// Peliculas.js
import React, { Component } from "react";
import PeliculaCard from "../PeliculaCard/PeliculaCard";
import { Link } from "react-router-dom"; // Importar Link para la navegación
import "./Peliculas.css";

class Peliculas extends Component {
  constructor() {
    super();
    this.state = {
      populares: [],
      nowPlaying: [], 
      favoritos: [],
      paginaActualPopulares: 1, // Estado para manejar la página actual de populares
      paginaActualCartelera: 1, // Estado para manejar la página actual de cartelera
    };
  }

  componentDidMount() {
    this.fetchPeliculas(); // Cargar las primeras películas populares
    this.fetchCartelera(); // Cargar las primeras películas en cartelera
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    this.setState({ favoritos });
  }

  // Función para cargar películas populares
  fetchPeliculas = () => {
    const { paginaActualPopulares } = this.state;

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0331cddd490fdf784d51f00d86f1b001&page=${paginaActualPopulares}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          populares: [...prevState.populares, ...data.results], 
          paginaActualPopulares: prevState.paginaActualPopulares + 1
        }));
      })
      .catch((error) => {
        console.error( error);
      });
  };

  // Función para cargar películas en cartelera
  fetchCartelera = () => {
    const { paginaActualCartelera } = this.state;

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=0331cddd490fdf784d51f00d86f1b001&page=${paginaActualCartelera}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          nowPlaying: [...prevState.nowPlaying, ...data.results],
          paginaActualCartelera: prevState.paginaActualCartelera + 1
        }));
      })
      .catch((error) => {
        console.error("Error al cargar más películas de cartelera:", error);
      });
  };

  agregarFav = (id) => {
    let { favoritos } = this.state;
    if (favoritos.includes(id)) {
      favoritos = favoritos.filter((favoritoId) => favoritoId !== id);
    } else {
      favoritos.push(id);
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    this.setState({ favoritos });
  };

  esFavorito = (id) => {
    return this.state.favoritos.includes(id);
  };

  render() {
    const { populares, nowPlaying } = this.state;

    return (
      <div className="peliculas">
        {/* Sección de Películas Populares */}
        <section>
          <h2> POPULARES </h2>
          <div className="contenedor-peliculas">
            {populares.length > 0 ? (
              populares
                .slice(0, 6) // Mostrar solo las primeras 8 películas
                .map((movie) => (
                  <PeliculaCard
                    key={movie.id}
                    pelicula={movie}
                    esFavorito={this.esFavorito}
                    agregarFav={this.agregarFav}
                  />
                ))
            ) : (
              <p>Cargando...</p>
            )}
          </div>
          {/* Botón para ver más populares */}
          <div className="ver-mas-container">
            <Link to="/more/category/popular" className="btn-ver-mas">
              Ver más Populares
            </Link>
          </div>
        </section>

        {/* Sección de Películas en Cartelera */}
        <section>
          <h2> CARTELERA </h2>
          <div className="contenedor-peliculas">
            {nowPlaying.length > 0 ? (
              nowPlaying
                .slice(0, 6) // Mostrar solo las primeras 8 películas
                .map((movie) => (
                  <PeliculaCard
                    key={movie.id}
                    pelicula={movie}
                    esFavorito={this.esFavorito}
                    agregarFav={this.agregarFav}
                  />
                ))
            ) : (
              <p>Cargando...</p>
            )}
          </div>
          {/* Botón para ver más películas en cartelera */}
          <div className="ver-mas-container">
            <Link to="/more/category/now_playing" className="btn-ver-mas">
              Ver más Cartelera
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default Peliculas;

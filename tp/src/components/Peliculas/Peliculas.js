import React, { Component } from "react";
import PeliculaCard from "../PeliculaCard/PeliculaCard";
import { Link } from "react-router-dom";
import "./Peliculas.css";

class Peliculas extends Component {
  constructor() {
    super();
    this.state = {
      populares: [],
      nowPlaying: [],
      favoritos: [],
      paginaActualPopulares: 1,
      paginaActualCartelera: 1,
    };
  }

  componentDidMount() {
    this.fetchPeliculas();
    this.fetchCartelera();
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    this.setState({ favoritos });
  }

  fetchPeliculas = () => {
    const { paginaActualPopulares } = this.state;

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=c7afdc079b8b11e78d950199ac3a221e&page=${paginaActualPopulares}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          populares: [...prevState.populares, ...data.results],
          paginaActualPopulares: prevState.paginaActualPopulares + 1,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  fetchCartelera = () => {
    const { paginaActualCartelera } = this.state;

    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=c7afdc079b8b11e78d950199ac3a221e&page=${paginaActualCartelera}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          nowPlaying: [...prevState.nowPlaying, ...data.results],
          paginaActualCartelera: prevState.paginaActualCartelera + 1,
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
        <section>
          <div className="ver-mas-container">
            <h2> DESTACADAS </h2>
            <Link to="/more/category/popular" className="btn-ver-mas">
              Ver todas las peliculas destacadas
            </Link>
          </div>
          <div className="contenedor-peliculas">
            {populares.length > 0 ? (
              populares
                .slice(0, 6)
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
        </section>

        <section>
          <h2> CARTELERA </h2>
          <div className="ver-mas-container">
            <Link to="/more/category/now_playing" className="btn-ver-mas">
              Ver más Cartelera
            </Link>
          </div>
          <div className="contenedor-peliculas">
            {nowPlaying.length > 0 ? (
              nowPlaying
                .slice(0, 6)
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
          
        </section>
      </div>
    );
  }
}

export default Peliculas;

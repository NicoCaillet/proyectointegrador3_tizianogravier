import React, { Component } from "react";
import PeliculaCard from "../PeliculaCard/PeliculaCard";
import "./VerMas.css";

const enlaces = {
  popular: "https://api.themoviedb.org/3/movie/popular?api_key=0331cddd490fdf784d51f00d86f1b001",
  now_playing: "https://api.themoviedb.org/3/movie/now_playing?api_key=0331cddd490fdf784d51f00d86f1b001"
};

class VerMas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelis: [],
      pelisFiltradas: [],
      ValorFiltrado: "",
      favs: [],
      paginaActual: 1, // Estado para manejar la página actual
      cargando: false // Estado para indicar si está cargando más películas
    };
  }

  componentDidMount() {
    this.cargarPeliculas(); // Llamar a la función que carga películas al montar el componente
    const favs = localStorage.getItem("favoritos") ? JSON.parse(localStorage.getItem("favoritos")) : [];
    this.setState({ favs });
  }

  // Función para cargar las películas, con paginación
  cargarPeliculas = () => {
    const { category } = this.props.match.params;
    const { paginaActual } = this.state;
    const url = `${enlaces[category]}&page=${paginaActual}`;

    this.setState({ cargando: true }); // Activar el estado de cargando

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          pelis: [...prevState.pelis, ...data.results], // Concatenar nuevas películas con las existentes
          pelisFiltradas: [...prevState.pelisFiltradas, ...data.results], // Actualizar las películas filtradas
          paginaActual: prevState.paginaActual + 1, // Incrementar la página
          cargando: false // Desactivar el estado de cargando
        }));
      })
      .catch((e) => {
        console.log(e);
        this.setState({ cargando: false }); // Desactivar cargando en caso de error
      });
  };

  añadirfavorito = (id) => {
    let { favs } = this.state;
    if (favs.includes(id)) {
      favs = favs.filter((favoritoId) => favoritoId !== id);
    } else {
      favs.push(id);
    }
    localStorage.setItem("favoritos", JSON.stringify(favs));
    this.setState({ favs });
  };

  esFavorito = (id) => {
    return this.state.favs.includes(id);
  };

  handleFilterChange = (event) => {
    const ValorFiltrado = event.target.value.toLowerCase();
    this.setState((prevState) => ({
      ValorFiltrado,
      pelisFiltradas: prevState.pelis.filter((peli) =>
        peli.title.toLowerCase().includes(ValorFiltrado)
      )
    }));
  };

  render() {
    const { pelisFiltradas, cargando } = this.state;
    const { category } = this.props.match.params;

    const tituloPag =
      category === "popular" ? "Películas Populares" : category === "now_playing" ? "Películas en cartelera" : "Películas";

    return (
      <div className="paginaPelis">
        <h2>{tituloPag}</h2>
        <div className="contenedor-peliculas">
          {pelisFiltradas.length > 0 ? (
            pelisFiltradas.map((peli) => (
              <PeliculaCard
                key={peli.id}
                pelicula={peli}
                esFavorito={this.esFavorito}
                agregarFav={this.añadirfavorito}
              />
            ))
          ) : (
            <p>No se encontraron películas.</p>
          )}
        </div>

        {/* Botón para cargar más películas */}
        <div className="load-more-container">
          <button onClick={this.cargarPeliculas} disabled={cargando}>
            {cargando ? "Cargando..." : "Cargar Más Películas"}
          </button>
        </div>
      </div>
    );
  }
}

export default VerMas;

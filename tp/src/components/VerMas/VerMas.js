import React, { Component } from "react";
import PeliculaCard from "../PeliculaCard/PeliculaCard";
import "./VerMas.css";

const enlaces = {
  popular: "https://api.themoviedb.org/3/movie/popular?api_key=c7afdc079b8b11e78d950199ac3a221e",
  now_playing: "https://api.themoviedb.org/3/movie/now_playing?api_key=c7afdc079b8b11e78d950199ac3a221e"
};

class VerMas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelis: [],
      pelisFiltradas: [],
      ValorFiltrado: "",
      favs: [],
      paginaActual: 1,
      cargando: false
    };
  }

  componentDidMount() {
    this.cargarPeliculas();
    const favs = localStorage.getItem("favoritos") ? JSON.parse(localStorage.getItem("favoritos")) : [];
    this.setState({ favs });
  }

  cargarPeliculas = () => {
    const { category } = this.props.match.params;
    const { paginaActual } = this.state;
    const url = `${enlaces[category]}&page=${paginaActual}`;

    this.setState({ cargando: true });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          pelis: [...prevState.pelis, ...data.results],
          pelisFiltradas: [...prevState.pelisFiltradas, ...data.results],
          paginaActual: prevState.paginaActual + 1,
          cargando: false
        }));
      })
      .catch((e) => {
        console.log(e);
        this.setState({ cargando: false });
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
      category === "popular" ? "Películas destacadas" : category === "now_playing" ? "Películas en cartelera" : "Películas";

    return (
      <div className="paginaPeliculas">
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

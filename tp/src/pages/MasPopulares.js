import React, { Component } from 'react';
import PeliculaCard from '../components/PeliculaCard/PeliculaCard'; 

const api_key = "c7afdc079b8b11e78d950199ac3a221e"; 
const baseURL = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=`;

class MasPopulares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      peliculasFiltradas: [],
      valorFiltrado: "",
      paginaActual: 1,
      loading: true, 
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.fetchMovies();
    }
  }

  fetchMovies = () => {
    this.setState({ loading: true }); 

    fetch(`${baseURL}${this.state.paginaActual}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          peliculas: [...prevState.peliculas, ...data.results], 
          peliculasFiltradas: [...prevState.peliculas, ...data.results],
          paginaActual: prevState.paginaActual + 1,
          loading: false, 
        }));
      })
      .catch((err) => {
        console.error("Error al cargar las películas:", err);
        this.setState({ loading: false }); 
      });
  };

  handleFilter = (e) => {
    const userValue = e.target.value.toLowerCase();
    this.setState({
      valorFiltrado: userValue,
      peliculasFiltradas: this.state.peliculas.filter((pelicula) =>
        pelicula.title.toLowerCase().includes(userValue)
      ),
    });
  };

  handleResetFilter = () => {
    this.setState({
      valorFiltrado: "",
      peliculasFiltradas: this.state.peliculas,
    });
  };

  handleLoadMore = () => {
    this.fetchMovies(); 
  };

  render() {
    return (
      <div className="mas-populares-container">
        <div className="filtro-container">
          <input
            type="text"
            value={this.state.valorFiltrado}
            onChange={this.handleFilter}
            placeholder="Filtrar películas"
            className="filtro-input"
          />
          <button onClick={this.handleResetFilter} className="filtro-boton">
            Eliminar Filtro
          </button>
        </div>
        

        {this.state.loading ? (
          <p> cargando...</p>
        ) : (
          <>

            <div className="contenedor-peliculas">
              {this.state.peliculasFiltradas.length > 0 ? (
                this.state.peliculasFiltradas.map((pelicula) => (
                  <PeliculaCard
                    key={pelicula.id}
                    pelicula={pelicula}
                    esFavorito={() => false} 
                    agregarFav={() => {}} 
                  />
                ))
              ) : (
                <p>No se encontraron películas.</p>
              )}
            </div>
            <button onClick={this.handleLoadMore} className="cargar-mas-boton">
              Cargar Más
            </button>
          </>
        )}
      </div>
    );
  }
}

export default MasPopulares;

import React, { Component } from 'react';
import PeliculaCard from '../components/PeliculaCard/PeliculaCard'; 
import Loader from '../components/Loader/Loader'; 

const api_key = "0331cddd490fdf784d51f00d86f1b001"; // Tu API key
const baseURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=`;

class MasCartelera extends Component {
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
        console.log("Error al cargar las películas:", err);
        this.setState({ loading: false }); 
      });
  };

  handleFilter = (e) => {
    const userValue = e.target.value;
    this.setState({
      valorFiltrado: userValue,
      peliculasFiltradas: this.state.peliculas.filter((pelicula) =>
        pelicula.title.toLowerCase().includes(userValue.toLowerCase())
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
      <>
        <input
          type="text"
          value={this.state.valorFiltrado}
          onChange={this.handleFilter}
          placeholder="Filtrar películas"
        />
        <button onClick={this.handleResetFilter}>Eliminar Filtro</button>
        

        {this.state.loading ? (
          <Loader /> 
        ) : (
          <>
          
            <div className="contenedor-peliculas">
              {this.state.peliculasFiltradas.map((pelicula) => (
                <PeliculaCard
                  key={pelicula.id}
                  pelicula={pelicula}
                  esFavorito={() => false} 
                  agregarFav={() => {}} 
                />
              ))}
            </div>
            <button onClick={this.handleLoadMore}>Cargar Más</button>
          </>
        )}
      </>
    );
  }
}

export default MasCartelera;

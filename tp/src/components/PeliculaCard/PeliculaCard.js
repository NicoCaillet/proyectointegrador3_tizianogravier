import React, { Component } from "react";

class PeliculaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMasId: null,
    };
  }

  mostrarDescrip = () => {
    const { verMasId } = this.state;
    const { pelicula } = this.props;
    this.setState({
      verMasId: verMasId === pelicula.id ? null : pelicula.id,
    });
  };

  render() {
    const { pelicula, esFavorito, agregarFav } = this.props;
    const { verMasId } = this.state;

    return (
      <article className="pelicula">
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
        />
        <h3>{pelicula.title}</h3>

        {esFavorito(pelicula.id) ? (
          <button onClick={() => agregarFav(pelicula.id)}>Eliminar de favoritos</button>
        ) : (
          <button onClick={() => agregarFav(pelicula.id)}>Sumar a favoritos</button>
        )}
        <a className="boton_detalle" href={`/detalle/id/${pelicula.id}`}>Mas informacion</a>
        <button onClick={this.mostrarDescrip}>
          {verMasId === pelicula.id ? "Ocultar descripción" : "Ver descripción"}
        </button>

        {verMasId === pelicula.id && <p>{pelicula.overview}</p>}
      </article>
    );
  }
}

export default PeliculaCard;
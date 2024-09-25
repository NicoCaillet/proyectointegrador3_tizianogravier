import React, {Component} from "react"
import "./PeliculaDetalle.css"

class PeliculaDetalle extends Component {
    constructor(props){
        super(props);
        this.state = {
            movie: null,
            loading: true,
            esFavorito: false
        }
    }
    componentDidMount(){
        this.infoPeli()
    }
    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id){
            this.infoPeli()
        }
    }
    infoPeli = ()=> {
        const id = this.props.id;
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0331cddd490fdf784d51f00d86f1b001`)
        .then(response => response.json())
            .then(data => {
                this.setState({ movie: data, loading: false }, () => {
                    this.favChequear(data.id);
                });
            })
            .catch(e => console.log(e));
    }

    favChequear = (id) => {
        const favoritos = localStorage.getItem("favoritos")
        ? JSON.parse(localStorage.getItem("favoritos")) : [];
        this.setState({ esFavorito: favoritos.includes(id)})
    }

    favAgregar = () => {
        const { movie, esFavorito } = this.state;
        const id = movie.id;
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        if (esFavorito) {
           
            favoritos = favoritos.filter(favId => favId !== id);   
        } else {
           
            if (!favoritos.includes(id)) {
                favoritos.push(id);
            }
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        this.setState({ esFavorito: !esFavorito });
    }

    render(){
        const {movie, loading, esFavorito} = this.state;

        if(loading){
            return <p>Cargando...</p>
        }
        if(!movie){
            return <p>No se pudo cargar el detalle de la pelicula</p>
        }
    return(
        <section className="card-container">
            <div className="movie-card">
                <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                />
                <h4>{movie.title}</h4>
                    <p><strong>Duración:</strong> {movie.runtime} minutos</p>
                    <p><strong>Calificación:</strong> {movie.vote_average}</p>
                    <p><strong>Género:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
                    <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
                    <p>{movie.overview}</p>
                    <button onClick={this.favAgregar}>
                        {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                    </button>
                    <a href="/">Volver al inicio</a>
                </div>
            </section>
                
    )
    }
}
export default PeliculaDetalle
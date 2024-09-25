import React from "react";
import PeliculaDetalle from "../components/PeliculaDetalle/PeliculaDetalle";

const Detalle = ({match}) => {
    const id = match.params.id;

    return(
        <section>
            <article>
                <div>
                    <PeliculaDetalle id={id} />
                </div>
            </article>
        </section>
    )
}
export default Detalle
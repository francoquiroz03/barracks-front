import React from "react";
import {Link} from "react-router-dom";

const Card = ({ movie }) => {
    return (
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{movie.title}</div>
                <div className="card-body">
                    <img src={`data:image/png;base64,${movie.photo}`} alt={movie.title} className="mb-3" style={{ maxHeight: "400px", maxWidth: "400px" }}/>
                    <Link className="nav-link" to="#">
                        View {movie.link}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
import React, {useState, useEffect} from "react";
import Menu from "./Menu";
import Card from "./Card";
import {getMovie} from "./apiCore";
import {useHistory} from "react-router-dom";
import Cookies from "universal-cookie";

const User = () => {
    const history = useHistory();
    const cookies = new Cookies();

    const [Movie, setMovie] = useState([]);

    const loadMovie = () => {
        getMovie().then(data => {
            if (data.status === 401) {
                cookies.remove('jwt', {path: '/'});
                history.push("/");
            } else {
                setMovie(data);
            }
        });
    };

    useEffect(() => {
        loadMovie();
    }, []);

    return (
        <div
            title="Dashboard"
            description={`G'day!`}
            className=
            "container-fluid"
        >
            <Menu />
            <div className="row">
                <div className="col-9">
                {Movie.map((movie, i) => (
                    <Card key={i} movie={movie} />
                ))}
                </div>
            </div>
        </div>
    );
};

export default User;
import Navigation from "../modules/nav";
import {Link} from "react-router-dom";

const Juegos = () => {
    return(
        <>
        <Navigation/>
        <div className="game-list">
        <Link to="/juegos/snake">
            <figure>
            <img src="../img/games/snake.jpg"></img>
            <p>Snake</p>
            </figure>
        </Link>
        </div>
        </>
        
    );
}
export default Juegos;
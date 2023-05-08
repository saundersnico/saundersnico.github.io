import style from '../styles/menu.css';
import {Link} from "react-router-dom";
const Navigation = ()=>{
        return(
            <>
            <nav className="menu">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/certs">Certificados</Link></li>
                    <li><Link to="/juegos">Juegos</Link></li>
                </ul>                
            </nav>
            </>
        )
}
export default Navigation;

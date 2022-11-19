import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="headerContainer">
            <img className="headerLogo" src="img/logo.png" alt="unserlogo!" />
            <span className="headerTeamName">Team Fitzels</span>
            <div className="headerNav">
                <Link to="/" className="headerHome">
                    <span>Home</span>
                </Link>
                <Link to="/scoreboard" className="headerHome">
                    <span>Scoreboard</span>
                </Link>
            </div>

            {/* <img className="headerlogo" src="../../images/undraw_mindfulness_scgo.png" /> */}
        </div>
    );
}

export default Header;

import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="headerContainer">
            <img className="headerLogo" src="https://img.icons8.com/officel/80/null/solar-panel.png" alt="logo" />
            <span className="headerTeamName">Team PHAMics</span>
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

import "./MainPage.css";
import { Link } from "react-router-dom";
import FlyingApple from "./flyingIcons/FlyingApple";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function MainPage({ serverId, setServerId }) {
    return (
        <div className="mainPageContainer">
            <div className="flier">
                <FlyingApple />
            </div>
            <Header />
            <div className="mainPageBody">
                <div className="leftBody">
                    <h2 className="leftBodyHeader">Singleplayer</h2>
                    <h5 className="leftBodySubHeader">Try it out, now!</h5>
                    <Link to="/game" className="button">
                        <span>START A GAME</span>
                    </Link>
                </div>
                <div className="rightBody">
                    <h2 className="leftBodyHeader">Multiplayer</h2>
                    <h5 className="leftBodySubHeader">🚧 Coming soon! 🚧</h5>
                    <div className="rightBodyButtons">
                    </div>
                </div>
            </div>
            <Footer />
            <svg
                className="mainPageWabyPicture"
                id="wave"
                viewBox="0 0 1440 330"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                        <stop stop-color="rgba(248.625, 146.386, 113.55, 1)" offset="0%"></stop>
                        <stop stop-color="rgba(255, 179, 11, 1)" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <path
                    className="wavePathVar"
                    fill="url(#sw-gradient-0)"
                    d="M0,165L80,137.5C160,110,320,55,480,55C640,55,800,110,960,154C1120,198,1280,231,1440,214.5C1600,198,1760,132,1920,104.5C2080,77,2240,88,2400,126.5C2560,165,2720,231,2880,247.5C3040,264,3200,231,3360,198C3520,165,3680,132,3840,137.5C4000,143,4160,187,4320,187C4480,187,4640,143,4800,143C4960,143,5120,187,5280,187C5440,187,5600,143,5760,143C5920,143,6080,187,6240,220C6400,253,6560,275,6720,280.5C6880,286,7040,275,7200,247.5C7360,220,7520,176,7680,132C7840,88,8000,44,8160,44C8320,44,8480,88,8640,110C8800,132,8960,132,9120,159.5C9280,187,9440,242,9600,225.5C9760,209,9920,121,10080,71.5C10240,22,10400,11,10560,5.5C10720,0,10880,0,11040,33C11200,66,11360,132,11440,165L11520,198L11520,330L11440,330C11360,330,11200,330,11040,330C10880,330,10720,330,10560,330C10400,330,10240,330,10080,330C9920,330,9760,330,9600,330C9440,330,9280,330,9120,330C8960,330,8800,330,8640,330C8480,330,8320,330,8160,330C8000,330,7840,330,7680,330C7520,330,7360,330,7200,330C7040,330,6880,330,6720,330C6560,330,6400,330,6240,330C6080,330,5920,330,5760,330C5600,330,5440,330,5280,330C5120,330,4960,330,4800,330C4640,330,4480,330,4320,330C4160,330,4000,330,3840,330C3680,330,3520,330,3360,330C3200,330,3040,330,2880,330C2720,330,2560,330,2400,330C2240,330,2080,330,1920,330C1760,330,1600,330,1440,330C1280,330,1120,330,960,330C800,330,640,330,480,330C320,330,160,330,80,330L0,330Z"
                ></path>
            </svg>
        </div>
    );
}

export default MainPage;

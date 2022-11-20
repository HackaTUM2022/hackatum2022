import "./Footer.css";

function MainPage({ serverId, setServerId }) {
    return (
        <div className="footerMainContainer">
            <div className="footerContainer">
                <div>
                    <h2 className="footerSectionHeader">About</h2>
                    <p className="footerSectionText">
                        We created a fun Augmented Reality exercising game that raises awreness about the current energy crisis and the resulting consiquences.
                        The app playfully teaches the user about the importance of renewable energy and how (especially when) to use it.
                    </p>
                </div>
                <div>
                    <h2 className="footerSectionHeader">How to play</h2>
                    <p className="footerSectionText">
                        Make sure that your laptop has a camera that is activated (and of course given permissions to!). Then, click on the "Start Game" button and follow the instructions.
                        The goal is to minimize the energy usage of regular daily activities. The more you use renewable energy, the more points you get and the longer you will survive!
                    </p>
                </div>
                <div>
                    <h2 className="footerSectionHeader">Multiplayer mode</h2>
                    <p className="footerSectionText">
                        🚧 Coming soon! 🚧
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

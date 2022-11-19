import "./Footer.css";

function MainPage({ serverId, setServerId }) {
    return (
        <div className="footerMainContainer">
            <div className="footerContainer">
                <div>
                    <h2 className="footerSectionHeader">About</h2>
                    <p className="footerSectionText">
                        We created a fun AR exercising game, where people can learn more about
                        correct waste sorting while having fun and exercising their bodies, alone,
                        or with their friends.
                    </p>
                </div>
                <div>
                    <h2 className="footerSectionHeader">How to play</h2>
                    <p className="footerSectionText">
                        !!!Make sure that half of your body is seen in the screen when you play
                        (like in our demo video)!!! There will be objects (food waste) falling from
                        the ceiling:
                    </p>
                    <img className="footerImages" src="/places/scr1.png" alt="Game demo" />
                    <p className="footerSectionText">
                        You need to move to the correct section of the screen and squat, so that the
                        object falls into the correct trashcan. If you miss the object or put it
                        into a wrong can, you will loose a life. Be careful, you have only 3 lives!!
                        Don't waste them easily/
                    </p>
                </div>
                <div>
                    <h2 className="footerSectionHeader">Multiplayer mode</h2>
                    <p className="footerSectionText">
                        Currently our app supports only 2 people playing together. To play with your
                        friends, send them your uniqely generated room code from the right section
                        of the screen! As soon as they copy-paste it and start the game, you will be
                        automatically redirected into your own room, where you will be playing
                        against each other. The person with the most scores wins!
                    </p>
                </div>
                <div>
                    <h2 className="footerSectionHeader">Demo</h2>
                    <p className="footerSectionText">https://youtu.be/oqkJfVjx7Sc</p>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

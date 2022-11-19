import React from "react";
import socket, { useMultiplayerId } from "../../GameEngine/multiplayer";
import "./JoinGameForm.scss";
import { useNavigate } from "react-router-dom";

const JoinGameForm = (props: { serverId: string; setServerId: Function }) => {
    const multiplayerId = useMultiplayerId();
    const navigate = useNavigate();
    const handleChange = (event: any) => {
        props.setServerId(event.target.value);
    };
    const handleButtonClick = (event: any) => {
        console.log("joining room", props.serverId, multiplayerId);
        socket.emit("join room", props.serverId, multiplayerId, () => {
            navigate("/multiplayer");
        });
    };
    return (
        <div className="JoinGameForm__container">
            <input
                type="text"
                placeholder="JOIN CODE"
                value={props.serverId}
                onChange={handleChange}
            />
            <button className="button" disabled={!props.serverId} onClick={handleButtonClick}>
                <span>JOIN A GAME</span>
            </button>
        </div>
    );
};

export default JoinGameForm;

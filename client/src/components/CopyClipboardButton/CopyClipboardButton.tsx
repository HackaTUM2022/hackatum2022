import { useMultiplayerId } from "../../GameEngine/multiplayer";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clipboardIcon from "./icons8-kopieren-24.png";

import "./CopyClipboardButton.scss";

const CopyClipboardButton = () => {
    const gameRoomId = useMultiplayerId();

    const [copied, setCopied] = useState(false);

    return (
        <div className="CopyClipboardButon__container">
            {gameRoomId ? (
                <CopyToClipboard text={gameRoomId} onCopy={() => setCopied(true)}>
                    <button className="CopyClipboardButon__button">
                        <span>{gameRoomId}</span>
                        <img src={clipboardIcon} alt="copy" />
                    </button>
                </CopyToClipboard>
            ) : (
                <span>connecting to server...</span>
            )}
            {copied && <span>Copied!</span>}
        </div>
    );
};

export default CopyClipboardButton;

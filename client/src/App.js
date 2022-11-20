import "./App.scss";

import MainPage from "./MainPage/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameEngineComponent } from "./GameEngine/GameEngineComponent";
import { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard/Scoreboard";

function App({onHandsfreeLoaded}) {
    const [handsfreeLoaded, setHandsfreeLoaded] = useState(false);
    useEffect(() => {
      
        onHandsfreeLoaded.subscribe(() => {
            setHandsfreeLoaded(true);
        });
    
      return () => {
        onHandsfreeLoaded.complete();
      }
    }, [])
    
    return (
        // <GameEngineComponent key={handsfreeLoaded} handsfreeLoaded={handsfreeLoaded}/>
        <Router>
            <Routes>
                <Route exact path="/" element={<GameEngineComponent key={handsfreeLoaded} handsfreeLoaded={handsfreeLoaded}/>} />
                <Route exact path="/scoreboard" element={<Scoreboard />} />
            </Routes>
        </Router>
    );
}

export default App;

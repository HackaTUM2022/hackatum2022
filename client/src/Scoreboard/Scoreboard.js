import Header from "../components/Header/Header";
import { getDataFromDatabase } from "./serverapi";
import Table from "./Table";
import { useEffect, useState } from "react";
import "./Scoreboard.css";

const mock_data = [
    { USERNAME: "Philipp", SCORE: 420 },
    { USERNAME: "Maria", SCORE: 69 },
    { USERNAME: "Almo", SCORE: 42 },
    { USERNAME: "Hamudi", SCORE: 3 },
];

function Scoreboard() {
    const [scoreData, setScoreData] = useState(mock_data);

    useEffect(() => {
        (async () => {
            const fetchedData = await getDataFromDatabase();
            console.log("fetchedData", fetchedData);
            if (!!fetchedData) setScoreData(fetchedData);
        })();
    }, []);

    console.log("scoreData", scoreData);

    return (
        <div>
            {!!scoreData ? (
                <div className="scoreBoardContainer">
                    <Header />
                    <div className="trophyImageContainer">
                        <img className="trophyImage" alt="Trophy" src="/places/trophy.png"></img>
                    </div>
                    <Table data={scoreData} />
                </div>
            ) : (
                <div>
                    <Header />
                    <div className="cantConnectToDataBase">
                        <p>Couldn't connect to database.</p>
                    </div>
                </div>
            )}
            <svg
                className="fancyScoreboardShape"
                viewBox="0 0 1440 240"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                        <stop stop-color="rgba(182, 244, 146, 1)" offset="0%"></stop>
                        <stop stop-color="rgba(51, 139, 147, 1)" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <path
                    className="wavePath"
                    fill="url(#sw-gradient-0)"
                    d="M0,0L21.8,0C43.6,0,87,0,131,20C174.5,40,218,80,262,104C305.5,128,349,136,393,128C436.4,120,480,96,524,108C567.3,120,611,168,655,168C698.2,168,742,120,785,96C829.1,72,873,72,916,76C960,80,1004,88,1047,76C1090.9,64,1135,32,1178,52C1221.8,72,1265,144,1309,172C1352.7,200,1396,184,1440,148C1483.6,112,1527,56,1571,36C1614.5,16,1658,32,1702,32C1745.5,32,1789,16,1833,44C1876.4,72,1920,144,1964,152C2007.3,160,2051,104,2095,72C2138.2,40,2182,32,2225,60C2269.1,88,2313,152,2356,152C2400,152,2444,88,2487,72C2530.9,56,2575,88,2618,116C2661.8,144,2705,168,2749,164C2792.7,160,2836,128,2880,108C2923.6,88,2967,80,3011,76C3054.5,72,3098,72,3120,72L3141.8,72L3141.8,240L3120,240C3098.2,240,3055,240,3011,240C2967.3,240,2924,240,2880,240C2836.4,240,2793,240,2749,240C2705.5,240,2662,240,2618,240C2574.5,240,2531,240,2487,240C2443.6,240,2400,240,2356,240C2312.7,240,2269,240,2225,240C2181.8,240,2138,240,2095,240C2050.9,240,2007,240,1964,240C1920,240,1876,240,1833,240C1789.1,240,1745,240,1702,240C1658.2,240,1615,240,1571,240C1527.3,240,1484,240,1440,240C1396.4,240,1353,240,1309,240C1265.5,240,1222,240,1178,240C1134.5,240,1091,240,1047,240C1003.6,240,960,240,916,240C872.7,240,829,240,785,240C741.8,240,698,240,655,240C610.9,240,567,240,524,240C480,240,436,240,393,240C349.1,240,305,240,262,240C218.2,240,175,240,131,240C87.3,240,44,240,22,240L0,240Z"
                ></path>
            </svg>
        </div>
    );
}

export default Scoreboard;

// const ENDPOINT = "https://sheltered-forest-46021.herokuapp.com/";

export async function getDataFromDatabase() {
    let scoreData = [];
    await fetch("https://api.hackatum.zagar.dev/games", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            scoreData = data.data;
        });

    return scoreData.map((score) => {
        return {
            name: score.username,
            score: score.highscoreDays,
        };
    });
}

export async function sendDataToDatabase(username, score) {
    const url = `https://sheltered-forest-46021.herokuapp.com/update_score?user=${username}&score=${score}`;

    await fetch(url, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}

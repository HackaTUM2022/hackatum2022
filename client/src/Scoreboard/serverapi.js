// const ENDPOINT = "https://sheltered-forest-46021.herokuapp.com/";

export async function getDataFromDatabase() {
    let scoreData = [];
    await fetch("https://sheltered-forest-46021.herokuapp.com/get_scores", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            scoreData = data.data;
        });

    console.log("scoreData", scoreData);
    return scoreData;
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

import axios from "axios";

class ClientNetworking {
    constructor() {
        this.username = "";
        this.dayCounter = 0;
    }

    async startGame(username) {
        try {
            const { data } = await axios.post(
                "http://localhost:8080/games",
                {
                    username: username,
                }
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateGame(gameData) {
        try {
            const { data } = await axios.put(
                `http://localhost:8080/games`,
                gameData
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async getGames() {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/games`,
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async addOrder(order) {
        order['request'] = 'add';
        try {
            const { data } = await axios.post(
                `http://localhost:8080/orders`,
                order
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async deleteOrder(order) {
        order['request'] = 'delete';
        try {
            const { data } = await axios.post(
                `http://localhost:8080/orders`,
                order
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async getOrders() {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/orders`,
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async getMatches() {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/matches`,
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async getNewDay() {
        try {
            this.dayCounter++;
            
            const { data } = await axios.get(
                `http://localhost:8080/newDay?isWeekend=${(this.dayCounter % 6 === 0) || (this.dayCounter % 7 === 0)}`,
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
}



export {
    startGame,
    updateGame,
    getGames,
    addOrder,
    deleteOrder,
    getOrders,
    getMatches,
    getNewDay,
};

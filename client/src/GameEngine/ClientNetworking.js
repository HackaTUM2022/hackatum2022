import axios from "axios";

export class ClientNetworking {
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
                `http://localhost:8080/orders?mockEnergyMarket=true`,
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
    
    async getNewDay(dayCounter) {
        try {           
            const { data } = await axios.get(
                `http://localhost:8080/newDay?isWeekend=${(dayCounter % 6 === 0) || (dayCounter % 7 === 0)}`,
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
}
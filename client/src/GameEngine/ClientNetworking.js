import axios from "axios";

export class ClientNetworking {
    async startGame(username) {
        try {
            const { data } = await axios.post(
                "https://api.hackatum.zagar.dev/games",
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
                `https://api.hackatum.zagar.dev/games`,
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
                `https://api.hackatum.zagar.dev/games`,
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
                `https://api.hackatum.zagar.dev/orders?mockEnergyMarket=true`,
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
                `https://api.hackatum.zagar.dev/orders`,
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
                `https://api.hackatum.zagar.dev/orders`,
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async getMatches() {
        try {
            const { data } = await axios.get(
                `https://api.hackatum.zagar.dev/matches`,
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async getNewDay(dayCounter) {
        try {           
            const { data } = await axios.get(
                `https://api.hackatum.zagar.dev/newDay?isWeekend=${(dayCounter % 6 === 0) || (dayCounter % 7 === 0)}`,
            );
    
            return data;
    
        } catch (error) {
            console.log(error);
        }
    }
}
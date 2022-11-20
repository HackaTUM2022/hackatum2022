import { Display } from "../display";
import { Entity } from "./entity";
import { v4 as uuid } from "uuid";

export class WeatherIcon implements Entity {
    height: number;
    width: number;
    time: number;
    weather: string;
    x = 0;
    y = 0;
    id = uuid();

    static weatherTypes = ["sunny", "cloudy", "rainy"];

    constructor(time: number, weather: string) {
        this.height = 100;
        this.width = 100;
        this.time = time;
        this.weather = weather;
    }

    update(dt: number) {}

    render(display: Display): void {
        if (this.weather === undefined) return;
        const x = display.getXPositionFromTime(this.time);
        const y = 40;

        display.drawImage(
            x - this.width / 2,
            y,
            this.width,
            this.height,
            "weather/" + this.weather + ".png"
        );
    }

    static getImagesToLoad() {
        let paths = [];
        for (let i = 0; i < WeatherIcon.weatherTypes.length; i++) {
            paths.push("weather" + "/" + WeatherIcon.weatherTypes[i] + ".png");
        }

        return paths;
    }
}

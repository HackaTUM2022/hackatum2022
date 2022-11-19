import { Display } from "../display";
import { v4 as uuid } from "uuid";

export interface Entity {
    x: number;
    y: number;
    id: string;

    update(dt: number): void;
    render(display: Display): void;
}

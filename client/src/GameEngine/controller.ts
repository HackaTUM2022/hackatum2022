import { ControllerInput } from "./controller-input";

export class Controller {
    public up = new ControllerInput();
    public left = new ControllerInput();
    public right = new ControllerInput();
    public down = new ControllerInput();
    public space = new ControllerInput();

    public enter = new ControllerInput();
}

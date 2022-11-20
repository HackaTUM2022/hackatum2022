import { ImageLoader } from "./imageloader";
import { Task } from "./Entities/task";
import { WeatherIcon } from "./Entities/weatherIcon";

export class Display {
    buffer: CanvasRenderingContext2D;
    context: CanvasRenderingContext2D;

    private cameraCanvas: CanvasImageSource;
    private cameraCanvasContext: CanvasRenderingContext2D;

    private camDebugCanvas: CanvasImageSource;
    private camDebugCanvasContext: CanvasRenderingContext2D;

    public cameraCanvasWidth: number;
    public cameraCanvasHeight: number;

    private imageLoader: ImageLoader;

    constructor(canvas: any) {
        this.buffer = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
        this.context = canvas.getContext("2d");
        this.context.setTransform(1, 0, 0, -1, 0, this.context.canvas.height);

        this.cameraCanvas = document.querySelector(
            ".handsfree-canvas-video"
        ) as unknown as CanvasImageSource;
        // @ts-ignore
        this.cameraCanvasContext = this.cameraCanvas.getContext("2d");

        this.camDebugCanvas = document.querySelector(
            ".handsfree-hide-when-started-without-pose"
        ) as unknown as CanvasImageSource;
        // @ts-ignore
        this.camDebugCanvasContext = this.camDebugCanvas.getContext("2d");

        let toLoad = Task.getImagesToLoad();
        toLoad = [...toLoad, ...WeatherIcon.getImagesToLoad()];
        toLoad.push("gras.png");
        toLoad.push("moon.png");
        this.imageLoader = new ImageLoader(toLoad);

        this.cameraCanvasWidth = this.camDebugCanvas.width as number;
        this.cameraCanvasHeight = this.camDebugCanvas.height as number;
    }

    fill(color: string) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    clear() {
        // this.buffer.clearRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
        this.fill("#000000");

        this.buffer.setTransform(-1, 0, 0, 1, this.context.canvas.width, 0);
        this.buffer.drawImage(this.cameraCanvas, 0, 0);
        // this.buffer.drawImage(this.camDebugCanvas, 0, 0);
        this.buffer.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
        alpha: number = 1,
        strokeStyle?: string
    ) {
        this.buffer.fillStyle = color;
        this.buffer.globalAlpha = alpha;
        const prevStrokeStyle = this.buffer.strokeStyle;
        if (strokeStyle !== undefined) {
            this.buffer.strokeStyle = strokeStyle;
            this.buffer.lineWidth = 10;
            this.buffer.strokeRect(x, y, width, height);
        }

        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);

        this.buffer.globalAlpha = 1;
        this.buffer.strokeStyle = prevStrokeStyle;
    }

    drawCircle(x: number, y: number, radius: number, color: string) {
        this.buffer.beginPath();
        this.buffer.arc(x + radius, y + radius, radius, 0, 2 * Math.PI, false);
        this.buffer.fillStyle = color;
        this.buffer.fill();
        this.buffer.stroke();
    }

    drawSmoothCurve(points: any, color: string) {
        this.buffer.beginPath();
        this.buffer.strokeStyle = color;
        this.buffer.lineWidth = 7;
        this.buffer.moveTo(points[0].x, points[0].y);
        let i = 1;

        for (i = 1; i < points.length - 2; i++) {
            let xc = (points[i].x + points[i + 1].x) / 2;
            let yc = (points[i].y + points[i + 1].y) / 2;
            this.buffer.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        this.buffer.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        this.buffer.stroke();
    }

    drawImage(
        x: number,
        y: number,
        width: number,
        height: number,
        name: string,
        angle: number = 0,
        shadowColor?: string
    ) {
        if (this.imageLoader.isLoaded) {
            this.buffer.rotate(angle);
            const prevShadowColor = this.buffer.shadowColor;
            if (shadowColor !== undefined) {
                this.buffer.shadowColor = shadowColor;
                this.buffer.shadowBlur = 30;
            }

            this.buffer.drawImage(
                this.imageLoader.getImage(name),
                Math.floor(x),
                Math.floor(y),
                width,
                height
            );
            this.buffer.shadowColor = prevShadowColor;

            this.buffer.rotate(-angle);
        } else {
            // this.drawRectangle(x, y, width, height, "red");
        }
    }

    drawText(x: number, y: number, text: string, font: string, color: string, center: boolean) {
        this.buffer.font = font;
        this.buffer.fillStyle = color;
        this.buffer.textAlign = center ? "center" : "left";
        this.buffer.fillText(text, x, y);
    }

    drawLine(xStart: number, yStart: number, xEnd: number, yEnd: number, color: string) {
        this.buffer.beginPath();
        this.buffer.strokeStyle = color;
        this.buffer.lineWidth = 20;
        this.buffer.moveTo(xStart, yStart);
        this.buffer.lineTo(xEnd, yEnd);
        this.buffer.stroke();
    }

    relXToAbs(relX: number) {
        return relX * (this.cameraCanvas.width as number);
    }
    relYToAbs(relY: number) {
        return relY * (this.cameraCanvas.height as number);
    }

    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0);
    }

    resize(width: number, height: number) {
        this.context.canvas.width = Math.floor(width);
        this.context.canvas.height = Math.floor(height);

        this.buffer.canvas.width = Math.floor(width);
        this.buffer.canvas.height = Math.floor(height);

        /// --- Resizing of camera canvas --- ///

        let cameraWidth = this.cameraCanvasContext.canvas.width;
        let cameraHeight = this.cameraCanvasContext.canvas.height;
        let cameraRatio = cameraHeight / cameraWidth;

        let newCameraWidth = Math.floor(width);
        let newCameraHeight = Math.floor(width * cameraRatio);

        this.cameraCanvasContext.canvas.width = newCameraWidth;
        this.cameraCanvasContext.canvas.height = newCameraHeight;

        this.camDebugCanvasContext.canvas.width = newCameraWidth;
        this.camDebugCanvasContext.canvas.height = newCameraHeight;

        this.cameraCanvasWidth = newCameraWidth;
        this.cameraCanvasHeight = newCameraHeight;

        this.context.imageSmoothingEnabled = false;
    }

    getDrawableHeight(): number {
        return Math.min(this.context.canvas.height, this.cameraCanvasHeight);
    }
    getDrawableWidth(): number {
        return Math.min(this.context.canvas.width, this.cameraCanvasWidth);
    }

    // Converts from time in hours (0 - 24 hours) to x Position on Canvas
    getXPositionFromTime(time: number): number {
        return (this.getDrawableWidth() * time) / 24;
    }
}

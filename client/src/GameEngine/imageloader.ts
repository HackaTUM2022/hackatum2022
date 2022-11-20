export class ImageLoader {
    private total: number = 0;
    private images = new Map<string, any>();
    public isLoaded: boolean = false;

    constructor(paths: string[]) {
        for (let pth of paths) {
            let img = new Image();
            let url = process.env.PUBLIC_URL + "/img/" + pth;
            this.images.set(pth, img);
            img.onload = () => {
                this.total++;
                if (this.total === this.images.size) {
                    this.isLoaded = true;
                }
            };
            img.src = url;
        }
    }

    getImage(name: string) {
        if (!this.images.has(name)) {
            throw new Error("image " + name + " not loaded!");
        }

        return this.images.get(name);
    }
}

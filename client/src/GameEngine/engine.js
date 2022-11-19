export class Engine {
    constructor(time_step, render, update, onStart) {
        this.animation_frame_request = undefined;
        this.time = 0;
        this.time_step = time_step; //1000 / 30 = 30 fps
        this.accumulated_time = time_step;

        this.updated = false;

        this.render = render;
        this.update = update;

        this.startRun = (time_stamp) => {
            if(onStart !== undefined)
                onStart(time_stamp);
            this.run(time_stamp);
        };
    }

    start() {
        this.animation_frame_request = window.requestAnimationFrame(this.startRun);
    }

    stop() {
        window.cancelAnimationFrame(this.animation_frame_request);
        this.animation_frame_request = undefined;
    }

    run(time_stamp) {
        //One cycle of the game loop
        this.accumulated_time += time_stamp - this.time;
        this.time = time_stamp;

        /* In case the device is too slow : we never allow 3
           frames to pass without an update */
        if (this.accumulated_time >= this.time_step * 3) {
            this.accumulated_time = this.time_step;
        }

        while (this.accumulated_time >= this.time_step) {
            this.accumulated_time -= this.time_step;

            this.update(time_stamp);
            this.updated = true;
        }

        if (this.updated) {
            this.updated = false;
            this.render(time_stamp);
        }

        this.animation_frame_request = window.requestAnimationFrame((start_time) => this.run(start_time));
    }

    isRunning() {
        return Boolean(this.animation_frame_request !== undefined);
    }
}

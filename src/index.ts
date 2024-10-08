import { getNextDate } from "@/time.ts";
import { wait } from "@/wait.ts";

export type TCronOptions = {
    job: () => void | Promise<void>;
    time: string;
}

export class Cron {
    options: TCronOptions;
    nextDate = new Date();
    running = true;

    constructor(options: TCronOptions) {
        this.options = options;
        this.start().catch(console.error);
    }

    private async start() {
        const waitTime = this.getWaitTime();
        await wait(waitTime);
        this.nextDate = new Date(Math.max(Date.now(), this.nextDate.getTime() + 1));
        await this.trigger();
    }

    stop() {
        this.running = false;
    }

    private async trigger() {
        if (!this.running) {
            return;
        }

        this.options.job()?.catch(console.error);
        await this.start();
    }

    private getWaitTime() {
        const nextDate = getNextDate(this.options.time, this.nextDate);
        const nextTime = nextDate.getTime();
        return nextTime - Date.now();
    }
}

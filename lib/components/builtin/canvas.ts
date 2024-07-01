import { ComponentOptions, defaultOptions, EventHandler } from "../base/component.js";
import { SingleComponent } from "../base/singleComponent.js";

export class Canvas extends SingleComponent {

    protected _context: CanvasRenderingContext2D;
    protected _renderLoop: (context: CanvasRenderingContext2D, canvas?: HTMLCanvasElement) => void;

    constructor(
        renderLoop: (context: CanvasRenderingContext2D, canvas?: HTMLCanvasElement) => void,
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super("Your browser does not support canvas", onEvent, options, ...storage);
        this._renderLoop = renderLoop;
        this.className = "canvas";
    }

    _build() {
        let canvas = document.createElement("canvas");
        canvas.className = this.className;
        this._context = canvas.getContext("2d");
        canvas.id = this.id;
        let startLoop = () => {
            window.requestAnimationFrame(startLoop);
            this._renderLoop(this._context, canvas);
        }
        startLoop();
        return canvas;
    }

    get context() { return this._context; }
}
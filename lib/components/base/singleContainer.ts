import { defaultOptions, Component, ComponentOptions, EventHandler } from "./component.js";

export abstract class SingleContainer extends Component {
    protected _child: Component | null;

    constructor(
        child: Component | null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(onEvent, options, ...storage);
        if (child != null) {
            child.parent = this;
            this._child = child;
        }
    }

    get child() {
        return this._child;
    }

    get _nodes() { return [this._child]; }
}
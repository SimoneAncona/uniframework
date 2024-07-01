import { defaultOptions, Component, ComponentOptions, EventHandler } from "./component.js";


export abstract class SingleComponent extends Component {
    constructor(
        innerText: string, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(onEvent, options, ...storage);
        this.innerText = innerText;
    }
}
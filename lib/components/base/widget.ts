import { Component, ComponentOptions, defaultOptions, EventHandler } from "./component.js";

export abstract class Widget extends Component {

    constructor(
        onEvent?: EventHandler, 
        options: ComponentOptions = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(onEvent, options, ...storage);
    }

    abstract build(): Component;

    _build() {
        return this.build()._build();
    }
}
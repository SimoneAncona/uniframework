import { Component, ComponentOptions, defaultOptions, EventHandler } from "../base/component.js";
import { Container } from "../base/container.js";

export class Div extends Container {
    constructor(
        children: Component[] | null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(children, onEvent, options, ...storage);
        this.className = "div";
    }

    _build() {
        let div = document.createElement("div");
        div.className = this.className;
        for (let child of this._children) {
            div.appendChild(child._build());
        }
        div.id = this.id;
        this.applyOptions(div);
        return div;
    }
}
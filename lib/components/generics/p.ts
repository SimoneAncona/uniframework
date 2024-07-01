import { Component, ComponentOptions, defaultOptions, EventHandler } from "../base/component.js";
import { Container } from "../base/container.js";

export class Paragraph extends Container {
    constructor(
        children: Component[] | null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(children, onEvent, options, ...storage);
        this.className = "p";
    }

    _build() {
        let p = document.createElement("p");
        p.className = this.className;
        for (let child of this._children) {
            p.appendChild(child._build());
        }
        p.id = this.id;
        this.applyOptions(p);
        return p;
    }
}
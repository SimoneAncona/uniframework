import { Component, ComponentOptions, defaultOptions, EventHandler } from "../base/component.js";
import { SingleContainer } from "../base/singleContainer.js";

export class Page extends SingleContainer {
    protected _title: string;
    
    constructor(
        title: string,
        child: Component, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(child, onEvent, options, ...storage);
        this.className = "page";
        this._title = title;
    }

    _build() {
        let div = document.createElement("div");
        div.className = this.className;
        div.appendChild(this._child._build());
        div.id = this.id;
        return div;
    }

    get title() { return this._title; }

    set title(title: string) { this._title = title }
}
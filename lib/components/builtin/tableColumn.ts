import { Component, ComponentOptions, defaultOptions, EventHandler } from "../base/component.js";
import { SingleContainer } from "../base/singleContainer.js";

export class TableColumn extends SingleContainer {
    protected _title: string;
    protected _type: "string" | "number" | "boolean" | "other";
    protected _sort: "asc" | "desc" | "none";
    
    constructor(
        title: string,
        child: Component, 
        type: "string" | "number" | "boolean" | "other" = "string",
        sort: "asc" | "desc" | "none" = "none",
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(child, onEvent, options, ...storage);
        this.className = "header";
        this._title = title;
        this._type = type;
        this._sort = sort;
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

    set sort(sort: "asc" | "desc" | "none") { 
        this._sort = sort;
    }
}
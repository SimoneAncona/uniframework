import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";
import { Container } from "../base/container.js";


export class NavBar extends Container {

    private _logo: Component;

    constructor(
        logo: Component, 
        children: Component[] | null = null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(children, onEvent, options, ...storage);
        this._logo = logo;
        this.className = "navbar";
    }

    _build() {
        let nav = document.createElement("div");
        nav.className = this.className;
        nav.appendChild(this._logo._build());
        nav.id = this.id;

        let rightSide = document.createElement("div");
        rightSide.className = "row";
        for (let child of this._children) {
            rightSide.appendChild(child._build());
        }
        nav.appendChild(rightSide);
        this.applyOptions(nav);
        return nav;
    }

    get _nodes() {
        return [this._logo, ...this._children];
    }
}
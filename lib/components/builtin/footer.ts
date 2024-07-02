import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";
import { Container } from "../base/container.js";


export class Footer extends Container {

    constructor(
        children: Component[] | null = null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(children, onEvent, options, ...storage);
        this.className = "footer";
    }

    _build() {
        let footer = document.createElement("div");
        footer.className = this.className;
        footer.id = this.id;

        let content = document.createElement("div");
        content.className = "row";
        for (let child of this._children) {
            content.appendChild(child._build());
        }
        footer.appendChild(content);
        this.applyOptions(footer);
        return footer;
    }
}
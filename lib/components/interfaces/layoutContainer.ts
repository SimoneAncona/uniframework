import { Container } from "../base/container.js";
import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";

export type LayoutOptions = {
    alignItems?: "left" | "center" | "right" | "fit",
    expanded?: boolean
}

export const defaultLayout: LayoutOptions = {
    alignItems: "left",
    expanded: true
}

export abstract class Layout extends Container {
    protected layout: LayoutOptions;


    constructor(
        children: Component[] | null, 
        layoutOptions: LayoutOptions = defaultLayout, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]) {
        super(children, onEvent, options, ...storage);
        this.layout = layoutOptions
    }

    _build() {
        let div = document.createElement("div");
        div.id = this.id;
        div.classList.add("layout", this.className);
        for (let el of this._children) {
            div.appendChild(el._build());
        }
        this.applyOptions(div);
        this.applyLayout(div);
        return div;
    }

    protected applyLayout(el: HTMLElement) {
        if (this.layout === null) return;
        switch (this.layout.alignItems) {
            case "left": el.style.justifyContent = "flex-start"; break;
            case "right": el.style.justifyContent = "flex-end"; break;
            case "center": el.style.justifyContent = "center"; break;
            case "fit": el.style.justifyContent = "space-between"; break;
        }
        if (this.layout.expanded) {
            el.style.height = "100%";
            el.style.width = "100%";
        }
    }
}
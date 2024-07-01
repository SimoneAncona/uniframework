import { fadeOutMultiple } from "../../animations/fade.js";
import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";
import { Container } from "../base/container.js";

export abstract class PanelContainer extends Container {
    constructor(
        children: Component[] | null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(children, onEvent, options, ...storage);
    }

    _build() {
        let hide = document.createElement("div");
        hide.className = "hide";
        hide.style.opacity = "1";
        hide.id = this.id;
        let panel = document.createElement("div");
        panel.classList.add("panel", this.className);
        for (let c of this.children)
            panel.appendChild(c._build());
        hide.appendChild(panel);
        this.applyOptions(hide);
        return hide;
    }

    async remove() {
        let el = this.getMyHTML();
        let panel: HTMLElement = document.querySelector(".panel");
        if (this._options.disableAnimations !== true)
            await fadeOutMultiple(el, panel);
        el.remove();
    }
}
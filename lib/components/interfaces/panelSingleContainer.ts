import { fadeOutMultiple } from "../../animations/fade.js";
import { SingleContainer } from "../base/singleContainer.js";
import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";

export abstract class PanelSingleContainer extends SingleContainer {
    constructor(
        child: Component | null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(child, onEvent, options, ...storage);
    }

    _build() {
        let hide = document.createElement("div");
        hide.className = "hide";
        hide.style.opacity = "1";
        hide.id = this.id;
        let panel = document.createElement("div");
        panel.classList.add("panel", this.className);
        panel.appendChild(this._child._build());
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
import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";
import { PanelSingleContainer } from "../interfaces/panelSingleContainer.js";

export class Panel extends PanelSingleContainer {
    constructor(
        child: Component, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(child, onEvent, options, ...storage);
        this.className = "panel";
    }
}
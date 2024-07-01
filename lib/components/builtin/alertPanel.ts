import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";
import { PanelSingleContainer } from "../interfaces/panelSingleContainer.js";

export class AlertPanel extends PanelSingleContainer {
    constructor(
        child: Component | null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(child, onEvent, options, ...storage);
        this.className = "alert";
    }
}
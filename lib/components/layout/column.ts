import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";
import { defaultLayout, Layout, LayoutOptions } from "../interfaces/layoutContainer.js";

export class Column extends Layout {
    constructor(
        children: Component[] | null, 
        layoutOption: LayoutOptions = defaultLayout, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(children, layoutOption, onEvent, options, ...storage);
        this.className = "column";
    }
}
import { defaultOptions, Component, ComponentOptions, EventHandler } from "./base/component.js";
import { Container } from "./base/container.js";
import { Theme, defaultTheme } from "../colors.js";

export class App extends Container {
    private _theme: Theme;
    constructor(
        children: Component[] | null = null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(children, onEvent, options, ...storage);
        this.assignId();
        this.className = "application";
        this._theme = defaultTheme;
    }

    run() {
        document.body.appendChild(this._build());
    }

    _build() {
        let appDiv = document.createElement("div");
        appDiv.className = this.className;
        for (let child of this._children) {
            appDiv.appendChild(child._build());
        }
        appDiv.id = this.id;
        this._theme.apply();
        this.applyOptions(appDiv);
        return appDiv;
    }

    set theme(theme: Theme) {
        this._theme = theme;
        theme.apply();
    }

    get theme() { return this._theme; }
}
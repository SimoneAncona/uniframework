import { App } from "../app.js";
import { ComponentStorage } from "../../componentStorage.js";
import { fadeOut } from "../../animations/fade.js";

export type ComponentOptions = {
    title?: string,
    disableAnimations?: boolean,
    fontSize?: string
}

export const defaultOptions: ComponentOptions = {
    title: null,
    disableAnimations: false,
    fontSize: null
}

export type EventHandler = 
    ((eventName?: string, eventValue?: string) => void)
    | [string, (eventValue?: string) => void]

export abstract class Component {
    protected innerText: string;
    public parent: Component | null;
    protected className: string;
    protected htmlId: string;
    protected static currentElementId = 0;
    protected static globalIds = new Map<string, Component>();
    public storage: ComponentStorage;
    protected _options: ComponentOptions;
    public _onEvent?: EventHandler

    constructor(
        onEvent?: EventHandler, 
        options: ComponentOptions = defaultOptions, 
        ...storage: [string, any][]
    ) {
        this.assignId();
        this._options = options;
        this._onEvent = onEvent;
        this.storage = new ComponentStorage(this, ...storage);
    }
    
    abstract _build(): HTMLElement;

    get app() {
        let app = this.parent;
        if (app == null) return this as unknown as App;
        while (app.parent != null)
            app = app.parent;
        return app as unknown as App;
    }

    protected assignId() {
        this.htmlId = "_" + Component.currentElementId;
        Component.globalIds.set(this.htmlId, this);
        Component.currentElementId++;
    }

    protected getMe() {
        return Component.globalIds.get(this.htmlId);
    }

    protected getMyHTML() {
        return document.getElementById(this.htmlId);
    }

    _update() {
        let el = this.getMyHTML()
        el.innerText = this.text;
        el.title = this.title;
    }

    get text() { return this.innerText; }

    set text(value: string) { this.innerText = value; this._update(); }

    get title() { return this._options.title; }

    set title(value: string) { this._options.title = value; this._update(); }

    get id() { return this.htmlId; }

    get options() { return this._options; }

    setStyle(propery: string, value: string) {
        this.getMyHTML().style.setProperty(propery, value);
        this._update();
    }

    setAttribute(propery: string, value: string) {
        this.getMyHTML().setAttribute(propery, value);
        this._update();
    }

    async remove() {
        let el = this.getMyHTML();
        if (this._options.disableAnimations !== true)
            await fadeOut(el);
        el.remove();
        Component.globalIds.delete(this.id);
    }

    protected applyOptions(element: HTMLElement) {
        if (this._options === null) return;
        if (this._options.fontSize) element.style.fontSize = this._options.fontSize;
        if (this._options.title) element.title = this._options.title;
    }
}
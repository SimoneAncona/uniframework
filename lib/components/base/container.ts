import { fadeIn } from "../../animations/fade.js";
import { defaultOptions, Component, ComponentOptions, EventHandler } from "./component.js";


export abstract class Container extends Component {
    protected _children: Component[] | null;

    constructor(
        children: Component[] | null, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(onEvent, options, ...storage);
        if (children != null) {
            children.forEach(child => child.parent = this);
            this._children = children;
        }
    }

    async appendChild(child: Component) {
        child.parent = this;
        this._children.push(child);
        let el = child._build();
        if (this._options.disableAnimations !== true) {
            el.style.opacity = "0";
            this.getMyHTML().appendChild(el);
            await fadeIn(el);
            return;
        }
        this.getMyHTML().appendChild(el);
    }

    insertChild(child: Component, index: number = 0) {
        child.parent = this;
        this._children.splice(index, 0, child);
        let el = child._build();
        let myHtml = this.getMyHTML();
        
    }

    protected _htmlInsertBefore(el: HTMLElement, id: string) {

    }

    protected _htmlInsertAfter(el: HTMLElement, id: string) {

    }

    insertBefore(child: Component, beforeOf: Component) {
        for (let i = 0; i < this._children.length - 1; i++) {
            if (this._children[i + 1] === beforeOf) {
                child.parent = this;
                let html = child._build();
                this._children.splice(i, 0, child);
                this._htmlInsertBefore(html, this._children[i + 1].id);
            }
        }
        return false;
    }

    insertAfter(child: Component, afterOf: Component) {
        for (let i = 1; i < this._children.length; i++) {
            if (this._children[i - 1] === afterOf) {
                child.parent = this;
                let html = child._build();
                this._children.splice(i, 0, child);
                this._htmlInsertBefore(html, this._children[i + 1].id);
            }
        }
        return false;
    }

    firstChildOf(t: Function) {
        for (let e of this._children) {
            if (e instanceof t) return e;
        }
        return null;
    }

    lastChildOf(t: Function) {
        let last: Component;
        for (let e of this._children) {
            if (e instanceof t) last = e;
        }
        return last;
    }

    childrenOf(t: Function) {
        return this._children.filter(c => c instanceof t);
    }

    get children() { return this._children; }

    get _nodes() { return this._children; }
}
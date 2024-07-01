import { Component } from "./component.js";

export abstract class VirtualSingleContainer extends Component {
    protected _child: Component;

    constructor(child: Component) {
        super(null);
        child.parent = this;
        this._child = child;
    }

    _build() { return this._child._build(); }

    get child() { return this._child; }

    get _nodes() { return [this._child]; }
}
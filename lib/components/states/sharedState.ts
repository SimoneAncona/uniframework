import { Component } from "../base/component.js";
import { VirtualSingleContainer } from "../base/virtualSingleComponent.js";
import { State } from "./state.js";

export class SharedState extends VirtualSingleContainer {
    constructor(state: State, key: string, child: Component) {
        super(child);
        for (let s of state.__states) {
            child.storage._set("state:" + s.key, s.component);
        }
        for (let s of state.__storages) {
            s._set("state:" + key, child);
        }
        state.__storages.push(child.storage);
        state.__states.push({key: key, component: child});
    }

}
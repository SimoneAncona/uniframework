import { Component } from "../base/component.js";
import { VirtualSingleContainer } from "../base/virtualSingleComponent.js";
import { State } from "./state.js";

export class GetState extends VirtualSingleContainer {
    constructor(state: State, child: Component) {
        super(child);
        if (state.__states.length === 1) {
            child.storage._set("state:default", state.__states[0].component);
        } else {
            state.__storages.push(child.storage);
        }
    }
}
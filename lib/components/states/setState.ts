import { Component } from "../base/component.js";
import { VirtualSingleContainer } from "../base/virtualSingleComponent.js";
import { State } from "./state.js";

export class SetState extends VirtualSingleContainer {
    constructor(state: State, child: Component) {
        super(child);
        if (state.__storages.length !== 0)
            for (let s of state.__storages) 
                s._set("state:default", child);
        else if (state.__states.length === 0)
            state.__states.push({key: "default", component: child});
    }

}
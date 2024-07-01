import { Component } from "../components/base/component.js";
import { Container } from "../components/base/container.js";
import { SingleContainer } from "../components/base/singleContainer.js";
import { SingleComponent } from "../components/base/singleComponent.js";
import { VirtualSingleContainer } from "../components/base/virtualSingleComponent.js";

export class EventEmitter {
    static emit(component: Component, eventName: string, value: string) {
        this.emitToParents(component, eventName, value);
        this.emitToSibilings(component, eventName, value);
        this.emitToChildren(component, eventName, value);
    }

    static emitToParents(component: Component, eventName: string, value: string) {
        if (component.parent !== null)
            component.parent.storage._putEvent(eventName, value);
        this.emitToParents(component.parent, eventName, value);
    }

    static emitToChildren(component: Component, eventName: string, value: string, propagate: boolean = true) {
        if (component instanceof SingleComponent) return;
        if (component instanceof Container || component instanceof SingleContainer || component instanceof VirtualSingleContainer) {
            for (let c of component._nodes) {
                c.storage._putEvent(eventName, value);
                if (propagate) this.emitToChildren(c, eventName, value);
            }
        }
    }

    static emitToSibilings(component: Component, eventName: string, value: string) {
        if (component.parent === null) return;
        this.emitToChildren(component.parent, eventName, value, false);
        component.storage.delete("event:" + eventName);
    }
}
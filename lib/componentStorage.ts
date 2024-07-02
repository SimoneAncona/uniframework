import { Component } from "./components/base/component.js";

export class ComponentStorage {
    private _storage: Map<string, any> = new Map();
    private _component: Component;

    constructor(component: Component, ...storage: [string, any][]) {
        this._component = component;
        if (storage !== null) {
            for (let e of storage) {
                this._storage.set(e[0], e[1]);
            }
        }
    }

    get<T>(id: string) {
        let value = this._storage.get(id);
        return value as T;
    }

    set<T>(id: string, value: T) {
        if (id.includes(":")) throw new Error("Invalid id");
        this._storage.set(id, value);
        try {
            this._component.update();
        } catch (e) {
            console.error("Component not attached to the DOM"); 
            return;
        }
    }

    _set<T>(id: string, value: T) {
        this._storage.set(id, value);
    }

    _putEvent(id: string, value: string) {
        this._storage.set("event:" + id, value);
        if (this._component._onEvent) {
            if (Array.isArray(this._component._onEvent) && this._component._onEvent[0] === id) {
                this._component._onEvent[1](value);
            } else {
                (this._component._onEvent as (a: string, b: string) => void)(id, value);
            }
        }
    }

    delete(id: string) {
        this._storage.delete(id);
    }

    getState(stateName: string = "default") {
        return this._storage.get("state:" + stateName) as Component;
    }

    getEvent(eventName: string) {
        return this._storage.get("event:" + eventName);
    }

    get states() {
        let states: Component[] = [];
        this._storage.forEach((v, k) => {
            if (k.startsWith("state:")) {
                states.push(v);
            }
        })
        return states;
    }

    get events() {
        let events: Component[] = [];
        this._storage.forEach((v, k) => {
            if (k.startsWith("event:")) {
                events.push(v);
            }
        })
        return events;
    }

}
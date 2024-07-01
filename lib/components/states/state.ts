import { ComponentStorage } from "../../componentStorage.js";
import { Component } from "../base/component.js";

export class State {
    public __storages: ComponentStorage[] = [];
    public __states: {key: string, component: Component}[] = [];
}

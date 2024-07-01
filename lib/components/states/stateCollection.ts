import { Component } from "../base/component.js";
import { GetState } from "./getState.js";
import { SetState } from "./setState.js";
import { SharedState } from "./sharedState.js";
import { State } from "./state.js";

export function $setState(state: State, child: Component) { return new SetState(state, child); }
export function $getState(state: State, child: Component) { return new GetState(state, child); }
export function $shared(state: State, key: string, child: Component) { return new SharedState(state, key, child); }
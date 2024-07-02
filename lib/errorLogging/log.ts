import { Component } from "../components/base/component.js";

export function error(issuer: Component, message: string, fatal: boolean) {
    console.error(`from ${issuer.id}:${issuer.constructor.name}, error: ${message}. ${fatal ? `Build stopped` : `Build continued`}`);
    if (fatal) throw new Error("Fatal error");
}
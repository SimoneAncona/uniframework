import { SingleComponent } from "../base/singleComponent.js";
import { defaultOptions, ComponentOptions, EventHandler } from "../base/component.js";

export class Text extends SingleComponent {
    constructor(
        text: string, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(text, onEvent, options, ...storage);
        this.className = "text";
    }

    _build() {
        let text = document.createElement("p");
        text.className = this.className;
        text.id = this.id;
        text.innerText = this.text;
        this.applyOptions(text);
        return text;
    }
}
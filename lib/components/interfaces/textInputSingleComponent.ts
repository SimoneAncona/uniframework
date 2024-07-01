import { SingleComponent } from "../base/singleComponent.js";
import { defaultOptions, ComponentOptions, EventHandler } from "../base/component.js";

export abstract class InputTextSingleComponent extends SingleComponent {
    protected onActive: (me: InputTextSingleComponent, event: FocusEvent) => void;
    protected onInput: (me: InputTextSingleComponent, event: Event) => void;
    protected placeholder: string;

    constructor(
        text: string, 
        placeholder: string, 
        onActive: (me: InputTextSingleComponent, event: FocusEvent) => void, 
        onInput: (me: InputTextSingleComponent, event: Event) => void = () => {}, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(text, onEvent, options, ...storage);
        this.placeholder = placeholder;
        this.onActive = onActive;
        this.onInput = onInput;
    }

    _build() {
        let inputText = document.createElement("input");
        inputText.className = this.className;
        inputText.value = this.innerText;
        inputText.onfocus = (e) => this.onActive(this.getMe() as unknown as InputTextSingleComponent, e);
        inputText.oninput = (e) => this.onInput(this.getMe() as unknown as InputTextSingleComponent, e);
        inputText.type = "text";
        inputText.id = this.htmlId;
        this.applyOptions(inputText);
        return inputText;
    }

    get value() {
        return (this.getMyHTML() as HTMLInputElement).value;
    }
}
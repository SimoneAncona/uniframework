import { defaultOptions, ComponentOptions, EventHandler } from "../base/component.js";
import { InputTextSingleComponent } from "../interfaces/textInputSingleComponent.js";

export class TextArea extends InputTextSingleComponent {
    
    constructor(
        text: string | null, 
        placeholder: string | null, 
        onActive: (me: TextArea, event: FocusEvent) => void = () => {}, 
        onInput: (me: TextArea, event: Event) => void = () => {}, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(text, placeholder, onActive, onInput, onEvent, options, ...storage);
        this.className = "textarea";
    }

    _build() {
        let inputText = document.createElement("textarea");
        inputText.classList.add("inputtext", this.className);
        inputText.value = this.innerText;
        inputText.onfocus = (e) => this.onActive(this.getMe() as unknown as TextArea, e);
        inputText.oninput = (e) => this.onInput(this.getMe() as unknown as TextArea, e);
        inputText.id = this.htmlId;
        this.applyOptions(inputText);
        return inputText;
    }
    
}
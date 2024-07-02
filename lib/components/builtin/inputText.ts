import { defaultOptions, ComponentOptions, EventHandler } from "../base/component.js";
import { InputTextSingleComponent } from "../interfaces/textInputSingleComponent.js";

export class InputText extends InputTextSingleComponent {
    
    constructor(
        text: string | null, 
        placeholder: string | null, 
        onActive: (me: InputText, event: FocusEvent) => void = () => {}, 
        onInput: (me: InputText, event: Event) => void = () => {}, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(text, placeholder, onActive, onInput, onEvent, options, ...storage);
        this.className = "inputtext";
    }

    _build() {
        let inputText = document.createElement("input");
        inputText.className = this.className;
        inputText.value = this.innerText;
        inputText.onfocus = (e) => this.onActive(this.getMe() as unknown as InputText, e);
        inputText.oninput = (e) => this.onInput(this.getMe() as unknown as InputText, e);
        inputText.type = "text";
        inputText.id = this.htmlId;
        this.applyOptions(inputText);
        return inputText;
    }
    
}
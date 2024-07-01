import { defaultOptions, ComponentOptions, EventHandler } from "../base/component.js";
import { InputTextSingleComponent } from "../interfaces/textInputSingleComponent.js";

export class InputText extends InputTextSingleComponent {
    
    constructor(
        text: string | null, 
        placeholder: string | null, 
        onActive: (me: InputTextSingleComponent, event: FocusEvent) => void, 
        onInput: (me: InputTextSingleComponent, event: Event) => void = () => {}, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(text, placeholder, onActive, onInput, onEvent, options, ...storage);
        this.className = "inputtext";
    }
    
}
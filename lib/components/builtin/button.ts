
import { defaultOptions, ComponentOptions, EventHandler } from "../base/component.js";
import { ClickableSingleComponent } from "../interfaces/clickableSingleComponent.js";

export class Button extends ClickableSingleComponent {
    
    constructor(
        text: string, 
        onClick: (me: Button, event: MouseEvent) => void, 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(text, onClick, onEvent, options, ...storage);
        this.className = "button";
    }
    
}
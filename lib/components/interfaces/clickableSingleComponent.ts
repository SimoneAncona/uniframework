import { SingleComponent } from "../base/singleComponent.js";
import { defaultOptions, ComponentOptions, EventHandler } from "../base/component.js";

export abstract class ClickableSingleComponent extends SingleComponent {
    protected onClick: (me: ClickableSingleComponent, event: MouseEvent) => void;

    constructor(
        text: string, 
        onClick: (me: ClickableSingleComponent, event: MouseEvent) => void, 
        onEvent?: EventHandler,
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(text, onEvent, options, ...storage);
        this.onClick = onClick;
    }
    
    _build() {
        let button = document.createElement("input");
        button.className = this.className;
        button.value = this.innerText;
        button.onclick = (e) => this.onClick(this.getMe() as unknown as ClickableSingleComponent, e);
        button.type = "button";
        button.id = this.htmlId;
        this.applyOptions(button);
        return button;
    }

    update() {
        let button = this.getMyHTML() as HTMLInputElement;
        button.value = this.innerText;
    }

    click() {
        this.getMyHTML().click();
    }
}
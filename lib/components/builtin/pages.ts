import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";
import { Container } from "../base/container.js";
import { Row } from "../layout/row.js";
import { State } from "../states/state.js";
import { $shared } from "../states/stateCollection.js";
import { Button } from "./button.js";
import { Page } from "./page.js";


export class Pages extends Container {

    protected _pageSelector: Component;
    protected _currentPage: Page;
    protected _pages: Page[];

    constructor(
        pages: Page[],
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(pages, onEvent, options, ...storage);
        this._pages = pages;
        this.className = "pages";
        let parent = this;
        let shared: State = new State();
        let first = true;
        this._pageSelector = new Row(
            pages.map(page => {
                let el = $shared(shared, page.title, new Button(page.title, (me) => {
                    me.storage.states.forEach(state => state.removeClass("active"));
                    me.addClass("active");
                    parent.switchPage(page);
                }, null, { additionalClassNames: first ? ["active"] : []}))
                first = false;
                return el;
            })
        );
    }

    async switchPage(page: Page) {
        await this._currentPage.remove();
        let nextPage = document.createElement("div");
        nextPage.className = "currentpage";
        nextPage.appendChild(page._build());
        let el = this.getMyHTML();
        el.getElementsByClassName("currentpage")[0].remove();
        el.appendChild(nextPage);
        this._currentPage = page;
    }

    _build() {
        let pages = document.createElement("div");
        pages.className = this.className;
        pages.appendChild(this._pageSelector._build());
        pages.id = this.id;

        if (this._pages.length > 0) {
            this._currentPage = this._pages[0];
            let page = document.createElement("div");
            page.className = "currentpage";
            page.appendChild(this._pages[0]._build());
            pages.appendChild(page);
        }

        return pages;

    }

    get _nodes() {
        return [this._pageSelector, ...this._children];
    }
}
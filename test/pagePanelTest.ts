import { ComponentOptions, defaultOptions, EventHandler } from "../lib/components/base/component.js";
import { Widget } from "../lib/components/base/widget.js";
import { Page } from "../lib/components/builtin/page.js";
import { Pages } from "../lib/components/builtin/pages.js";
import { Panel } from "../lib/components/builtin/panel.js";
import { Text } from "../lib/components/builtin/text.js";

export class MyPagePanel extends Widget {

    constructor(
        onEvent?: EventHandler, 
        options: ComponentOptions = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(onEvent, options, ...storage);
    }

    build() {
        return new Panel(
            new Pages(
                [
                    new Page("title1", new Text("title1")),
                    new Page("title2", new Text("title2")),
                    new Page("title3", new Text("title3")),
                    new Page("title4", new Text("title4")),
                    new Page("title5", new Text("title5")),
                    new Page("title6", new Text("title6")),
                    new Page("title7", new Text("title7")),
                    new Page("title8", new Text("title8")),
                ]
            )
        )
    }
}
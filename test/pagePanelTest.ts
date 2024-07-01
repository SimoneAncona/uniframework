import { Page } from "../lib/components/builtin/page.js";
import { Pages } from "../lib/components/builtin/pages.js";
import { Panel } from "../lib/components/builtin/panel.js";
import { Text } from "../lib/components/builtin/text.js";

export function MyPagePanel() {
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
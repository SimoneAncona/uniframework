import { App } from '../lib/components/app.js';
import { AlertPanel } from '../lib/components/builtin/alertPanel.js';
import { Button } from '../lib/components/builtin/button.js';
import { InputText } from '../lib/components/builtin/inputText.js';
import { NavBar } from '../lib/components/builtin/navBar.js';
import { Text } from '../lib/components/builtin/text.js';
import { Row } from '../lib/components/layout/row.js';
import { Column } from '../lib/components/layout/column.js';
import { State } from '../lib/components/states/state.js';
import { SetState } from '../lib/components/states/setState.js';
import { GetState } from '../lib/components/states/getState.js';
import { Component } from '../lib/components/base/component.js';
import { $getState, $setState, $shared } from '../lib/components/states/stateCollection.js';
import { EventEmitter } from '../lib/events/events.js';
import { MyPagePanel } from './pagePanelTest.js';
import { Canvas } from '../lib/components/builtin/canvas.js';
import { TextArea } from '../lib/components/builtin/textArea.js';
import { Table } from '../lib/components/builtin/table.js';
import { TableColumn } from '../lib/components/builtin/tableColumn.js';
import { Fixed } from '../lib/components/layout/fixed.js';
import { Footer } from '../lib/components/builtin/footer.js';

let alertPanelState: State = new State();
let openButtonState: State = new State();
let sharedState: State = new State();

const table = new Table(
    [
        new TableColumn("title1", new Text("test1")),
        new TableColumn("title2", new Text("test2")),
        new TableColumn("title3", new Text("test3")),
        new TableColumn("title3", new Text("test3")),
        new TableColumn("title3", new Text("test3")),
        new TableColumn("title3", new Text("test3")),
    ],
    [
        [
            new Text("test1"),
            new Text("test1"),
            new Text("test1"),
            new Text("test1"),
            new Text("test1"),
            new Text("test1"),
        ],
        [
            new Text("test2"),
            new Text("test2"),
            new Text("test2"),
            new Text("test2"),
            new Text("test2"),
            new Text("test2"),
            new Text("test2"),
        ],
        [
            new Text("test3"),
            new Text("test3"),
            new Text("test3"),
        ],
    ]
)

const app = new App([
    new NavBar(
        new Text("logo", ["event", (v) => {
            console.log("event captured " + v);
        }]),
        
        [
            new Button("0", (me) => {
                me.text = me.storage.get<number>("value").toString();
                me.storage.set("value", me.storage.get<number>("value") + 1);
            }, null, null, ["value", 1]),
            new Button("100", (me) => {
                me.text = me.storage.get<number>("value").toString();
                me.storage.set("value", me.storage.get<number>("value") - 1);
            }, null, null, ["value", 99]),
            new InputText(null, null, (me) => {
                console.log(me.value)
            }),
            new GetState(openButtonState, 
                new Button("open", (me) => {
                    console.log(me.storage.get("state"))
                    me.app.appendChild(
                        $setState(alertPanelState, 
                            new AlertPanel(
                                new Row(
                                    [
                                        new Column(
                                            [
                                                $getState(alertPanelState,
                                                    new Button("close", (me) => {me.storage.getState().remove()})
                                                ),
                                                
                                            ], 
                                            {alignItems: "center", expanded: true}
                                        )
                                    ], {
                                        alignItems: "center", expanded: true
                                    }
                                )
                            )
                        )
                    )
                }),
            ),
            new SetState(
                openButtonState,
                new Text("ciao")
            )
            
        ]
    ),
    new Button("delete me", (me) => {
        me.remove();
    }),

    $shared(sharedState, "test1", new Button("test1", (me) => { me.text = me.storage.getState("test2").id})),
    $shared(sharedState, "test2", new Button("test2", (me) => { me.text = me.storage.getState("test1").id})),

    new Button("page panel", (me) => {
        me.app.appendChild(new MyPagePanel())
    }),
    new Canvas((ctx, canvas) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(Math.random() * 20, Math.random() * 20);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
    }),
    new TextArea("test", null),
    table,
    new Fixed(
        [
            new Footer([
                new Text("ciao")
            ])
        ]
    )
]);

console.log(sharedState);

app.theme.setDarkTheme();
app.run();


setTimeout(() => app.appendChild(new Button("click me", (me) => {
    me.app.theme.switchColorTheme();
    me.app.title
})), 4000);

setTimeout(() => EventEmitter.emitToChildren(app, "event", "20"), 6000);

console.log(app.childrenOf(NavBar))

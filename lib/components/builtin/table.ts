import { error } from "../../errorLogging/log.js";
import { defaultOptions, Component, ComponentOptions, EventHandler } from "../base/component.js";
import { Container } from "../base/container.js";
import { Row } from "../layout/row.js";
import { TableColumn } from "./tableColumn.js";


export class Table extends Container {

    private _header: TableColumn[] | null;
    private _rows: Component[][] | null;

    constructor(
        header: TableColumn[] | null = null, 
        rows: Component[][] = [], 
        onEvent?: EventHandler, 
        options: ComponentOptions | null = defaultOptions, 
        ...storage: [string, any][]
    ) {
        super(header, onEvent, options, ...storage);
        this._header = header;
        this._rows = rows;
        this.className = "table";
        if (header != null)
            for (let el of header) el.parent = this;
        for (let el of rows.flat()) el.parent = this;
    }

    _build() {
        let table = document.createElement("div");
        table.className = this.className;
        table.id = this.id;

        let size = this._header !== null ? this._header.length :
                    this._rows[0] ? this._rows[0].length : 0;
        
        if (this._header !== null) {
            this._rows.forEach(row => {
                if (row.length != this._header.length)
                    error(this, "Rows must have the same number of children as the header", false);
            })
        }

        for (let i = 0; i < size; i++) {
            let tableColumn = document.createElement("div");
            tableColumn.className = "tablecolumn";
            if (this._header != null) {
                tableColumn.appendChild(this._header[i]._build());
            }
            for (let el of this._rows) {
                if (this._header !== null) {
                    if (el.length != this._header.length)
                        error(this, "Rows must have the same number of children as the header", false);
                    else
                        tableColumn.appendChild(el[i]._build());
                } 
                else
                    tableColumn.appendChild(el[i]._build());
            }
            table.appendChild(tableColumn);
        }

        this.applyOptions(table);
        return table;
    }

    get _nodes() {
        return [...this._header, ...this._rows.flat()];
    }
}
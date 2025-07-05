import { Option } from "./common.js";

export class DialogV1 extends Dialog {
    /**
     * 
     * @param {string} title 
     * @param {string} content 
     * @param {Option[]} options 
     */
    constructor(title, content, options) {
        super(
            {
                title,
                content: content,
                buttons: {
                }
            },
            {
                height: "100%",
                width: "100%",
                id: "item-dialog"
            }
        );
        this.selectionOptions = options;
    }

    activateListeners(html) {
        html.find(".item-button").on(
            "click",
            (event) => {
                this.itemId = event.currentTarget.value;
                this.close();
            }
        );

        html.find(".option-checkbox").on(
            "change",
            (event) => this.selectionOptions[event.currentTarget.id] = event.currentTarget.checked
        );

        super.activateListeners(html);
    }

    async close() {
        await super.close();
        this.result?.(
            {
                itemId: this.itemId,
                options: this.selectionOptions
            }
        );
    }

    async getItemId() {
        this.render(true);
        return new Promise(result => {
            this.result = result;
        });
    }
}

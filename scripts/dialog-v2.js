import { Option } from "./common.js";

export class DialogV2 extends foundry.applications.api.DialogV2 {
    /**
     * 
     * @param {string} title 
     * @param {string} content 
     * @param {Option[]} options 
     */
    constructor(title, content, options) {
        super(
            {
                window: {
                    title
                },
                content: content,
                buttons: [
                    {
                        action: "cancel",
                        label: game.i18n.localize("lib-item-select-dialog.button.cancel")
                    }
                ]
            },
            {
                height: "100%",
                width: "100%",
                id: "item-dialog"
            }
        );
        this.selectionOptions = options;
    }

    _onRender(context, options) {
        this.element.querySelector(`.dialog-content.standard-form`)?.classList.add("item-select-dialog");

        const itemButtons = this.element.querySelectorAll(`[class~="item-button"]`);
        for (const button of itemButtons) {
            button.addEventListener(
                "click",
                (event) => {
                    this.itemId = event.currentTarget.value;
                    this.close();
                }
            );
        }

        const checkboxes = this.element.querySelectorAll(`[class~="option-checkbox"]`);
        for (const checkbox of checkboxes) {
            checkbox.addEventListener(
                "change",
                (event) => this.selectionOptions[event.currentTarget.id] = event.currentTarget.checked
            );
        }

        super._onRender(context, options);
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

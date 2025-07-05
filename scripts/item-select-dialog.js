import { DialogV1 } from "./dialog-v1.js";
import { DialogV2 } from "./dialog-v2.js";
import { Section, Option, Response } from "./common.js";

export * from "./common.js";

/**
 * @template T
 */
export class DialogParameters {
    /** @type string */
    title;

    /** @type string */
    heading;

    /** @type Section<T>[] */
    sections;

    /** @type Option[] */
    options;
}

/**
 * @template T
 * 
 * @param {DialogParameters<T>} params The parameters to display the dialog
 * @returns {Promise<Response<T>} the choice that the user selected
*/
export async function getItem(params) {
    const selectionOptions = {};
    for (const option of params.options ?? []) {
        selectionOptions[option.id] = option.value;
    }

    const Dialog = foundry.utils.isNewerVersion(game.version, "13") ? DialogV2 : DialogV1;

    let result = await new Dialog(params.title, buildContent(params), selectionOptions).getItemId();
    if (!result?.itemId) {
        return null;
    }

    const choice = Array.from(params.sections).flatMap(section => section.choices).find(choice => choice.id === result.itemId);
    if (!choice) {
        return null;
    }

    return new Response(choice, result.options);
}

/**
 * @param {DialogParameters<T>} param0
 * @returns {string}
 */
function buildContent({ heading, sections = [], options = [] }) {
    let content = `
                <p>${heading}</p>
        `;

    for (const section of sections) {
        if (!section.choices.length) {
            continue;
        }

        content += `
            <fieldset class="item-select-dialog">
                <legend>${section.heading}</legend>
        `;

        for (const choice of section.choices) {
            content += `
                <button
                    class="item-select-dialog item-button"
                    type="button"
                    value="${choice.id}"
                >
                    <img class="item-select-dialog" src="${choice.img}"/>
                    <table class="item-select-dialog" style="background-color: #00000000; border: none">
                        <tr>
                            <td class="item-select-dialog name" rowspan="${choice.info.length || 1}">
                                <span>${choice.name}</span>
                            </td>
            `;

            for (let i = 0; i < choice.info.length; i++) {
                if (i > 0) {
                    content += `
                        </tr>
                        <tr>
                    `;
                }
                content += `
                            <td class="item-select-dialog description">
                                <span>${choice.info[i]}</span>
                            </td>
                `;
            }
            content += `
                        </tr>
            `;

            content += `
                    </table>
                </button>
            `;
        }

        content += `
            </fieldset>
        `;
    }

    const selectionOptions = {};
    if (options.length) {
        content += `
            <fieldset class="item-select-dialog">
                <legend>${game.i18n.localize("lib-item-select-dialog.button.cancel")}</legend>
                <form>
        `;

        for (const option of options) {
            content += `
                    <div class="form-group">
                        <input class="option-checkbox" type="checkbox" id="${option.id}" name="${option.id}" ${option.value ? "checked" : ""}>
                        <label for="${option.id}">${option.label}</label>
                    </div>
            `;
        }

        content += `
                </form>
            </fieldset>
        `;
    }

    return content;
}

/**
 * @template T
 */
export class Response {
    /**
     * @type Choice<T>
     * The item that was chosen.
     */
    choice;

    /**
     * @type Object 
     * An object containing the values of the options passed in dialog parameters.
     */
    options;

    constructor(choice, options) {
        return {
            choice,
            options
        };
    }
}

/**
 * @template T
 */
export class Section {
    /** @type string */
    heading;

    /** @type Choice<T>[] */
    choices;

    /**
     * @param {string} heading
     * @param {Choice<T>[]} choices
     */
    constructor(heading, choices = []) {
        return { heading, choices };
    }
}

/**
 * @template T
 */
export class Choice {
    /** @type string */
    id;

    /** @type string */
    name;

    /** @type string[] */
    info;

    /** @type string */
    img;

    /** @type T */
    item;

    /**
     * 
     * @param {string} id 
     * @param {string} name
     * @param {string[]} info
     * @param {string} img 
     * @param {T} item 
     */
    constructor(id, name, info, img, item) {
        this.id = id;
        this.name = name;
        this.info = info ?? [];
        this.img = img;
        this.item = item;
    }
}

export class Option {
    /** @type string **/
    id;

    /** @type string */
    label;

    /** @type boolean */
    value;
}

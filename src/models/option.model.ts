export class OptionGroup {
    id: string;
    options: Option[];

    constructor(id, options) {
        this.id = id;
        this.options = options;
    }
};

export class Option {
    id: string;
    type: 'text' | 'input' | 'dropdown';

    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
}

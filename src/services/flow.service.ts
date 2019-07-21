import {Injectable} from '@angular/core';
import {Option} from '../models/option.model';
import * as options from '../options-tree.json';

@Injectable()

 export class FlowService {
    private options = options['data'];

    constructor() {
    }

    getGroups(parentId) {
        return this.options
            .groups
            .filter(group => group.parent_ids.some(id => id === parentId));
    }

    getOperator(optionsChain) {
        return this.options.operators[optionsChain];
    }

    getCodeByOperator(operator) {
        return this.options.codes[operator];
    }

    getOptionIcon(operator) {
        const option = this.options.options.find(oper => oper.id === operator) as Option;
        return option.icon;
    }
    getOptionType(operator) {
        const option = this.options.options.find(oper => oper.id === operator) as Option;
        return option.type;
    }
}

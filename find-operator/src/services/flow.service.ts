import {Injectable} from '@angular/core';
import { Option, OptionGroup } from '../models/option.model';
import * as options from '../options-tree.json';

@Injectable()

 export class FlowService {
    private options = options['data'];
    
    constructor() {
    }

    getOptions(previousOption) { 
        const group = this.options.groups.filter();
    }

    getGroups(parentId) {
        return this.options.groups.filter(group => group.parent_id === parentId);
    }
}

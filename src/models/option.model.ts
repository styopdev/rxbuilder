export interface OptionGroup {
    id: string;
    options: Option[];
    parent_ids: string[]
};

export interface Option {
    id: string;
    type: 'text' | 'input' | 'dropdown';
};

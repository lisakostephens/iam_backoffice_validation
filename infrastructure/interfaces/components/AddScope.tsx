import { Dispatch, SetStateAction } from "react";

export interface AddScopeProps { 
    index: number;
    onRemoveLabel: Function;
    label?: string;
    name?: string;
    description?: string;
    onUpdateScope: Function;
    repeatedNames: string[];
}

export interface AddScopeContentProps {
    label: string;
    name: string;
    description: string;
    updateLabel: Function;
    updateName: Function;
    updateDescription: Dispatch<SetStateAction<string>>;
    onDeleteScope: Function;
    index: number;
    showNameError: boolean
    showLabelError: boolean;
    isNameRepetead: boolean;
}
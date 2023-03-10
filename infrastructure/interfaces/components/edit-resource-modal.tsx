/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from "react";
import { ResourceData } from "../pages/resources";

export interface EditResourceModalProps { 
    toggleShow: Dispatch<SetStateAction<boolean>>
    resourceData?: ResourceData;
    onCreateResource?: Function;
    onEditResource?: Function;
}

export interface EditResouceModalContentProps {
    toggleShow: Dispatch<SetStateAction<boolean>>;
    existingLabels: Array<number>;
    resourceData: ResourceData;
    onAddLabel: Function;
    onSave: Function;
    isSaveAvailable: boolean;
    onUpdateName: Function;
    onUpdateDescription: Function;
    onRemoveLabel: Function;
    onUpdateScope: Function;
    showNameError: boolean
    repeatedNames: string[];
}
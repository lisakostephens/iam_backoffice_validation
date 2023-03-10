import { Dispatch, SetStateAction } from "react";
import { ServiceAccount } from "../services/services";


export interface EditServiceAccountModalProps {
    serviceAccount?: ServiceAccount;
    toggleShow: Dispatch<SetStateAction<boolean>>;
    onCreate?: Function;
    onEdit?: Function;
}

export interface EditServiceAccountModalContentProps {
    serviceAccount: ServiceAccount;
    onUpdateName: Function;
    onUpdateDisplayName: Function;
    onUpdateDescription: Function;
    onSave: Function;
    toggleShow: Function;
    showNameError: boolean;
}
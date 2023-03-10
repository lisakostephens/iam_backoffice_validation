import { Dispatch, SetStateAction } from "react";
import { ServiceAccount } from "../services/services";

export interface ServiceAccountActionsProps {
    serviceAccount: ServiceAccount;
    onDelete: Function;
}

export interface ServiceAccountActionsContentProps {
    serviceAccount: ServiceAccount;
    onDelete: Function;
    showEditModal: boolean;
    toggleEditModal: Dispatch<SetStateAction<boolean>>;
    showDeleteModal: boolean;
    toggleShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    onDownloadCredentialsJson: Function;
}
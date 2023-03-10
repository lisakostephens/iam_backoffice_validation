/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from "react";
import { ClientData } from "../pages/clients";

export interface ClientCardContentProps {
    clientData: ClientData;
    onDeleteClient: Function;
    toggleShowEditModal: Dispatch<SetStateAction<boolean>>;
    showEditModal: boolean;
    onEditClient: Function;
    showDeleteConfimationModal: boolean;
    toggleShowDeleteConfimationModal: Dispatch<SetStateAction<boolean>>;
}

export interface ClientCardProps { 
    clientData: ClientData, 
    onDeleteClient: Function, 
    onEditClient: Function;
}
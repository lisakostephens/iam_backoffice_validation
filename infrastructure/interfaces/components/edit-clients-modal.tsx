/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from "react";
import { ResourceData } from "../pages/resources";
import { Client } from "../services/clients";

export interface EditClientModalProps { 
    clientID?: number;
    principal?: string | null;
    toggleShow: Dispatch<SetStateAction<boolean>>
    clientResourcesData?: ResourceData[];
    onCreateClient?: Function;
    onEditClient?: Function;
}

export interface EditClientModalContentProps {
    clientID?: number;
    principal: string; 
    updatePrincipal: (email: string) => void; 
    onUpdateResourceAndScope: (index: number, resourceData: ResourceData) => void;
    showPrincipalError: boolean;
    toggleShow: Dispatch<SetStateAction<boolean>>;
    existingLabels: Array<number>;
    onAddLabel: Function;
    onRemoveLabel: Function;
    onSave: Function;
    clientResourcesData?: ResourceData[];
}
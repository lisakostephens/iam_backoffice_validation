/* eslint-disable no-unused-vars */
import { DataTableFilterMeta } from "primereact/datatable";
import { Dispatch, SetStateAction } from "react";
import { Client } from "../services/clients";
import { ResourceData } from "./resources";

export interface ClientsContentProps {
    clientsData: ClientData[] | null;
    onDeleteClient: (clientID: number) => Promise<void>;
    onCreateClient: (client: Client) => void;
    showNewClientModal: boolean;
    toogleShowNewClientModal: Dispatch<SetStateAction<boolean>>;
    onEditClient: Function;
    filters: DataTableFilterMeta;
    setFilters: Dispatch<SetStateAction<DataTableFilterMeta>>
    selectedClientsData: ClientData[];
    updateSelectedClientsData:  Dispatch<SetStateAction<ClientData[]>>
    onDeleteMultiple: Function;
}

export interface ClientData {
    client: Client;
    resourcesData: ResourceData[];
}

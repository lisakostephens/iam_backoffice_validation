import { DataTableFilterMeta } from "primereact/datatable";
import { Dispatch, SetStateAction } from "react";
import { ServiceAccount } from "../services/services";

export interface ServicesProps {
    setFilters: Function;
    serviceAccounts: ServiceAccount[];
    filters: DataTableFilterMeta;
    onDelete: Function;
    onDeleteMultiple: Function;
    toggleShowAddServiceAccountModal: Dispatch<SetStateAction<boolean>>;
    showAddServiceAccountModal: boolean;
    onCreate: Function;
    selectedServiceAccounts: ServiceAccount[];
    updateSelectedServerAccounts: Dispatch<SetStateAction<ServiceAccount[]>>;
    showConfirmDeleteMultiple: boolean;
    toggleShowConfirmDeleteMultiple: Dispatch<SetStateAction<boolean>>;
}
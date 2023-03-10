import { DataTableFilterMeta } from "primereact/datatable";
import { Dispatch, SetStateAction } from "react";
import { ColumnProps } from "../components/datatable";
import { Resource, ResourceScope } from "../services/resources";


export interface ResourceProps {
    resources: Resource[];
    columns: ColumnProps[];
    onDeleteResource: Function;
    showAddModal: boolean
    toggleShowAddServiceAccountModal: Dispatch<SetStateAction<boolean>>;
    filters: DataTableFilterMeta;
    setFilters: Function;
    onCreateResource: Function;
    onEditResource: Function;
    selectedResources: Resource[];
    updateSelectedResources: Dispatch<SetStateAction<Resource[]>>;
    onDeleteMultiple: Function;
    showConfirmDeleteMultiple: boolean;
    toggleShowConfirmDeleteMultiple: Dispatch<SetStateAction<boolean>>;
}

export interface ResourceData {
    resource: Resource;
    scopes: ResourceScope[];
}
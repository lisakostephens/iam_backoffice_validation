import { ResourceData } from "../pages/resources";

export interface TableProps {
    title?: string;
    data: ResourceData[];
    cols: ColumnProps[];
    onOpenNew: any;
    onConfirmDeleteSelected: any;
    onEditItem: any;
    onConfirmDeleteItem: any;
}

export interface ColumnProps {
    field: string;
    header: string;
}
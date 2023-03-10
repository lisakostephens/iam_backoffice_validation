import { Dispatch, SetStateAction } from "react";
import { ResourceData } from "../pages/resources";
import { Resource } from "../services/resources";

export interface ResourceActionsProps {
    resource: Resource;
    onDeleteResource: Function;
    onEditResource: Function;
}

export interface ResourceActionsContentProps {
    resource: Resource;
    onDeleteResource: Function;
    showEditModal: boolean;
    toggleEditModal: Dispatch<SetStateAction<boolean>>;
    resourceData: ResourceData;
    onEditResource: Function;
    onUpdateResourceData: Function;
    showDeleteModal: boolean;
    toggleShowDeleteModal: Function;
}
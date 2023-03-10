import { ResourceData } from "../pages/resources";
import { Resource, ResourceScope } from "../services/resources";

/* eslint-disable no-unused-vars */
export interface ChooseResourceProps { 
    index: number, 
    onDeleteResourceAndScope: Function, 
    onUpdateResourceAndScope: (index: number, resourceData: ResourceData) => void
    selectedResource?: Resource | null;
    selectedScopes?: ResourceScope[] | null;
    choosenResourcesID?: (number | undefined)[];
}

export interface ChooseResourceContentProps {
    toogleShowResources: Function;
    selectedResource: Resource | null;
    showResources: boolean;
    resources: Resource[] | null;
    updateSelectedResource: Function;
    showScopes: boolean;
    selectedScopes: ResourceScope[] | null;
    scopes: ResourceScope[] | null;
    updateSelectedScopes: Function;
    toogleShowScopes: Function;
    onDeleteResourceAndScope: Function;
    index: number;
}
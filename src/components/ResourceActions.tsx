import { useContext, useState } from "react";
import { ToastContext } from "../../infrastructure/context";
import { ResourceActionsProps } from "../../infrastructure/interfaces/components/resource-actions";
import { ResourceData } from "../../infrastructure/interfaces/pages/resources";
import { ResourceService } from "../../infrastructure/services/resources";
import { ResourceActionsContent } from "../../modules/components/resource-actions";

export const ResourceActions = (props: ResourceActionsProps) => {
    const initialResourceData: ResourceData = {
        resource: props.resource,
        scopes: []
    }
    const [resourceData, updateResourceData] = useState(initialResourceData);
    const [showEditModal, toggleEditModal] = useState(false);
    const [showDeleteModal, toggleShowDeleteModal] = useState(false);

    const resourceService = new ResourceService();
    const showToast = useContext(ToastContext);
    
    const onUpdateResourceData = async () => {
        if (props.resource.resource_id == undefined){ 
            return;
        }

        const scopes = await resourceService.getResourceScopes(props.resource.resource_id);

        updateResourceData((prevState) => {
            return {
                ...prevState,
                scopes: scopes,
            }
        });

        toggleEditModal(true);
    }

    const onDeleteResource = async () => {
        if (!props.resource.resource_id) {
            return;
        }

        const isDeleted = await resourceService.delete(props.resource.resource_id);
        if (!isDeleted) {
            return;
        }

        props.onDeleteResource(props.resource.resource_id);
        showToast("success", "Success", "Resource successfully deleted")
    }

    return (
        <ResourceActionsContent 
            resource={resourceData.resource} 
            onDeleteResource={onDeleteResource} 
            showEditModal={showEditModal} 
            toggleEditModal={toggleEditModal} 
            resourceData={resourceData} 
            onEditResource={props.onEditResource} 
            onUpdateResourceData={onUpdateResourceData} 
            showDeleteModal={showDeleteModal} 
            toggleShowDeleteModal={toggleShowDeleteModal}        
        />
    );
}
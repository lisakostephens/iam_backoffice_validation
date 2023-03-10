/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ResourceActionsContentProps } from "../../infrastructure/interfaces/components/resource-actions";
import EditResourceModal from "../../src/components/EditResourceModal";
import { Show } from "../../src/components/Show";

export const ResourceActionsContent = (props: ResourceActionsContentProps) => (
    <div className="actions d-flex flex-row">
        <Button icon="pi pi-pencil" className="p-button-rounded mr-2 small-btn" onClick={() => props.onUpdateResourceData()} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger ms-2 small-btn" onClick={() => props.toggleShowDeleteModal(true)} />

        <Show when={ props.showEditModal }>
            <EditResourceModal
                toggleShow={props.toggleEditModal}
                resourceData={props.resourceData}
                onEditResource={props.onEditResource}
            /> 
        </Show>

        <ConfirmDialog 
            visible={ props.showDeleteModal } 
            onHide={() => props.toggleShowDeleteModal(false)} 
            message={`Are you sure you want to delete the resource ${props.resource.name}?`}
            header="Confirmation" 
            icon="pi pi-exclamation-triangle" 
            accept={() => props.onDeleteResource()} 
            reject={() => props.toggleShowDeleteModal(false)} 
            acceptClassName="p-button p-component p-confirm-dialog-reject p-button-text"
            rejectClassName="p-button p-component p-confirm-dialog-accept"
        />
    </div> 
);


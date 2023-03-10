/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ServiceAccountActionsContentProps } from "../../infrastructure/interfaces/components/service-account-actions";
import { EditServiceAccountModal } from "../../src/components/EditServiceAccount";
import { Show } from "../../src/components/Show";

export const ServiceAccountActionsContent = (props: ServiceAccountActionsContentProps) => (
    <>
        <Button icon="pi pi-download" className="p-button-rounded p-button-secondary ms-2 small-btn" onClick={() => props.onDownloadCredentialsJson()} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger ms-2 small-btn" onClick={() => props.toggleShowDeleteModal(true)} />

        <ConfirmDialog 
            visible={ props.showDeleteModal } 
            onHide={() => props.toggleShowDeleteModal(false)} 
            message={`Are you sure you want to delete the service account ${props.serviceAccount.display_name}?`}
            header="Confirmation" 
            icon="pi pi-exclamation-triangle" 
            accept={() => props.onDelete()} 
            reject={() => props.toggleShowDeleteModal(false)} 
            acceptClassName="p-button p-component p-confirm-dialog-reject p-button-text"
            rejectClassName="p-button p-component p-confirm-dialog-accept"
        />
    </> 
);


/* eslint-disable @next/next/no-img-element */
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ClientCardContentProps } from "../../infrastructure/interfaces/components/client-card";
import EditClientModal from "../../src/components/EditClientModal";
import { Show } from "../../src/components/Show";

export const ClientCardContent = (props: ClientCardContentProps) => (
    <div className="client-card">
        <section className="client-data">
            <small> principal </small>
            <h4 className="principal">{ props.clientData.client.principal }</h4>
            {   
                props.clientData.resourcesData?.map((resourceData) => (
                <Show key={ props.clientData.client.id } when={ resourceData.scopes.length > 0 }>
                    <section className="ms-2" >
                        <h6 className="resource">{ resourceData.resource.description }</h6>
                        <p className="scope">{   resourceData.scopes?.map((scope) => scope.label + " ") }</p>
                    </section>
                </Show>
            ))}
        </section>

        <section className="ms-3 d-flex flex-row">
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => props.toggleShowEditModal(true)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning ms-2" onClick={() => props.toggleShowDeleteConfimationModal(true)} />
        </section>

        <Show when={ props.showEditModal }>
            <EditClientModal
                clientID={ props.clientData.client.id }
                principal={ props.clientData.client.principal }
                toggleShow={ props.toggleShowEditModal } 
                onEditClient={ props.onEditClient } 
                clientResourcesData={ props.clientData.resourcesData }
            /> 
        </Show>

        <ConfirmDialog 
            visible={props.showDeleteConfimationModal} 
            onHide={() => props.toggleShowDeleteConfimationModal(false)} 
            message="Are you sure you want to delete this client?"
            header="Confirmation" 
            icon="pi pi-exclamation-triangle" 
            accept={() => props.onDeleteClient(props.clientData.client.id)} 
            reject={() => props.toggleShowDeleteConfimationModal(false)} 
        />
    </div>
)
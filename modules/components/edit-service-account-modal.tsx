/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { Button } from "primereact/button";
import { EditResouceModalContentProps } from "../../infrastructure/interfaces/components/edit-resource-modal";
import { EditServiceAccountModalContentProps } from "../../infrastructure/interfaces/components/edit-service-account-modal";
import { AddScope } from "../../src/components/AddScope";
import { Modal } from "../../src/components/Modal";
import { Show } from "../../src/components/Show";

export const EditServiceAccountModalContent = (props: EditServiceAccountModalContentProps) => (
    <div className="edit-service-account">
        <Modal title={"Add Service Account"} showCloseButton={ true } onClose={() => props.toggleShow(false)}>
            <div className='d-flex flex-column mb-3'>
                <label className="d-flex flex-column">
                    <span>Name</span>
                </label>
                <input placeholder="purple_tech" type="text" value={ props.serviceAccount.name } onChange={(e) => props.onUpdateName(e.target.value)} />
                <Show when={ props.showNameError }>
                    <small className="error"> Type a valid name </small>
                </Show>

                <label> Display Name </label>
                <input placeholder="Purple Tech" type="text" value={ props.serviceAccount.display_name } onChange={(e) => props.onUpdateDisplayName(e.target.value)} />

                <label> Description </label>
                <input placeholder="Purple Tech access to Indico services" type="text" value={ props.serviceAccount.description } onChange={(e) => props.onUpdateDescription(e.target.value)} />
            </div>
            <Button 
                label="Save" 
                icon="pi pi-check" 
                className="p-button-text" 
                disabled={ 
                    props.serviceAccount.name.length == 0 || 
                    props.showNameError ||
                    props.serviceAccount.display_name.length == 0 ||
                    props.serviceAccount.description.length == 0
                }
                onClick={() => props.onSave()} 
            />
        </Modal>
    </div>
);


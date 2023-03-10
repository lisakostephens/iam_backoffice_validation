/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { Button } from "primereact/button";
import { EditClientModalContentProps } from "../../infrastructure/interfaces/components/edit-clients-modal";
import { ChooseResource } from "../../src/components/ChooseResource";
import { Modal } from "../../src/components/Modal";
import { Show } from "../../src/components/Show";

export const EditClientModalContent = (props: EditClientModalContentProps) => (
    <div className="edit-clients">
        <Modal title={ props.clientID != undefined ? "Edit Client" : "Add Client"} showCloseButton={ true } onClose={() => props.toggleShow(false)}>
            <section>
                <div className='d-flex flex-column mb-3'>
                    <label>Principal</label>
                    <input type="text" value={ props.principal } onChange={(e) => props.updatePrincipal(e.target.value)} />
                    <Show when={ props.showPrincipalError }>
                        <small className="error"> Type a valid principal </small>
                    </Show>
                </div>
                <div className='choose-resources'>
                    <button onClick={() => props.onAddLabel()} className="add-resource"><img src="assets/icons/plus.svg" alt="close-button" /> Add resource </button>
                    <div className='resources-list'>
                        {
                            props.existingLabels?.map((lastNumber, index) => (
                                <ChooseResource 
                                    key={lastNumber} 
                                    index={index} 
                                    onUpdateResourceAndScope={props.onUpdateResourceAndScope}
                                    onDeleteResourceAndScope={props.onRemoveLabel}
                                    selectedResource={props.clientResourcesData?.[index]?.resource }
                                    selectedScopes={[...props.clientResourcesData?.[index]?.scopes || []]}
                                    choosenResourcesID={props.clientResourcesData?.map((resourceData) => resourceData.resource.resource_id)}
                                /> 
                            ))
                        }
                    </div>
                </div>
            </section>
            <Button 
                label="Save" 
                icon="pi pi-check" 
                className="p-button-text" 
                disabled={ props.principal.length == 0 || props.showPrincipalError }
                onClick={() => props.onSave()} 
            />
        </Modal>
    </div>
);


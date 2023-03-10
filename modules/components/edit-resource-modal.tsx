/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { Button } from "primereact/button";
import { EditResouceModalContentProps } from "../../infrastructure/interfaces/components/edit-resource-modal";
import { AddScope } from "../../src/components/AddScope";
import { Modal } from "../../src/components/Modal";
import { Show } from "../../src/components/Show";

export const EditResourceModalContent = (props: EditResouceModalContentProps) => (
    <div className="edit-resource">
        <Modal title={ props.resourceData.resource.resource_id != undefined ? "Edit Resource" : "Add Resource"} showCloseButton={ true } onClose={() => props.toggleShow(false)}>
            <section>
                <div className='d-flex flex-column mb-3'>
                    <div className='d-flex flex-column mb-2 w-100'>
                        <label> Name </label>
                        <input placeholder="auth_manager" type="text" value={ props.resourceData?.resource.name } onChange={(e) => props.onUpdateName(e.target.value)} />
                        <Show when={ props.showNameError }>
                            <small className="error"> Type a valid name </small>
                        </Show>
                    </div>
                    <div className='d-flex flex-column mb-2 w-100'>
                        <label> Description </label>
                        <input placeholder="Auth Module" type="text" value={ props.resourceData?.resource.description } onChange={(e) => props.onUpdateDescription(e.target.value)} />
                    </div>
                </div>
                <div className='add-scopes'>
                    <button onClick={() => props.onAddLabel()} className="add-scope"><img src="assets/icons/plus.svg" alt="close-button" /> Add scope </button>
                    <div className='scopes-list'>
                        {
                            props.existingLabels?.map((lastNumber, index) => (
                                <AddScope 
                                    key={lastNumber} 
                                    index={index} 
                                    onRemoveLabel={props.onRemoveLabel}
                                    onUpdateScope={props.onUpdateScope}
                                    label={props.resourceData.scopes[index]?.label}
                                    name={props.resourceData.scopes[index]?.name}
                                    description={props.resourceData.scopes[index]?.description}
                                    repeatedNames={props.repeatedNames}
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
                disabled={ !props.isSaveAvailable }
                onClick={() => props.onSave()} 
            />
        </Modal>
    </div>
);


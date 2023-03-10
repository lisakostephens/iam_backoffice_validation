/* eslint-disable @next/next/no-img-element */
import { ChooseResourceContentProps } from "../../infrastructure/interfaces/components/choose-resource";
import { Show } from "../../src/components/Show";

export const ChooseResourceContent = (props: ChooseResourceContentProps) => (
    <div className='choose-resource'>
        <section>
            <div className='selected-resource' onClick={() => props.toogleShowResources((prevState: boolean) => !prevState)}>
                <small> Resource </small>
                <Show when={ props.selectedResource != null || (props.resources != undefined && props.resources.length > 0)}>
                    <>{ props.selectedResource?.description || "insert resource" }</>
                </Show>
                <Show when={ props.selectedResource == null && props.resources?.length == 0}>
                    <>{ "no available resource" }</>
                </Show>
            </div>

            <div className={`resource ${props.showResources ? 'open-animation' : ''}`}>
                {   
                    props.resources?.map((resource) => (
                        <label key={ resource.resource_id } onClick={() => { props.updateSelectedResource(resource); props.toogleShowResources(false)}}>
                            { resource.description }
                        </label>
                    ))
                }
            </div>
        </section>
        
        <section>
            <div className={`${props.selectedResource ? '' : 'disabled'} selected-scope`} onClick={() => props.scopes && props.toogleShowScopes((prevState: boolean) => !prevState)}>
                <small> Resource Scope </small>
                Scopes
            </div>

            <div className={`scopes ${props.showScopes ? 'open-animation' : ''}`}>
                {   
                    props.scopes?.map((scope) => (
                        <label key={ scope.resource_scopes_id } htmlFor={ scope.label }>
                            <input 
                                type="checkbox" 
                                id={ scope.label } 
                                defaultChecked={ props.selectedScopes?.find((selectedScope) => selectedScope.resource_scopes_id == scope.resource_scopes_id)?.resource_scopes_id != null }
                                onChange={(e) => props.updateSelectedScopes(e.target.checked, scope.resource_scopes_id)} 
                            /> { scope.label }
                        </label>
                    ))
                }
            </div>
        </section>
        <button className="remove-label" onClick={() => props.onDeleteResourceAndScope(props.index)}> <img src="assets/icons/close-icon.svg" alt="close-button" /> </button>   
    </div>
)
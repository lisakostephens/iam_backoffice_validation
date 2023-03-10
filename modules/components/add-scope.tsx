/* eslint-disable @next/next/no-img-element */
import { AddScopeContentProps } from "../../infrastructure/interfaces/components/AddScope";
import { Show } from "../../src/components/Show";

export const AddScopeContent = (props: AddScopeContentProps) => (
    <div className='add-scope'>
            <section>
                <label> Label </label>
                <input placeholder="Authentication" className="label" type="text" value={ props.label } onChange={(e) => props.updateLabel(e.target.value)} />
                <Show when={ props.showLabelError }>
                    <small className="error"> Type a valid label </small>
                </Show>
            </section>

            <section>
                <label> Name </label>
                <input placeholder="auth_database" className="name" type="text" value={ props.name } onChange={(e) => props.updateName(e.target.value)} />
                <Show when={ props.showNameError }>
                    <small className="error"> Type a valid name </small>
                </Show>
                <Show when={ props.isNameRepetead }>
                    <small className="error"> Name is repetead </small>
                </Show>
            </section>
            
            <section>
                <label> Description </label>
                <input placeholder="Allow to view database" className="description" type="text" value={ props.description } onChange={(e) => props.updateDescription(e.target.value)} />
            </section>
        <button className="remove-label" onClick={() => props.onDeleteScope(props.index)}> <img src="assets/icons/close-icon.svg" alt="close-button" /> </button>   
    </div>
)
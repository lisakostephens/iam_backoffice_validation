import { useEffect, useState } from "react";
import { AddScopeProps } from "../../infrastructure/interfaces/components/AddScope";
import { isValidLabel, isValidName } from "../../infrastructure/utils";
import { AddScopeContent } from "../../modules/components/add-scope";

export const AddScope = (props: AddScopeProps) => {
    const [label, updateLabel] = useState(props.label || '');
    const [showLabelError, toggleShowLabelError] = useState(false);
    const [name, updateName] = useState(props.name || '');
    const [showNameError, toggleShowNameError] = useState(false);
    const [isNameRepetead, toggleIsNameRepetead] = useState(false);
    const [description, updateDescription] = useState(props.description || '');

    useEffect(() => {
        props.onUpdateScope(props.index, {
            label: label,
            name: name,
            description: description,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [label, name, description]);

    const onUpdateName = (name: string) => {
        toggleShowNameError(!isValidName(name));   
        updateName(name);
    }

    const onUpdateLabel = (label: string) => {
        toggleShowLabelError(!isValidLabel(label));        
        updateLabel(label);
    }

    useEffect(() => {
        toggleIsNameRepetead(props.repeatedNames.includes(name));  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.repeatedNames])

    return (
        <AddScopeContent
            label={label}
            name={name}
            description={description}
            updateLabel={onUpdateLabel}
            updateName={onUpdateName}
            updateDescription={updateDescription}
            onDeleteScope={props.onRemoveLabel}
            index={props.index}
            showNameError={showNameError}
            showLabelError={showLabelError}
            isNameRepetead={isNameRepetead}
        />
    )
}
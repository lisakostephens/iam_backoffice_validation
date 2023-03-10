import React, { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../../infrastructure/context';
import { EditResourceModalProps } from '../../infrastructure/interfaces/components/edit-resource-modal';
import { ResourceData } from '../../infrastructure/interfaces/pages/resources';
import { ResourceScope } from '../../infrastructure/interfaces/services/resources';
import { ResourceService } from '../../infrastructure/services/resources';
import { isValidName } from '../../infrastructure/utils';
import { EditResourceModalContent } from '../../modules/components/edit-resource-modal';


export default function EditResourceModal(props: EditResourceModalProps) {
    const initialResourceData: ResourceData = props.resourceData != undefined ? {...props.resourceData} : {
        resource: {
            description: '',
            name: '',
        },
        scopes: []
    }
    const initialLabelsNumber = initialResourceData.scopes.length > 0 ? Array.from(initialResourceData.scopes?.keys()) : [0]
    const [showNameError, toggleShowNameError] = useState(false);
    const [repeatedNames, updateRepeatedNames] = useState<string[]>([]);
    const [isSaveAvailable, toggleIsSaveAvailable] = useState(false);
    const [resourceData, updateResourceData] = useState<ResourceData>(initialResourceData);
    const [existingLabels, updateExistingLabels] = useState<number[]>(initialLabelsNumber);

    const resourceService = new ResourceService();
    const showToast = useContext(ToastContext);

    const onAddLabel = () => {
        updateExistingLabels((preState) => [...preState, Math.max(...preState) +1]);  
    }

    const onRemoveLabel = (index: number) => {
        let _existingLabels = existingLabels;
        _existingLabels = _existingLabels.filter((_, _index) => _index != index);

        updateExistingLabels(() => [..._existingLabels]);

        updateResourceData((prevState) => {
            let _resourceData = {...prevState};

            const scopes = _resourceData.scopes.filter((_, _index) => _index != index);
            _resourceData.scopes = scopes;

            return {..._resourceData}
        })
    }

    const onUpdateName = (name: string) => {
        updateResourceData((prevState) => {
            let _resourceData = {...prevState};
            _resourceData.resource.name = name;
            
            return _resourceData;
        });

        toggleShowNameError(!isValidName(name));        
    }

    const onUpdateDescription = (description: string) => {
        updateResourceData((prevState) => {
            let _resourceData = {...prevState};
            _resourceData.resource.description = description;
            
            return _resourceData;
        });
    }

    const onUpdateScope = (index: number, scope: ResourceScope) => {
        updateResourceData((prevState) => {
            let _resourceData = prevState;
            _resourceData.scopes[index] = scope;

            return {..._resourceData}
        })
    }

    const onCreateResource = async () => {
        if (!resourceData) {
            return;
        }

        const _resourceData = await resourceService.create(resourceData);
        if (!_resourceData) {
            return;
        }
        
        props.onCreateResource && props.onCreateResource(_resourceData.resource);
        props.toggleShow(false);
        showToast("success", "Success", "Resource successfully created");
    }

    const onEditResource = async () => {
        if (resourceData.resource.resource_id == undefined) {
            return;
        }

        const updatedResourceData = await resourceService.update(resourceData.resource.resource_id, resourceData)
        
        props.onEditResource && props.onEditResource(updatedResourceData.resource);
        props.toggleShow(false);
        showToast("success", "Success", "Resource successfully edited");
    }

    useEffect(() => {
        const areAllFilled = resourceData?.scopes.every((scope) => scope?.name?.length != 0 && scope?.description?.length != 0 && scope?.label?.length != 0);
        
        const allNames = resourceData?.scopes.flatMap((scope) => scope.name);
        const repeatedNames = allNames.filter((e, i, a) => a.indexOf(e) !== i && e.length > 0);
        updateRepeatedNames(() => repeatedNames);

        toggleIsSaveAvailable(
            !showNameError && 
            resourceData?.resource.name.length != 0 &&
            areAllFilled &&
            repeatedNames.length == 0
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resourceData]);

    return (
        <EditResourceModalContent
            resourceData={resourceData}
            existingLabels={existingLabels}
            toggleShow={props.toggleShow}
            onAddLabel={onAddLabel}
            onSave={resourceData.resource.resource_id == undefined ? onCreateResource : onEditResource}
            onUpdateName={onUpdateName}
            onUpdateDescription={onUpdateDescription}
            onRemoveLabel={onRemoveLabel}
            onUpdateScope={onUpdateScope}
            showNameError={showNameError}
            isSaveAvailable={isSaveAvailable}
            repeatedNames={repeatedNames}
        />
    );
}
        

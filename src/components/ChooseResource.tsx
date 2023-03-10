import { useEffect, useState } from "react";
import { ChooseResourceProps } from "../../infrastructure/interfaces/components/choose-resource";
import { Resource, ResourceScope } from "../../infrastructure/interfaces/services/resources";
import { ResourceService } from "../../infrastructure/services/resources";
import { ChooseResourceContent } from "../../modules/components/choose-resource";

export const ChooseResource = (props: ChooseResourceProps) => {
    const resourceService = new ResourceService();

    const [resources, updateResources] = useState<Resource[]>([]);
    const [availableResources, updateAvailableResource] =  useState<Resource[]>([]);
    const [selectedResource, updateSelectedResource] = useState<Resource | null>(props.selectedResource || null);
    const [showResources, toogleShowResources] = useState(false);

    const [scopes, updateScopes] = useState<ResourceScope[]>([]);
    const [selectedScopes, updateSelectedScopes] = useState<ResourceScope[]>(props.selectedScopes || []);
    const [showScopes, toogleShowScopes] = useState(false);

    useEffect(() => {
        onGetResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!selectedResource) {
            return;
        }
        
        props.onUpdateResourceAndScope(props.index, {
            "resource": selectedResource,
            "scopes": selectedScopes,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedScopes, selectedResource])

    useEffect(() => {
        if (!selectedResource?.resource_id) {
            return;
        }

        onUpdateResourceScope(selectedResource.resource_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedResource]);

    const onGetResources = async () => {
        let _resources = await resourceService.list();
        if (_resources.length == 0){
            return;
        }

        updateResources(_resources);
    }

    useEffect(() => {
        updateAvailableResource(() => {
            const _resources = resources.filter((_resource) => !props.choosenResourcesID?.includes(_resource.resource_id))

            return [..._resources];
        });

    }, [props.choosenResourcesID, resources])

    const onUpdateResourceScope = async (resourceID: number) => {
        const _scopes = await resourceService.getResourceScopes(resourceID);
        if (!_scopes || !_scopes.length){
            return;
        }
        updateScopes(_scopes);
        
        if (props.selectedResource?.resource_id == resourceID && selectedScopes == props.selectedScopes) {
            return;
        }
        updateSelectedScopes([]);
        toogleShowScopes(true);
    }

    const onUpdateSelectedScopes = (isSelected: boolean, scopeID: number) => {
        if (isSelected) {
            const scope = scopes.find((_scope) => _scope.resource_scopes_id == scopeID);
            if (!scope) {
                return;
            }
    
            updateSelectedScopes((prevState) => [...prevState, scope]);
            return;
        }

        updateSelectedScopes((prevState) => [...prevState.filter((scope) => scope.resource_scopes_id != scopeID)]);
        return;
    }

    return (
        <ChooseResourceContent
            toogleShowResources={toogleShowResources}
            selectedResource={selectedResource}
            showResources={showResources}
            resources={availableResources}
            updateSelectedResource={updateSelectedResource}
            showScopes={showScopes}
            selectedScopes={selectedScopes}
            scopes={scopes}
            updateSelectedScopes={onUpdateSelectedScopes}
            toogleShowScopes={toogleShowScopes}
            onDeleteResourceAndScope={props.onDeleteResourceAndScope}
            index={props.index}
        />
    )
}
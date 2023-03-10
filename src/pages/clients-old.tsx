import { FilterMatchMode } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import React, { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../../infrastructure/context';
import { ClientData } from '../../infrastructure/interfaces/pages/clients';
import { ResourceData } from '../../infrastructure/interfaces/pages/resources';
import { Client } from '../../infrastructure/interfaces/services/clients';
import { ClientsService } from '../../infrastructure/services/clients';
import { ResourceService } from '../../infrastructure/services/resources';
import { ClientsContent } from '../../modules/clients'

export default function Clients() {
    const [clientsData, updateClients] = useState<ClientData[]>([]);
    const [showNewClientModal, toogleShowNewClientModal] = useState(false);

    const[selectedClientsData, updateSelectedClientsData] = useState<ClientData[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    });

    const clientsService = new ClientsService();
    const resourceService = new ResourceService();
    const showToast = useContext(ToastContext);
    
    useEffect(() => {
        onUpdateClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onUpdateClients = async () => {
        const clientList = await clientsService.list();
        const resourceList = await resourceService.list();
        const updatedClientsData: ClientData[] = [];

        for (let i = 0; i < clientList.data.length; i++) {
            const clientScopesList = await clientsService.listScopes(clientList.data[i].id);
            
            let resourcesData = resourceList.map((resource) => {
                return {
                    "resource": resource,
                    "scopes": clientScopesList.data.filter((scope) => scope.resource_id == resource.resource_id)
                }
            });

            resourcesData = resourcesData.filter((resourceData) => resourceData.scopes.length > 0);
            
            updatedClientsData.push({
                "client": clientList.data[i],
                "resourcesData": resourcesData
            })
        }

        updateClients(updatedClientsData);
    }

    const onDeleteClient = async (clientID: number) => {
        updateClients((prevState) => [...prevState?.filter((clientData) => clientData.client.id != clientID)])
    }

    const onCreateClient = async (client: Client) => {
        const resourceList = await resourceService.list();
        const clientScopesList = await clientsService.listScopes(client.id);
        
        let resourcesData = resourceList.map((resource) => {
            return {
                "resource": resource,
                "scopes": clientScopesList.data.filter((scope) => scope.resource_id == resource.resource_id)
            }
        });

        resourcesData = resourcesData.filter((resourceData) => resourceData.scopes.length > 0);

        const _clientData = {
            "client": client,
            "resourcesData": resourcesData
        };

        updateClients((prevState) => [...prevState, _clientData]); 
        return;
    }

    const onEditClient = async (clientID: number, updatedResourceData: ResourceData[]) => {
        if (!updatedResourceData) {
            return;
        }

        updateClients((prevState) => {
            let _clientData = prevState?.find((prevClientData) => prevClientData.client.id == clientID);
            if (_clientData == undefined) {
                return [...prevState];
            }
            const index = prevState.indexOf(_clientData);

            _clientData.resourcesData = updatedResourceData
            prevState[index] = _clientData
            
            return [...prevState];
        });
    }


    const onDeleteMultiple = async () => {
        for (let i = 0; i < selectedClientsData.length; i++) {
            const isDeleted = await clientsService.delete(selectedClientsData[i].client.id);
            if (!isDeleted) {
                return
            }
        }

        const selectedClientsID = selectedClientsData.map((selectedClientData) => selectedClientData.client.id);
        updateClients((prevState) => [...prevState?.filter((clientData) => clientData.client.id != undefined && !selectedClientsID.includes(clientData.client.id))]);
        updateSelectedClientsData([]);

        showToast("success", "Success", "Multiple clients successfully deleted");
    }

    return (
        <ClientsContent 
            clientsData={clientsData}
            onDeleteClient={onDeleteClient}
            showNewClientModal={showNewClientModal}
            toogleShowNewClientModal={toogleShowNewClientModal}
            onCreateClient={onCreateClient}
            onEditClient={onEditClient}
            filters={filters}
            setFilters={setFilters}
            selectedClientsData={selectedClientsData}
            updateSelectedClientsData={updateSelectedClientsData}
            onDeleteMultiple={onDeleteMultiple}
        />
    )
}

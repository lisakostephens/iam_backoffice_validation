import React, { useContext, useState } from "react";
import { ToastContext } from "../../infrastructure/context";
import { EditClientModalProps } from "../../infrastructure/interfaces/components/edit-clients-modal";
import { ResourceData } from "../../infrastructure/interfaces/pages/resources";
import { ClientsService } from "../../infrastructure/services/clients";
import { isValidEmail } from "../../infrastructure/utils";
import { EditClientModalContent } from "../../modules/components/edit-client-modal";

export default function EditClientModal(props: EditClientModalProps) {
  const [principal, updatePrincipal] = useState(props.principal || "");
  const [showPrincipalError, toggleShowPrincipalError] = useState(false);

  const [clientResourcesData, updateclientResourcesData] = useState<
    ResourceData[]
  >([...(props.clientResourcesData || [])]);
  const [existingLabels, updateExistingLabels] = useState<number[]>(
    Array.from(props.clientResourcesData?.keys() || [0])
  );

  const clientsService = new ClientsService();
  const showToast = useContext(ToastContext);

  const onUpdatePrincipal = (email: string) => {
    updatePrincipal(email);

    toggleShowPrincipalError(!isValidEmail(email));
  };

  const onUpdateResourceAndScope = (
    index: number,
    resourceData: ResourceData
  ) => {
    updateclientResourcesData((_clientResourcesData) => {
      _clientResourcesData[index] = resourceData;

      return [..._clientResourcesData];
    });
  };

  const onAddLabel = () => {
    updateExistingLabels((preState) => [
      ...preState,
      Math.max(...preState) + 1,
    ]);
  };

  const onRemoveLabel = (index: number) => {
    let _existingLabels = existingLabels;
    _existingLabels = _existingLabels.filter((_, _index) => _index != index);

    updateExistingLabels(() => [..._existingLabels]);

    updateclientResourcesData((prevState) => {
      const _clientResourcesData = prevState.filter(
        (_, _index) => _index != index
      );
      return [..._clientResourcesData];
    });
  };

  const onCreateClient = async () => {
    if (showPrincipalError) {
      return;
    }

    const client = await clientsService.createClient(principal);
    if (!client) {
      return;
    }

    const requests = clientResourcesData.map((clientResourceData) => {
      return Promise.all(
        clientResourceData.scopes.map(async (scope) => {
          return await clientsService.createRole(
            client.id,
            scope.resource_scopes_id!
          );
        })
      );
    });

    await Promise.all(requests);

    props.onCreateClient && props.onCreateClient(client);
    props.toggleShow(false);
    showToast("success", "Success", "Client successfully created");
  };

  const onEditClient = async () => {
    if (showPrincipalError || props.clientID == undefined) {
      return;
    }

    const originalScopes = props.clientResourcesData
      ?.map((clientResourceData) => clientResourceData.scopes)
      .flat(1);
    const originalScopesID = originalScopes?.map(
      (scope) => scope.resource_scopes_id
    );

    const updatedScopes = clientResourcesData
      ?.map((clientResourceData) => clientResourceData.scopes)
      .flat(1);
    const updatedScopesID = updatedScopes?.map(
      (scope) => scope.resource_scopes_id
    );

    const newScopesID = updatedScopesID?.filter(
      (scopeID) => !originalScopesID?.includes(scopeID)
    );
    await Promise.all(
      newScopesID.map(async (scopeID) => {
        if (scopeID == undefined || props.clientID == undefined) {
          return;
        }

        return await clientsService.createRole(props.clientID, scopeID);
      })
    );

    const excludedScopesID =
      originalScopesID?.filter(
        (scopeID) => !updatedScopesID?.includes(scopeID)
      ) || [];
    await Promise.all(
      excludedScopesID.map(async (scopeID) => {
        if (scopeID == undefined || props.clientID == undefined) {
          return;
        }

        return await clientsService.deleteRole(props.clientID, scopeID);
      })
    );

    props.onEditClient &&
      props.onEditClient(props.clientID, clientResourcesData);
    props.toggleShow(false);
    showToast("success", "Success", "Client successfully edited");
  };

  return (
    <EditClientModalContent
      clientID={props.clientID}
      principal={principal}
      updatePrincipal={onUpdatePrincipal}
      showPrincipalError={showPrincipalError}
      onUpdateResourceAndScope={onUpdateResourceAndScope}
      toggleShow={props.toggleShow}
      existingLabels={existingLabels}
      onAddLabel={onAddLabel}
      onRemoveLabel={onRemoveLabel}
      onSave={props.clientID == undefined ? onCreateClient : onEditClient}
      clientResourcesData={clientResourcesData}
    />
  );
}

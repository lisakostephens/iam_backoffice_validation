/* eslint-disable no-unused-vars */
import {
  emptyField,
  formatErrors,
  errorsLength,
  errorMessage,
} from "magical-form";
import { Modal, ModalContext } from "mighty-modal";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Client,
  ListClient,
} from "../../infrastructure/interfaces/services/clients";
import { Resource } from "../../infrastructure/interfaces/services/resources";
import { ClientsService } from "../../infrastructure/services/clients";
import { ResourceService } from "../../infrastructure/services/resources";
import DeleteIcon from "../../public/assets/icons/trash-icon.svg";
import AddIcon from "../../public/assets/icons/plus.svg";
import { Button } from "primereact/button";
import { Table } from "../components/Table";
import { Show } from "../components/Show";
import { ToastContext } from "../../infrastructure/context";
import { InputText } from "primereact/inputtext";
import { LoginContent } from "../../modules/login";

interface ResourceItemProps {
  resource: Resource;
  resources: Resource[] | null;
  baseResource: Resource;
  clientResources: Resource[];
  onUpdate: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
}

export default function Clients() {
  const baseClient: Client = {
    id: 0,
    principal: "",
    is_active: false,
    type: "",
    resources: [],
  };

  const catClient: Client = {
    id: 1,
    principal: "cats",
    is_active: true,
    type: "animal",
    resources: [],
  };

  const baseClients: ListClient = {
    data: [baseClient, catClient],
    count: 2,
  };

  const [clients, setClients] = useState<null | ListClient>(null);
  const [filteredClients, setFilterdClients] = useState<null | ListClient>(
    baseClients
  );
  const [resources, setResources] = useState<null | Resource[]>(null);
  const [selectedClients, setSelecedClients] = useState<any[]>([]);
  const [clientData, setClientData] = useState<Client | null>(null);
  const { confirmationModalListener } = useContext(ModalContext);

  const showToast = useContext(ToastContext);

  const clientsService = new ClientsService();
  const resourceService = new ResourceService();

  useEffect(() => {
    onGetResources();
  }, []);

  useEffect(() => {
    if (resources) {
      onGetClients();
    }
  }, [resources]);

  const onGetClients = async () => {
    setClients(null);
    const clientsResponse = await clientsService.list();
    let clients: Client[] = await Promise.all(
      clientsResponse.data.map(async (client) => {
        const scopes = await clientsService.listScopes(client.id);
        let userResources: any = {};
        scopes.data.map((scope) => {
          if (userResources[scope.resource_id]) {
            userResources[scope.resource_id].scopes.push(scope);
          } else {
            userResources[scope.resource_id] = {
              ...resources?.filter(
                (x) => x.resource_id === scope.resource_id
              )[0],
              scopes: [scope],
            };
          }
        });
        client.resources = Object.values(userResources);
        return client;
      })
    );
    setClients({ ...clientsResponse, data: clients });
    setFilterdClients({ ...clientsResponse, data: clients });
  };

  const onGetResources = async () => {
    const resourcesResponse = await resourceService.list();
    let resources: Resource[] = await Promise.all(
      resourcesResponse.map(async (resource) => {
        const scopes = await resourceService.getResourceScopes(
          resource.resource_id as number
        );
        resource.scopes = scopes;
        return resource;
      })
    );
    setResources(resources);
  };

  const ClientDataModal = ({
    clientData,
    resources,
    onClose,
  }: {
    clientData: Client | null;
    resources: Resource[] | null;
    onClose: Function;
  }) => {
    const clientsService = new ClientsService();
    const [clientForm, setClientForm] = useState<any>({
      principal: "",
    });
    const [clientResources, setClientResources] = useState<Resource[]>([]);
    const [errors, setErrors] = useState<any>(null);
    const showToast = useContext(ToastContext);
    const baseResource = {
      resource_id: 0,
      name: "",
      description: "",
      scopes: [],
    };

    useEffect(() => {
      if (clientData) {
        setClientForm({ principal: clientData.principal });
        clientData.resources && setClientResources(clientData.resources);
      }
    }, [clientData]);

    const onCreateClient = () => {
      const newFilteredClientsData = [filteredClients && filteredClients.data];
      let newClient: Client = {
        id: filteredClients ? filteredClients.count : 0,
        principal: clientForm,
        is_active: true,
        type: "",
        resources: [],
      };

      // const newListClients: ListClient = {
      //   data: [newClient],
      //   count: ,
      // };

      console.log(newFilteredClientsData);
      // console.log(newListClients);

      // newFilteredClientsData.push(newListClients);
      // console.log(newFilteredClients);
      // setFilterdClients(newFilteredClients);
      //   setFilterdClients(newFilteredClients);
      // e.target.disabled = true;
      // setErrors(null);
      // // let errors = {
      // //   principal: [emptyField(clientForm.principal, "text")],
      // // };
      // // errors = formatErrors(errors);
      // // setErrors(errors);
      // // if (errorsLength(errors)) {
      // //   e.target.disabled = "";
      // //   return;
      // // }
      // let filteredClientResources = clientResources.filter(
      //   (x) => x.resource_id !== 0 && x.scopes && x.scopes?.length > 0
      // );
      // // if (filteredClientResources.length === 0) {
      // //   setErrors({
      // //     ...errors,
      // //     scope: "You have to choose at least one resource and scope",
      // //   });
      // //   e.target.disabled = "";
      // //   return;
      // // }
      // if (
      //   clientResources.filter(
      //     (x) => x.resource_id !== 0 && x.scopes?.length === 0
      //   ).length > 0
      // ) {
      //   setErrors({
      //     ...errors,
      //     scope: "You have to choose at least one scope for each resource",
      //   });
      //   e.target.disabled = "";
      //   return;
      // }
      // try {
      //   let finalClientData: Client | null = clientData;
      //   if (clientData?.id === 0) {
      //     const createClientResponse = await clientsService.createClient(
      //       clientForm.principal
      //     );
      //     await Promise.all(
      //       filteredClientResources.map(async (resource) => {
      //         resource.scopes?.map(async (scope) => {
      //           const response = await clientsService.createRole(
      //             createClientResponse.id,
      //             scope.resource_scopes_id as number
      //           );
      //           return response;
      //         });
      //       })
      //     );
      //     finalClientData = {
      //       ...createClientResponse,
      //       resources: filteredClientResources,
      //     };
      //   } else if (clientData) {
      //     let initialClientResources = [...(clientData.resources || [])]
      //       .map((x) => x.scopes?.map((x) => x.resource_scopes_id))
      //       .flat(1);
      //     let newClientResources = [...filteredClientResources]
      //       .map((x) => x.scopes?.map((x) => x.resource_scopes_id))
      //       .flat(1);
      //     await Promise.all(
      //       newClientResources?.map(async (resource_scopes_id) => {
      //         if (!initialClientResources.includes(resource_scopes_id)) {
      //           const response = await clientsService.createRole(
      //             clientData.id,
      //             resource_scopes_id as number
      //           );
      //           return response;
      //         }
      //       })
      //     );
      //     await Promise.all(
      //       initialClientResources?.map(async (resource_scopes_id) => {
      //         if (!newClientResources.includes(resource_scopes_id)) {
      //           const response = await clientsService.deleteRole(
      //             clientData.id,
      //             resource_scopes_id as number
      //           );
      //           return response;
      //         }
      //       })
      //     );
      //     finalClientData = {
      //       ...clientData,
      //       resources: filteredClientResources,
      //     };
      //   }
      //   showToast(
      //     "success",
      //     "Success",
      //     `Client successfully ${clientData?.id === 0 ? "created" : "updated"}!`
      //   );
      //   onClose(finalClientData);
      // } catch (error) {
      //   console.log(error);
      //   e.target.disabled = "";
      // }
    };

    const areAllResourcesSelected = (): boolean => {
      return (
        resources?.filter((x) =>
          clientResources.map((y) => y.resource_id).includes(x.resource_id)
        ).length === resources?.length
      );
    };

    const isShowResource = (x: Resource) => {
      return areAllResourcesSelected() ? x.resource_id != 0 : true;
    };

    return (
      <Modal
        title={`${clientData?.id === 0 ? "Create" : "Edit"} client`}
        opened={clientData != null}
        customClass="client-modal"
        onClose={() => onClose()}
      >
        <div>
          <form className="w-100">
            <div className="w-100">
              <label>Principal</label>
              <input
                type={"text"}
                name="principal"
                readOnly={clientData?.id != 0}
                className="w-100"
                value={clientForm.principal}
                onChange={(e) => setClientForm({ principal: e.target.value })}
              />
              {errorMessage(errors?.principal)}
            </div>
          </form>
          {/* <div className="resources mb-4">
            <div>
              <button
                className="add-resource-btn d-flex flex-row align-items-center my-2"
                disabled={areAllResourcesSelected()}
                onClick={() =>
                  setClientResources([...clientResources, baseResource])
                }
              >
                <AddIcon className="me-2" />
                <label>Add Resource</label>
              </button>
              {areAllResourcesSelected() && (
                <p>You have chosen all resource options</p>
              )}
            </div>
            <div className="resource-items w-100">
              {clientResources.map((x, index) => {
                return (
                  isShowResource(x) && (
                    <ResourceItem
                      key={index}
                      resource={x}
                      resources={resources}
                      baseResource={baseResource}
                      clientResources={clientResources}
                      onUpdate={(resource) => {
                        let clientResourcesCopy = [...clientResources];
                        clientResourcesCopy[index] = resource;
                        setClientResources(clientResourcesCopy);
                      }}
                      onDelete={(resource) => {
                        let clientResourcesCopy = [...clientResources];
                        setClientResources(
                          clientResourcesCopy.filter(
                            (x) => x.resource_id !== resource.resource_id
                          )
                        );
                      }}
                    />
                  )
                );
              })}
            </div>
            {errorMessage(errors?.scope)}
          </div> */}
          <button onClick={onCreateClient}>
            {clientData?.id === 0 ? "Criar" : "Editar"}
          </button>
        </div>
      </Modal>
    );
  };

  const removeClients = (clientsToRemove: Client[]) => {
    let clientsCopy = Object.assign({}, clients);
    let clientsIdsToRemove = clientsToRemove.map((x) => x.id);
    let filteredClients = clients?.data.filter(
      (x: Client) => !clientsIdsToRemove.includes(x.id)
    ) as Client[];
    clientsCopy.data = filteredClients;
    setClients(clientsCopy);
    setFilterdClients(clientsCopy);
  };

  const onDeleteClient = async (e: any, client: Client) => {
    e.target.disabled = true;
    const response = await confirmationModalListener({
      body: (
        <p>
          Are you sure you want to delete <b>{client.principal}</b>?
        </p>
      ),
      confirmText: "Yes",
      rejectText: "No",
    });
    if (!response) {
      e.target.disabled = "";
      return;
    }
    await clientsService.delete(client.id);
    showToast("success", "Success", "Client successfully deleted!");

    removeClients([client]);
    e.target.disabled = "";
  };

  const onDeleteMultiple = async (e: any) => {
    e.target.disabled = true;
    const response = await confirmationModalListener({
      body: <p>Are you sure you want to delete the selected clients?</p>,
      confirmText: "Yes",
      rejectText: "No",
    });
    if (!response) {
      e.target.disabled = "";
      return;
    }
    await Promise.all(
      selectedClients.map(async (client) => {
        await clientsService.delete(client.id);
      })
    );
    showToast("success", "Success", "Client successfully deleted!");

    removeClients(selectedClients);
    setSelecedClients([]);
  };

  const onSearch = async (e: any) => {
    if (clients) {
      if (!e.target.value) {
        setFilterdClients(null);
        setFilterdClients(clients);
      }
      setFilterdClients({
        ...clients,
        data: clients.data.filter((x) => x.principal.includes(e.target.value)),
      });
    }
  };

  return (
    <div className="clients content">
      <div className="box w-100">
        <div className="content-header w-100 d-flex flex-row justify-content-between mb-2">
          <h1>Clients</h1>
          <span className="p-input-icon-left">
            <i className="pi pi-search" placeholder="Search..." />
            <InputText type="search" onInput={onSearch} />
          </span>
        </div>
        <div className="d-flex flex-row justify-content-between py-4">
          <button
            className="add-client-btn"
            onClick={() => setClientData(baseClient)}
          >
            Create Client
          </button>
        </div>
        <Table
          data={filteredClients?.data}
          header={[
            {
              content: (
                <input
                  type="checkbox"
                  checked={selectedClients.length > 0}
                  onClick={() => {
                    let selectedClientsCopy = [...selectedClients];
                    if (selectedClientsCopy.length > 0) {
                      selectedClientsCopy = [];
                    } else if (clients?.data) {
                      selectedClientsCopy = clients.data;
                    }
                    setSelecedClients(selectedClientsCopy);
                  }}
                />
              ),
            },
            {
              title: "Principal",
              className: "principal",
            },
            {
              title: "Resources",
              className: "resources",
            },
            {
              content: (
                <div className="d-flex align-items-center gap-3">
                  Actions
                  <Show when={selectedClients.length > 0}>
                    <>
                      <Button
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-danger ms-2 small-btn"
                        onClick={onDeleteMultiple}
                      />
                      delete multiple
                    </>
                  </Show>
                </div>
              ),
              className: "actions",
            },
          ]}
          customRow={(client: Client) => (
            <tr
              onClick={() => {
                let selectedClientsCopy = [...selectedClients];
                if (selectedClients.map((x) => x.id).includes(client.id)) {
                  selectedClientsCopy = selectedClientsCopy?.filter(
                    (x) => x.id !== client.id
                  );
                } else {
                  selectedClientsCopy.push(client);
                }
                setSelecedClients(selectedClientsCopy);
              }}
              className={`${
                selectedClients.map((x) => x.id).includes(client.id)
                  ? "selected"
                  : ""
              }`}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedClients.map((x) => x.id).includes(client.id)}
                  className="form-check-input"
                />
              </td>
              <td>{client.principal}</td>
              <td>
                <div className="resource-items d-flex flex-row flex-wrap">
                  {client.resources?.map((x: Resource) => (
                    <div className="resource" key={x.resource_id}>
                      <b className="ms-1">{x.name}</b>
                      <div className="scopes w-100">
                        {x.scopes?.map((y) => (
                          <label className="m-1" key={y.resource_scopes_id}>
                            {y.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td>
                <div className="row-actions d-flex flex-row">
                  <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded mr-2 small-btn"
                    onClick={(e) => setClientData(client)}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger ms-2 small-btn"
                    onClick={(e) => onDeleteClient(e, client)}
                  />
                </div>
              </td>
            </tr>
          )}
        />
      </div>
      {clientData && (
        <ClientDataModal
          clientData={clientData}
          resources={resources}
          onClose={(e: Client | undefined) => {
            setClientData(null);
            if (e) {
              //   let clientsCopy = Object.assign({}, clients);
              //   let client = clientsCopy?.data.filter(
              //     (x: Client) => x.id === e.id
              //   );
              //   if (client?.length) {
              //     const clientIndex = clientsCopy.data.indexOf(client[0]);
              //     clientsCopy.data[clientIndex] = e;
              //   } else {
              //     clientsCopy.data.push(e);
              //   }
              //   setClients(clientsCopy);
              //   let filteredClientsCopy = Object.assign({}, filteredClients);
              //   let filteredClient = filteredClientsCopy?.data.filter(
              //     (x: Client) => x.id === e.id
              //   );
              //   if (filteredClient?.length) {
              //     const filteredClientIndex = filteredClientsCopy.data.indexOf(
              //       filteredClient[0]
              //     );
              //     filteredClientsCopy.data[filteredClientIndex] = e;
              //   } else {
              //     filteredClientsCopy.data.push(e);
              //   }
              //   setFilterdClients(filteredClientsCopy);
            }
          }}
        />
      )}
    </div>
  );
}

// const ClientDataModal = ({
//   clientData,
//   resources,
//   onClose,
// }: {
//   clientData: Client | null;
//   resources: Resource[] | null;
//   onClose: Function;
// }) => {
//   const clientsService = new ClientsService();
//   const [clientForm, setClientForm] = useState<any>({
//     principal: "",
//   });
//   const [clientResources, setClientResources] = useState<Resource[]>([]);
//   const [errors, setErrors] = useState<any>(null);
//   const showToast = useContext(ToastContext);
//   const baseResource = {
//     resource_id: 0,
//     name: "",
//     description: "",
//     scopes: [],
//   };

//   useEffect(() => {
//     if (clientData) {
//       setClientForm({ principal: clientData.principal });
//       clientData.resources && setClientResources(clientData.resources);
//     }
//   }, [clientData]);

//   const onCreateClient = (e: any) => {
//     console.log("there is an event handler");

//     // e.target.disabled = true;
//     // setErrors(null);
//     // // let errors = {
//     // //   principal: [emptyField(clientForm.principal, "text")],
//     // // };
//     // // errors = formatErrors(errors);
//     // // setErrors(errors);
//     // // if (errorsLength(errors)) {
//     // //   e.target.disabled = "";
//     // //   return;
//     // // }
//     // let filteredClientResources = clientResources.filter(
//     //   (x) => x.resource_id !== 0 && x.scopes && x.scopes?.length > 0
//     // );
//     // // if (filteredClientResources.length === 0) {
//     // //   setErrors({
//     // //     ...errors,
//     // //     scope: "You have to choose at least one resource and scope",
//     // //   });
//     // //   e.target.disabled = "";
//     // //   return;
//     // // }
//     // if (
//     //   clientResources.filter(
//     //     (x) => x.resource_id !== 0 && x.scopes?.length === 0
//     //   ).length > 0
//     // ) {
//     //   setErrors({
//     //     ...errors,
//     //     scope: "You have to choose at least one scope for each resource",
//     //   });
//     //   e.target.disabled = "";
//     //   return;
//     // }
//     // try {
//     //   let finalClientData: Client | null = clientData;
//     //   if (clientData?.id === 0) {
//     //     const createClientResponse = await clientsService.createClient(
//     //       clientForm.principal
//     //     );
//     //     await Promise.all(
//     //       filteredClientResources.map(async (resource) => {
//     //         resource.scopes?.map(async (scope) => {
//     //           const response = await clientsService.createRole(
//     //             createClientResponse.id,
//     //             scope.resource_scopes_id as number
//     //           );
//     //           return response;
//     //         });
//     //       })
//     //     );
//     //     finalClientData = {
//     //       ...createClientResponse,
//     //       resources: filteredClientResources,
//     //     };
//     //   } else if (clientData) {
//     //     let initialClientResources = [...(clientData.resources || [])]
//     //       .map((x) => x.scopes?.map((x) => x.resource_scopes_id))
//     //       .flat(1);
//     //     let newClientResources = [...filteredClientResources]
//     //       .map((x) => x.scopes?.map((x) => x.resource_scopes_id))
//     //       .flat(1);
//     //     await Promise.all(
//     //       newClientResources?.map(async (resource_scopes_id) => {
//     //         if (!initialClientResources.includes(resource_scopes_id)) {
//     //           const response = await clientsService.createRole(
//     //             clientData.id,
//     //             resource_scopes_id as number
//     //           );
//     //           return response;
//     //         }
//     //       })
//     //     );
//     //     await Promise.all(
//     //       initialClientResources?.map(async (resource_scopes_id) => {
//     //         if (!newClientResources.includes(resource_scopes_id)) {
//     //           const response = await clientsService.deleteRole(
//     //             clientData.id,
//     //             resource_scopes_id as number
//     //           );
//     //           return response;
//     //         }
//     //       })
//     //     );
//     //     finalClientData = {
//     //       ...clientData,
//     //       resources: filteredClientResources,
//     //     };
//     //   }
//     //   showToast(
//     //     "success",
//     //     "Success",
//     //     `Client successfully ${clientData?.id === 0 ? "created" : "updated"}!`
//     //   );
//     //   onClose(finalClientData);
//     // } catch (error) {
//     //   console.log(error);
//     //   e.target.disabled = "";
//     // }
//   };

//   const areAllResourcesSelected = (): boolean => {
//     return (
//       resources?.filter((x) =>
//         clientResources.map((y) => y.resource_id).includes(x.resource_id)
//       ).length === resources?.length
//     );
//   };

//   const isShowResource = (x: Resource) => {
//     return areAllResourcesSelected() ? x.resource_id != 0 : true;
//   };

//   return (
//     <Modal
//       title={`${clientData?.id === 0 ? "Create" : "Edit"} client`}
//       opened={clientData != null}
//       customClass="client-modal"
//       onClose={() => onClose()}
//     >
//       <div>
//         <form className="w-100">
//           <div className="w-100">
//             <label>Principal</label>
//             <input
//               type={"text"}
//               name="principal"
//               readOnly={clientData?.id != 0}
//               className="w-100"
//               value={clientForm.principal}
//               onChange={(e) => setClientForm({ principal: e.target.value })}
//             />
//             {errorMessage(errors?.principal)}
//           </div>
//         </form>
//         {/* <div className="resources mb-4">
//           <div>
//             <button
//               className="add-resource-btn d-flex flex-row align-items-center my-2"
//               disabled={areAllResourcesSelected()}
//               onClick={() =>
//                 setClientResources([...clientResources, baseResource])
//               }
//             >
//               <AddIcon className="me-2" />
//               <label>Add Resource</label>
//             </button>
//             {areAllResourcesSelected() && (
//               <p>You have chosen all resource options</p>
//             )}
//           </div>
//           <div className="resource-items w-100">
//             {clientResources.map((x, index) => {
//               return (
//                 isShowResource(x) && (
//                   <ResourceItem
//                     key={index}
//                     resource={x}
//                     resources={resources}
//                     baseResource={baseResource}
//                     clientResources={clientResources}
//                     onUpdate={(resource) => {
//                       let clientResourcesCopy = [...clientResources];
//                       clientResourcesCopy[index] = resource;
//                       setClientResources(clientResourcesCopy);
//                     }}
//                     onDelete={(resource) => {
//                       let clientResourcesCopy = [...clientResources];
//                       setClientResources(
//                         clientResourcesCopy.filter(
//                           (x) => x.resource_id !== resource.resource_id
//                         )
//                       );
//                     }}
//                   />
//                 )
//               );
//             })}
//           </div>
//           {errorMessage(errors?.scope)}
//         </div> */}
//         <button onClick={onCreateClient}>
//           {clientData?.id === 0 ? "Criar" : "Editar"}
//         </button>
//       </div>
//     </Modal>
//   );
// };

export const ResourceItem = ({
  resource,
  resources,
  baseResource,
  clientResources,
  onUpdate,
  onDelete,
}: ResourceItemProps) => {
  const [showResourcesOptions, toggleResourcesOptions] =
    useState<boolean>(false);
  const [showScopesOption, toggleScopesOptions] = useState<boolean>(false);
  const resourceSelector = useRef<HTMLDivElement>(null);
  const scopesSelector = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.addEventListener("mousedown", (e: any) => {
      if (
        resourceSelector.current &&
        !resourceSelector.current.contains(e.target as Node)
      ) {
        toggleResourcesOptions(false);
      }
      if (
        scopesSelector.current &&
        !scopesSelector.current.contains(e.target as Node)
      ) {
        toggleScopesOptions(false);
      }
    });
  }, []);

  return (
    <div className="resource-item">
      <div ref={resourceSelector} className="selector-container">
        <label>Resource</label>
        <div className="name-selector selector">
          <span
            className={`selected-resource ${
              showResourcesOptions ? "selected" : ""
            }`}
            onClick={() => toggleResourcesOptions(!showResourcesOptions)}
          >
            {resource.name ? resource.name : "--Select Resource--"}
          </span>
          {showResourcesOptions && (
            <div className="options">
              <label
                className={`resource-option option`}
                onClick={() => {
                  let resourceCopy = { ...resource };
                  resourceCopy = baseResource;
                  resourceCopy.scopes = [];
                  toggleScopesOptions(false);
                  onUpdate(resourceCopy);
                }}
              >
                --Select Resource--
              </label>
              {resources
                ?.filter(
                  (x) =>
                    !clientResources
                      .map((x) => x.resource_id)
                      .includes(x.resource_id)
                )
                .map((x) => (
                  <label
                    key={x.resource_id}
                    className={`resource-option option ${
                      resource.resource_id === x.resource_id ? "selected" : ""
                    }`}
                    onClick={() => {
                      let resourceCopy = { ...resource };
                      if (resourceCopy.resource_id === x.resource_id) {
                        resourceCopy = baseResource;
                        toggleScopesOptions(false);
                      } else {
                        resourceCopy = { ...x };
                      }
                      resourceCopy.scopes = [];
                      onUpdate(resourceCopy);
                    }}
                  >
                    {x.name}
                  </label>
                ))}
            </div>
          )}
        </div>
      </div>
      <div ref={scopesSelector} className="selector-container">
        <label>Scopes</label>
        <div className="scopes-selector selector">
          <span
            className={`selected-scopes ${showScopesOption ? "selected" : ""}`}
            onClick={() =>
              resource.resource_id && toggleScopesOptions(!showScopesOption)
            }
          >
            {resource.scopes?.length} Selected
          </span>
          {showScopesOption && (
            <div className="options">
              <label
                className={`scope-option option`}
                onClick={() => {
                  let resourceCopy = { ...resource };
                  resourceCopy.scopes = [];
                  onUpdate(resourceCopy);
                }}
              >
                --Select Scope--
              </label>
              {resources
                ?.filter((x) => x.resource_id === resource.resource_id)[0]
                ?.scopes?.map((x) => (
                  <div
                    key={x.name}
                    className={`scope-option option ${
                      resource.scopes
                        ?.map((x) => x.resource_scopes_id)
                        .includes(x.resource_scopes_id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => {
                      let resourceCopy = { ...resource };
                      if (
                        resourceCopy.scopes
                          ?.map((x) => x.resource_scopes_id)
                          .includes(x.resource_scopes_id)
                      ) {
                        resourceCopy.scopes = resource.scopes?.filter(
                          (y) => y.resource_scopes_id !== x.resource_scopes_id
                        );
                      } else {
                        resourceCopy.scopes?.push(x);
                      }
                      onUpdate(resourceCopy);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="me-2"
                      checked={resource.scopes
                        ?.map((x) => x.resource_scopes_id)
                        .includes(x.resource_scopes_id)}
                    />
                    <label>{x.label}</label>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <DeleteIcon className="delete-btn" onClick={() => onDelete(resource)} />
      </div>
    </div>
  );
};
// function nanoid(): any {
//   throw new Error("Function not implemented.");
// }

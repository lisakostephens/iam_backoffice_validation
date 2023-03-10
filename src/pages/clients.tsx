import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import {
  Client,
  ListClient,
} from "../../infrastructure/interfaces/services/clients";
import { Table } from "../components/Table";
import AddClientModal from "../components/Clients/AddClientModal";
import ClientDataModal from "../components/Clients/ClientDataModal";
import EditClientModal from "../components/Clients/EditClientModal";

export default function Clients() {
  const baseClient: Client = {
    id: 0,
    principal: "cats123@gmail.com",
    is_active: true,
    type: "",
    resources: [],
  };

  const catClient: Client = {
    id: 1,
    principal: "dogs321@yahoo.ca",
    is_active: true,
    type: "animal",
    resources: [],
  };

  const [counter, setCounter] = useState(2);

  // increase counter
  function increase() {
    const increase = setCounter((count) => count + 1);
  }

  var clientArray = [baseClient, catClient];
  const baseClients: ListClient = {
    data: clientArray,
    count: clientArray.length,
  };

  const [clientData, setClientData] = useState<Client | null>(null);
  const [clients, setClients] = useState<null | ListClient>(baseClients);

  const onDeleteClient = (e: any, client: Client) => {
    let oldClients = clients?.data;
    let newClients = oldClients?.filter(function (item) {
      return item.id != client.id;
    });

    let newListClients: ListClient = {
      data: newClients ? newClients : [baseClient],
      count: newClients ? newClients.length : 0,
    };

    setClients(newListClients);
  };

  const onCreateClient = (e: any, client: Client) => {
    const newClient: Client = {
      id: counter,
      principal: e.principal,
      is_active: true,
      type: "animal",
      resources: [],
    };
    increase();
    let clientsList = clients?.data;
    if (clientsList) {
      clientsList.push(newClient);
    } else {
      clientsList = [newClient];
    }
    let newBaseClients: ListClient = {
      data: clientsList,
      count: clientsList.length,
    };
    setClients(newBaseClients);
    console.log(clients);
  };

  function onEditClient(client: Client) {
    let clientsArray = clients?.data;
    let newList = [...clientsArray!].map((item) => {
      if (item.id == client.id) {
        return client;
      }
      return item;
    });

    console.log(newList);

    let newClientList: ListClient = {
      data: newList,
      count: newList.length,
    };

    setClients(newClientList);
    console.log(newClientList);
  }

  return (
    <div className="clients content">
      <div className="box w-100">
        <div className="content-header w-100 d-flex flex-row justify-content-between mb-2">
          <h1>Clients</h1>
        </div>
        <div className="d-flex flex-row justify-content-between py-4">
          <AddClientModal onCreateClient={onCreateClient} />
        </div>
        {/* <Table
          data={clients?.data}
          header={[
            {
              title: "Principal",
              className: "principal",
            },
            {
              content: (
                <div className="d-flex align-items-center gap-3">Actions</div>
              ),
              className: "actions",
            },
          ]}
          customRow={(client: Client) => (
            <tr>
              <td>{client.principal}</td>
              <td>
                <div className="row-actions d-flex flex-row">
                  {/* <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded mr-2 small-btn"
                    onClick={(e) => {
                      switchClientModal();
                    }}
                  /> */}
        {/* <EditClientModal
                    onEditClient={onEditClient}
                    principal={client.principal}
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
        /> */}

        <table className="client-list">
          <thead>
            <tr>
              <th>Principal</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients?.data.map((item, index) => (
              <tr key={index} className="list-item">
                <td>{item.principal}</td>
                <td>
                  <EditClientModal
                    onEditClient={onEditClient}
                    id={item.id}
                    principal={item.principal}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger ms-2 small-btn"
                    onClick={(e) => onDeleteClient(e, item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function nanoid(): any {
  throw new Error("Function not implemented.");
}

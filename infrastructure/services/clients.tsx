import axios from "axios";
import { Client, ListClient, Role } from "../interfaces/services/clients";
import { ListResourceScope } from "../interfaces/services/resources";

export class ClientsService {
  defaultURL = `${process.env.NEXT_PUBLIC_API_URL as string}/api/v1/client`;

  list = async () => {
    const response = await axios.get(this.defaultURL + "/");
    const clients: ListClient = response.data;

    return clients;
  };

  createClient = async (principal: string) => {
    const body = { principal: principal, client_type: "client" };

    const response = await axios.post(this.defaultURL + "/", body);
    const client: Client = response.data;

    return client;
  };

  listScopes = async (clientID: number) => {
    const response = await axios.get(`${this.defaultURL}/${clientID}/scopes`);
    const clientScopes: ListResourceScope = response.data;

    return clientScopes;
  };

  delete = async (clientID: number) => {
    const response = await axios.delete(`${this.defaultURL}/${clientID}`);
    const isClientDeleted: boolean = response.data;

    return isClientDeleted;
  };

  createRole = async (clientID: number, scopeID: number) => {
    const body: Role = { client_id: clientID, resource_scope_id: scopeID };
    const response: Role = await (
      await axios.post(`${this.defaultURL}/role`, body)
    ).data;

    return response;
  };

  deleteRole = async (clientID: number, scopeID: number) => {
    const response: boolean = await (
      await axios.delete(`${this.defaultURL}/${clientID}/role/${scopeID}`)
    ).data;

    return response;
  };
}

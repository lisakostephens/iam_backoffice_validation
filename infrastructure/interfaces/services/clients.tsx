import { Resource } from "./resources";

export interface Client {
  id: number;
  principal: string;
  is_active: boolean;
  type: string;
  resources?: Resource[];
}

export interface ListClient {
  data: Client[];
  count: number;
}

export interface Role {
  client_id: number;
  resource_scope_id: number;
}

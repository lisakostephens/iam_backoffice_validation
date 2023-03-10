import axios from "axios";
import {
  ListResourceData,
  ResourceScope,
} from "../interfaces/services/resources";
import { ResourceData } from "../interfaces/pages/resources";

export class ResourceService {
  baseUrl = `${process.env.NEXT_PUBLIC_API_URL as string}/api/v1/resources`;

  list = async () => {
    const response: ListResourceData = await (
      await axios.get(`${this.baseUrl}/`, {})
    ).data;

    return response.data;
  };

  getResourceScopes = async (resourceID: number) => {
    const response: ResourceScope[] = await (
      await axios.get(`${this.baseUrl}/${resourceID}/scope`)
    ).data;

    return response;
  };

  create = async (body: ResourceData) => {
    const response: ResourceData = await (
      await axios.post(this.baseUrl + "/", body)
    ).data;

    return response;
  };

  delete = async (resourceID: number) => {
    const response: boolean = await (
      await axios.delete(`${this.baseUrl}/${resourceID}`)
    ).data;

    return response;
  };

  deleteMultiple = async (resourcesID: number[]) => {
    const response: boolean = await (
      await axios.post(`${this.baseUrl}/delete-multiple`, resourcesID)
    ).data;

    return response;
  };

  update = async (resourceID: number, body: ResourceData) => {
    const response: ResourceData = await (
      await axios.put(`${this.baseUrl}/${resourceID}`, body)
    ).data;

    return response;
  };
}

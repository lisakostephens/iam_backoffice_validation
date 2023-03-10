import axios from 'axios';
import { ServiceAccount, ServiceAccountCredentials } from '../interfaces/services/services';

export class ServiceAccountsService {
    baseUrl = `${(process.env.NEXT_PUBLIC_API_URL as string)}/api/v1/services`;
    
    list = async () => {
        const response: any = await (await axios.get(`${this.baseUrl}/`, {})).data;
        const serviceAccounts: ServiceAccount[] = response.data;
        
        return serviceAccounts;
    }

    create = async (serviceAccount: ServiceAccount) => {
        const response: ServiceAccount = await (await axios.post(`${this.baseUrl}/`, serviceAccount)).data;
        
        return response;
    }

    getCredentials = async (name: string) => {
        const response: ServiceAccountCredentials = await (await axios.get(`${this.baseUrl}/${name}/credentials`)).data;
        
        return response;
    }

    delete = async (name: string) => {
        const response: boolean = await (await axios.delete(`${this.baseUrl}/${name}`)).data;
        
        return response;
    }

    deleteMultiple = async (names: string[]) => {
        const response: boolean = await (await axios.post(`${this.baseUrl}/delete-multiple`, names)).data;
        
        return response;
    }

    update = async (service_account_id: number, serviceAccount: ServiceAccount) => {
        const response: ServiceAccount = await (await axios.put(`${this.baseUrl}/${service_account_id}`, serviceAccount)).data;
        
        return response;
    }
}
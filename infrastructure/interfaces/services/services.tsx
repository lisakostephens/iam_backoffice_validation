export interface ServiceAccount {
    service_account_id?: number;
    name: string;
    display_name: string;
    description: string;
    client_id?: string;
    client_secret?: string;
}

export interface ServiceAccountCredentials {
    credentials: string;
}
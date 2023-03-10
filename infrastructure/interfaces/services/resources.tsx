export interface Resource {
    resource_id?: number;
    name: string;
    description: string;
    scopes?: ResourceScope[]
}

export interface ListResourceData {
    data: Resource[];
    count: number;
}

export interface ResourceScope {
    resource_scopes_id?: number;
    label: string;
    name: string;
    description: string;
    resource_id: number;
}

export interface ListResourceScope {
    data: ResourceScope[];
    count: number;
}

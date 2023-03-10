
 

import { InputText } from "primereact/inputtext";
import {  ResourceProps } from "../infrastructure/interfaces/pages/resources";
import { ColumnProps } from "../infrastructure/interfaces/components/datatable";
import EditResourceModal from "../src/components/EditResourceModal";
import { Show } from "../src/components/Show";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { ResourceActions } from "../src/components/ResourceActions";
import { Resource } from "../infrastructure/interfaces/services/resources";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";

export function ResourceContent(props: ResourceProps) {
    const dynamicColumns = props.columns.map((col: ColumnProps) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <div className='content'>
            <div className="page resources">
                <div className="box">
                    <section className="content-header">
                        <h1> Resources </h1>

                        <span className="p-input-icon-left">
                            <i className="pi pi-search" placeholder="Search..." />
                            <InputText type="search" onInput={(e) => props.setFilters({
                            global: {value: (e as any).target.value, matchMode: FilterMatchMode.CONTAINS},
                        })}/>
                        </span>
                    </section>

                    <DataTable 
                        value={props.resources}
                        dataKey="resource_id"
                        size="large"
                        filters={props.filters}
                        paginator
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        rows={10} rowsPerPageOptions={[5,10,15]}
                        scrollable={true}
                        scrollHeight="72vh"
                        selection={props.selectedResources} 
                        onSelectionChange={e => props.updateSelectedResources(e.value)} 
                    >
                        <Column selectionMode="multiple" />
                        {dynamicColumns}
                        <Column field='actions' exportable={false} style={{ minWidth: '8rem' }} 
                            header={() => (
                                <div className="d-flex align-items-center gap-2">
                                    Actions
                                    <Show when={props.selectedResources.length > 0}>
                                        <>
                                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger ms-5 small-btn" onClick={() => props.toggleShowConfirmDeleteMultiple(true)} /> 
                                            Delete multiple
                                        </>
                                    </Show>
                                </div>
                            )}
                            body={(resource: Resource) => 
                                <ResourceActions 
                                    resource={resource} 
                                    onDeleteResource={props.onDeleteResource} 
                                    onEditResource={props.onEditResource}                                
                                />
                            }
                        />
                    </DataTable> 
                </div>
                        
                <button className="show-add-resource" onClick={() => props.toggleShowAddServiceAccountModal(true)}> Create Resource </button>
                <Show when={ props.showAddModal }>
                    <EditResourceModal
                        toggleShow={props.toggleShowAddServiceAccountModal}
                        onCreateResource={props.onCreateResource}
                    /> 
                </Show>
                <ConfirmDialog 
                    visible={ props.showConfirmDeleteMultiple} 
                    onHide={() => props.toggleShowConfirmDeleteMultiple(false)} 
                    message={`Are you sure you want to delete multiple resources`}
                    header="Confirmation" 
                    icon="pi pi-exclamation-triangle" 
                    accept={() => props.onDeleteMultiple()} 
                    reject={() => props.toggleShowConfirmDeleteMultiple(false)} 
                    acceptClassName="p-button p-component p-confirm-dialog-reject p-button-text"
                    rejectClassName="p-button p-component p-confirm-dialog-accept"
                />
            </div>
        </div>
    )
}
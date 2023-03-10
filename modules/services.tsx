import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { ServicesProps } from "../infrastructure/interfaces/pages/services";
import { ServiceAccount } from "../infrastructure/interfaces/services/services";
import { EditServiceAccountModal } from "../src/components/EditServiceAccount";
import { ServiceAccountActions } from "../src/components/ServiceAccountActions";
import { Show } from "../src/components/Show";

export const ServiceContent = (props: ServicesProps) => (
    <div className='content service-accounts'>
        <div className='box'>
            <section className="content-header">
                <h1> Service Accounts </h1>

                <span className="p-input-icon-left">
                    <i className="pi pi-search" placeholder="Search..." />
                    <InputText type="search" onInput={(e) => props.setFilters({
                        global: {value: (e as any).target.value, matchMode: FilterMatchMode.CONTAINS},
                    })}/>
                </span>
            </section>

            <Show when={ props.serviceAccounts.length > 0 }>
                <DataTable 
                    value={props.serviceAccounts}
                    filters={props.filters}
                    paginator
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rows={5} 
                    rowsPerPageOptions={[5,10,15]}   
                    scrollable={true}
                    scrollHeight="75vh"
                    selection={props.selectedServiceAccounts} 
                    onSelectionChange={e => props.updateSelectedServerAccounts(e.value)} 
                    dataKey="service_account_id"
                >
                    <Column selectionMode="multiple"></Column>
                    <Column bodyClassName='name' field="name" key="name" header="Name" />
                    <Column bodyClassName='display-name' field="display_name" key="display_name" header="Display Name" />
                    <Column bodyClassName='description' field="description" key="description" header="Description" />
                    <Column field='actions' key='actions' 
                        header={() => (
                            <div className="d-flex align-items-center gap-2">
                                Actions
                                <Show when={props.selectedServiceAccounts.length > 0}>
                                    <>
                                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger ms-5 small-btn" onClick={() => props.toggleShowConfirmDeleteMultiple(true)} /> 
                                        delete multiple
                                    </>
                                </Show>
                            </div>
                        )}
                        body={(serviceAccount: ServiceAccount) => (
                            <ServiceAccountActions 
                                serviceAccount={serviceAccount} 
                                onDelete={props.onDelete}
                            />
                        )} 
                    />
                </DataTable>
            </Show>
        </div>

        <button className="show-add-service" onClick={() => props.toggleShowAddServiceAccountModal(true)}> Create Service Account </button>
        <Show when={ props.showAddServiceAccountModal }>
            <EditServiceAccountModal
                toggleShow={() => props.toggleShowAddServiceAccountModal(false)}
                onCreate={props.onCreate}
            />
        </Show>

        <ConfirmDialog 
            visible={ props.showConfirmDeleteMultiple} 
            onHide={() => props.toggleShowConfirmDeleteMultiple(false)} 
            message={`Are you sure you want to delete multiple service accounts`}
            header="Confirmation" 
            icon="pi pi-exclamation-triangle" 
            accept={() => props.onDeleteMultiple()} 
            reject={() => props.toggleShowConfirmDeleteMultiple(false)} 
            acceptClassName="p-button p-component p-confirm-dialog-reject p-button-text"
            rejectClassName="p-button p-component p-confirm-dialog-accept"
        />
    </div>
)
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import {
  ClientData,
  ClientsContentProps,
} from "../infrastructure/interfaces/pages/clients";
import { ClientCard } from "../src/components/ClientCard";
import EditClientModal from "../src/components/EditClientModal";
import { Show } from "../src/components/Show";
import { Button } from "primereact/button";

export const ClientsContent = (props: ClientsContentProps) => (
  <div className="content clients">
    <div className="box">
      <section className="content-header">
        <h1> Clients </h1>

        <span className="p-input-icon-left">
          <i className="pi pi-search" placeholder="Search..." />
          <InputText
            type="search"
            onInput={(e) =>
              props.setFilters({
                global: {
                  value: (e as any).target.value,
                  matchMode: FilterMatchMode.CONTAINS,
                },
              })
            }
          />
        </span>
      </section>

      {props.clientsData && (
        <DataTable
          value={props.clientsData}
          filters={props.filters}
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          scrollable={true}
          scrollHeight="70vh"
          selection={props.selectedClientsData}
          onSelectionChange={(e) => props.updateSelectedClientsData(e.value)}
          dataKey="client.id"
          paginatorLeft={
            <div className="d-flex align-items-center gap-2">
              <Button
                disabled={props.selectedClientsData.length == 0}
                icon="pi pi-trash"
                className="p-button-rounded p-button-warning p-button-outlined ms-1"
                onClick={() => props.onDeleteMultiple()}
              />
              delete selected
            </div>
          }
        >
          <Column
            selectionMode="multiple"
            style={{ flex: "0 0" }}
            headerStyle={{ flex: "0 0" }}
          />
          <Column
            field="client.principal"
            style={{ flex: "1 0" }}
            body={(clientData: ClientData) => (
              <ClientCard
                clientData={clientData}
                onDeleteClient={props.onDeleteClient}
                onEditClient={props.onEditClient}
              />
            )}
          />
        </DataTable>
      )}
    </div>

    <button
      className="show-add-client"
      onClick={() => props.toogleShowNewClientModal(true)}
    >
      {" "}
      Add Client{" "}
    </button>
    <Show when={props.showNewClientModal}>
      <EditClientModal
        toggleShow={props.toogleShowNewClientModal}
        onCreateClient={props.onCreateClient}
      />
    </Show>
  </div>
);

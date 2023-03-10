import React, { useState } from "react";
import ClientDataModal from "./ClientDataModal";
import { ClientProps } from "../../../infrastructure/interfaces/pages/clients";
import { Button } from "primereact/button";

// creating a new modal component specifically for editing existing clients
// Opens the edit client modal.

export default function EditClientModal(props: ClientProps) {
  const [clientModal, setClientModal] = useState(false);
  function switchClientModal() {
    setClientModal(!clientModal);
  }

  // all client attributes
  const [principal, setPrincipal] = React.useState(props.principal);
  const [id, setId] = React.useState(props.id);

  const handlePrincipalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrincipal(event.target.value);
  };

  function onEditClient() {
    console.log("being edited");
    props.onEditClient && props.onEditClient({ principal, id });
  }

  //   function switchClientModal() {
  //     props.switchClientModal && props.switchClientModal();
  //   }

  return (
    <>
      {/* <button
        onClick={switchClientModal}
        className="p-button-rounded mr-2 small-btn"
      >
        Edit User
      </button>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded mr-2 small-btn"
        onClick={switchClientModal}
      /> */}
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded ms-2 small-btn"
        onClick={(e) => {
          switchClientModal();
        }}
      />
      {/* <button onClick={switchClientModal} className="btn-client-modal">
        Edit User
      </button> */}

      {clientModal && (
        <ClientDataModal
          id={id}
          principal={principal}
          handlePrincipalChange={handlePrincipalChange}
          switchClientModal={switchClientModal}
          onEditClient={onEditClient}
        />
      )}
    </>
  );
}

import React, { useState } from "react";
import { ClientProps } from "../../../infrastructure/interfaces/pages/clients";
import Clients from "../../pages/clients";
import ClientDataModal from "./ClientDataModal";

// creating a new modal component specifically for adding clients.
// Opens the add new client modal.
export default function AddClientModal(props: ClientProps) {
  const [clientModal, setClientModal] = useState(false);
  function switchClientModal() {
    console.log();
    setClientModal(!clientModal);
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;

  const [validEmail, setValidEmail] = useState(false);

  // all client attributes
  const [principal, setPrincipal] = React.useState("");

  // all form changes
  const handlePrincipalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrincipal(event.target.value);
  };

  function onEditClient() {
    props.onEditClient && props.onEditClient({ principal });
  }

  function onCreateClient() {
    if (regex.test(principal)) {
      props.onCreateClient && props.onCreateClient({ principal });
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  // reset the form
  function resetForm() {
    setPrincipal("");
  }

  return (
    <>
      <button onClick={switchClientModal} className="add-client-btn">
        Add Client
        <img className="plus-sign" src="/assets/icons/plus.svg"></img>
      </button>
      {clientModal && (
        <ClientDataModal
          principal={principal}
          handlePrincipalChange={handlePrincipalChange}
          switchClientModal={switchClientModal}
          onCreateClient={onCreateClient}
          resetForm={resetForm}
          onEditClient={onEditClient}
        />
      )}
    </>
  );
}

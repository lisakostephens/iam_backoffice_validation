import React, { useState } from "react";
import { ClientProps } from "../../../infrastructure/interfaces/pages/clients";

export default function ClientDataModal(props: ClientProps) {
  const regex = /^[A-Z0-9._-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;

  const [hasPrincipal, setHasPrincipal] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  function showHasPrincipalWarning() {
    if (hasPrincipal) {
      return <label className="warning-label"> Name cannot be empty </label>;
    }
  }

  function showIsEmailWarning() {
    if (isEmail) {
      return (
        <label className="warning-label"> Must be a valid email address </label>
      );
    }
  }

  return (
    <div className="modal-background">
      <div className="overlay"></div>
      <div className="client-modal-content">
        <h2>{props.id != undefined ? "Edit Client" : "Add Client"}</h2>
        <div>
          <div>
            <label className="fillable-form">
              <br></br>
              Name:
              <br></br>
              <input
                type="text"
                value={props.principal}
                placeholder="Principal"
                onChange={(e) =>
                  props.handlePrincipalChange && props.handlePrincipalChange(e)
                }
              />
            </label>
            <div className="w3-container w3-section w3-red w3-card-2">
              {showHasPrincipalWarning()}
              <br></br>
              {showIsEmailWarning()}
              <br></br>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              props.principal!.length != 0 &&
                props.onCreateClient &&
                props.onCreateClient();
              regex.test(props.principal!) &&
                props.principal!.length != 0 &&
                props.switchClientModal &&
                props.switchClientModal();
              props.principal!.length != 0 &&
                props.id &&
                props.onEditClient &&
                props.onEditClient();
              regex.test(props.principal!) &&
                props.principal!.length != 0 &&
                regex.test(props.principal!) &&
                props.resetForm &&
                props.resetForm();
              if (regex.test(props.principal!) == false) {
                setIsEmail(true);
              } else {
                setIsEmail(false);
              }
              if (props.principal!.length == 0) {
                setHasPrincipal(true);
              } else {
                setHasPrincipal(false);
              }
            }}

            // onClick={() => {
            //   if (props.principal!.length != 0 && regex.test(props.principal!)) {

            //   }
            // }}
          >
            Salvar
          </button>
        </div>
        <button
          className="close-client-modal"
          onClick={() => props.switchClientModal && props.switchClientModal()}
        >
          Close
        </button>
      </div>
    </div>
  );
}

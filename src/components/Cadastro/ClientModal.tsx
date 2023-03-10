import React from "react";
import { CadastroProps } from "../../../infrastructure/interfaces/pages/cadastro";

export default function ClientModal(props: CadastroProps) {
  return (
    <div className="client-modal">
      <div className="overlay"></div>
      <div className="client-modal-content">
        {/* inside modal */}
        <h2>Add new client</h2>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={props.name}
              onChange={(e) =>
                props.handleNameChange && props.handleNameChange(e)
              }
            />
          </label>
          <br></br>
          <label>
            CPF:
            <input
              type="text"
              value={props.cpf}
              onChange={(e) =>
                props.handleCpfChange && props.handleCpfChange(e)
              }
            />
          </label>
          <br></br>
          <label>
            Email:
            <input
              type="text"
              value={props.email}
              onChange={(e) =>
                props.handleEmailChange && props.handleEmailChange(e)
              }
            />
          </label>
          <br></br>
          <label>
            Empresa:
            <input
              type="text"
              value={props.empresa}
              onChange={(e) =>
                props.handleEmpresaChange && props.handleEmpresaChange(e)
              }
            />
          </label>
          <br></br>
          <label>
            CNPJ:
            <input
              type="text"
              value={props.cnpj}
              onChange={(e) =>
                props.handleCnpjChange && props.handleCnpjChange(e)
              }
            />
          </label>
          <br></br>
          <label>
            Nivel:
            <input
              type="text"
              value={props.nivel}
              onChange={(e) =>
                props.handleNivelChange && props.handleNivelChange(e)
              }
            />
          </label>
          <button
            type="button"
            onClick={() => {
              props.handleAdd && props.handleAdd();
              props.id && props.editElement && props.editElement();
              props.toggleClientModal && props.toggleClientModal();
              props.resetForm && props.resetForm();
            }}
          >
            Salvar
          </button>
        </div>
        <button
          className="close-client-modal"
          onClick={() => props.toggleClientModal && props.toggleClientModal()}
        >
          Close
        </button>
      </div>
    </div>
  );
}

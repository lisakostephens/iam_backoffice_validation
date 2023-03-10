import React, { useState } from "react";
import { CadastroProps } from "../../../infrastructure/interfaces/pages/cadastro";
import ClientModal from "./ClientModal";

// creating a new modal component specifically for editing existing clients
// Opens the edit client modal.

export default function EditClientModal(props: CadastroProps) {
  const [clientModal, setClientModal] = useState(false);
  function toggleClientModal() {
    setClientModal(!clientModal);
  }

  // all client attributes
  const [id, setId] = React.useState(props.id);
  const [name, setName] = React.useState(props.name);
  const [cpf, setCpf] = React.useState(props.cpf);
  const [email, setEmail] = React.useState(props.email);
  const [empresa, setEmpresa] = React.useState(props.empresa);
  const [cnpj, setCnpj] = React.useState(props.cnpj);
  const [nivel, setNivel] = React.useState(props.nivel);

  // all form changes
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleEmpresaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmpresa(event.target.value);
  };
  const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCnpj(event.target.value);
  };
  const handleNivelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNivel(event.target.value);
  };

  function editElement() {
    props.editElement &&
      props.editElement({ id, name, cpf, email, empresa, cnpj, nivel });
  }

  function handleAdd() {
    props.handleAdd &&
      props.handleAdd({ name, cpf, email, empresa, cnpj, nivel });
  }

  return (
    <>
      <button onClick={toggleClientModal} className="btn-client-modal">
        Edit User
      </button>
      {/* shortcircuit operator, if clientModal is true, opens modal */}
      {clientModal && (
        <ClientModal
          id={id}
          name={name}
          cpf={cpf}
          email={email}
          empresa={empresa}
          cnpj={cnpj}
          nivel={nivel}
          handleNameChange={handleNameChange}
          handleCpfChange={handleCpfChange}
          handleEmailChange={handleEmailChange}
          handleEmpresaChange={handleEmpresaChange}
          handleCnpjChange={handleCnpjChange}
          handleNivelChange={handleNivelChange}
          toggleClientModal={toggleClientModal}
          editElement={editElement}
        />
      )}
    </>
  );
}

import React, { useState } from "react";
import { CadastroProps } from "../../../infrastructure/interfaces/pages/cadastro";
import ClientModal from "./ClientModal";

// creating a new modal component specifically for adding clients.
// Opens the add new client modal.
export default function AddClientModal(props: CadastroProps) {
  const [clientModal, setClientModal] = useState(false);
  function toggleClientModal() {
    setClientModal(!clientModal);
  }

  // all client attributes
  const [name, setName] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [empresa, setEmpresa] = React.useState("");
  const [cnpj, setCnpj] = React.useState("");
  const [nivel, setNivel] = React.useState("");

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
      props.editElement({ name, cpf, email, empresa, cnpj, nivel });
  }

  function handleAdd() {
    props.handleAdd &&
      props.handleAdd({ name, cpf, email, empresa, cnpj, nivel });
  }

  // reset the form
  function resetForm() {
    setName("");
    setCpf("");
    setEmail("");
    setEmpresa("");
    setCnpj("");
    setNivel("");
  }

  return (
    <>
      <ClientModal
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
        handleAdd={handleAdd}
        resetForm={resetForm}
        editElement={editElement}
      />
    </>
  );
}

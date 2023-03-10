import React, { useEffect, useState } from "react";
import { CadastroProps } from "../../infrastructure/interfaces/pages/cadastro";
import { EditProfileProps } from "../../infrastructure/interfaces/pages/cadastro";

// creating a new modal component specifically for editing the profile.
// I know there's another one that exists but its hard for me to figure out.
// Opens edit profile.
export default function EditProfileModal(props: EditProfileProps) {
  // shows the default profile, which is blank
  const [profileModal, setProfileModal] = useState(false);
  function toggleProfileModal() {
    setProfileModal(!profileModal);
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

  function handleEditProfile() {
    props.handleEditProfile({ name, cpf, email, empresa, cnpj, nivel });
  }

  return (
    <>
      <button onClick={toggleProfileModal}>Editar Perfil</button>
      {/* shortcut operator, if profileModal is true, opens modal */}
      {profileModal && (
        <div className="client-modal">
          <div className="overlay"></div>
          <div className="client-modal-content">
            {/* inside modal */}
            <h2>Editar Perfil</h2>
            <div className="client-form">
              <form>
                <label>
                  Name:
                  <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <br></br>
                <label>
                  CPF:
                  <input type="text" value={cpf} onChange={handleCpfChange} />
                </label>
                <br></br>
                <label>
                  Email:
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
                <br></br>
                <label>
                  Empresa:
                  <input
                    type="text"
                    value={empresa}
                    onChange={handleEmpresaChange}
                  />
                </label>
                <br></br>
                <label>
                  CNPJ:
                  <input type="text" value={cnpj} onChange={handleCnpjChange} />
                </label>
                <br></br>
                <label>
                  Nivel:
                  <input
                    type="text"
                    value={nivel}
                    onChange={handleNivelChange}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    handleEditProfile();
                    toggleProfileModal();
                  }}
                >
                  Salvar
                </button>
              </form>
            </div>
            <button className="close-client-modal" onClick={toggleProfileModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

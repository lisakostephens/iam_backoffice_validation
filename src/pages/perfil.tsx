import React from "react";
import EditProfileModal from "../components/EditProfileModal";

export default function Perfil() {
  // profile
  const initialPerfil = {
    name: "",
    cpf: "",
    email: "",
    empresa: "",
    cnpj: "",
    nivel: "",
  };

  const [perfil, setPerfil] = React.useState(initialPerfil);

  const handleEditProfile = (args: any) => {
    console.log(args.name);
    const newPerfil = args;
    setPerfil(newPerfil);
  };

  return (
    <div className="content">
      <div className="perfil-content-box">
        <h2 className="cadastro-titles">Perfil</h2>
        <h3 className="sub-cadastro-titles">Ola Caio Teixeira</h3>
        <div className="perfil-contents">
          <div>
            <img src="/assets/icons/person.svg" height={150}></img>
          </div>
          <div>
            <ul className="perfil-wrapper">
              <li className="perfil-list-item">
                Name:
                {perfil.name}
              </li>
              <li className="perfil-list-item">
                CPF:
                {perfil.cpf}
              </li>
              <li className="perfil-list-item">
                Email:
                {perfil.email}
              </li>
              <li className="perfil-list-item">
                Empresa:
                {perfil.empresa}
              </li>
              <li className="perfil-list-item">
                CNPJ:
                {perfil.cnpj}
              </li>
              <li className="perfil-list-item">
                Nivel:
                {perfil.nivel}
              </li>
            </ul>
          </div>
        </div>
        <EditProfileModal handleEditProfile={handleEditProfile} />
      </div>
    </div>
  );
}

import { DataTableFilterMeta } from "primereact/datatable";
import { Dispatch, SetStateAction } from "react";
import { ServiceAccount } from "../services/services";

// pass in the function where it adds a client to the list of existing clients
export interface CadastroProps {
  id?: string;
  name?: string;
  cpf?: string;
  email?: string;
  empresa?: string;
  cnpj?: string;
  nivel?: string;
  handleNameChange?: Function;
  handleCpfChange?: Function;
  handleEmailChange?: Function;
  handleEmpresaChange?: Function;
  handleCnpjChange?: Function;
  handleNivelChange?: Function;
  toggleClientModal?: Function;
  handleAdd?: Function;
  resetForm?: Function;
  editElement?: Function;
}

export interface EditProfileProps {
  handleEditProfile: Function;
}

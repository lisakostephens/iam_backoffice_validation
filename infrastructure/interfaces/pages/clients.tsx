export interface ClientProps {
  principal?: string;
  id?: number;
  handlePrincipalChange?: Function;
  switchClientModal?: Function;
  onCreateClient?: Function;
  resetForm?: Function;
  onEditClient?: Function;
}

export interface EditProfileProps {
  handleEditProfile: Function;
}

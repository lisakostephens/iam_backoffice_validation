import { useContext, useState } from "react";
import { EditServiceAccountModalContent } from "../../modules/components/edit-service-account-modal";
import { EditServiceAccountModalProps } from "../../infrastructure/interfaces/components/edit-service-account-modal";
import { ServiceAccount } from "../../infrastructure/interfaces/services/services";
import { ServiceAccountsService } from "../../infrastructure/services/service-accounts";
import { isValidEmailUserName } from "../../infrastructure/utils";
import { ToastContext } from "../../infrastructure/context";

export const EditServiceAccountModal = (props: EditServiceAccountModalProps) => {
    const initialServiceAccount: ServiceAccount = props.serviceAccount != undefined ? {...props.serviceAccount} : {
        client_id: '',
        client_secret: '',
        description: '',
        display_name: '',
        name: '',
    }

    const [serviceAccount, updateServiceAccount] = useState<ServiceAccount>(initialServiceAccount);
    const [showNameError, toggleShowNameError] = useState(false);

    const serviceAccountsService = new ServiceAccountsService();

    const showToast = useContext(ToastContext);

    const onUpdateName = (name: string) => {
        updateServiceAccount((prevState) => {
            prevState.name = name;

            return {...prevState}
        })
        toggleShowNameError(!isValidEmailUserName(name));
    }
    
    const onUpdateDisplayName = (displayName: string) => {
        updateServiceAccount((prevState) => {
            prevState.display_name = displayName;

            return {...prevState}
        })
    }

    const onUpdateDescription = (description: string) => {
        updateServiceAccount((prevState) => {
            prevState.description = description;

            return {...prevState}
        })
    }

    const onCreate = async () => {
        const newServiceAccount: ServiceAccount = await serviceAccountsService.create(serviceAccount);

        props.onCreate && props.onCreate(newServiceAccount);
        props.toggleShow(false);
        showToast("success", "Success", "Service account successfully created");
    };
    
    return (
        <EditServiceAccountModalContent 
            serviceAccount={serviceAccount}
            onSave={onCreate} 
            onUpdateName={onUpdateName} 
            onUpdateDisplayName={onUpdateDisplayName} 
            onUpdateDescription={onUpdateDescription} 
            toggleShow={props.toggleShow}    
            showNameError={showNameError}
        />
    )
}

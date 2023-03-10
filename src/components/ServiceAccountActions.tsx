import { useContext, useState } from "react";
import { ToastContext } from "../../infrastructure/context";
import { ServiceAccountActionsProps } from "../../infrastructure/interfaces/components/service-account-actions";
import { ServiceAccountsService } from "../../infrastructure/services/service-accounts";
import { downloadContent } from "../../infrastructure/utils";
import { ServiceAccountActionsContent } from "../../modules/components/service-accout-actions";

export const ServiceAccountActions = (props: ServiceAccountActionsProps) => {
    const [showEditModal, toggleEditModal] = useState(false);
    const [showDeleteModal, toggleShowDeleteModal] = useState(false);

    const serviceAccountsService = new ServiceAccountsService();
    const showToast = useContext(ToastContext);
    
    const onDelete = async () => {
        const isDeleted = await serviceAccountsService.delete(props.serviceAccount.name);
        if (!isDeleted) {
            return;
        }
        
        props.onDelete && props.onDelete(props.serviceAccount.service_account_id);
        showToast("success", "Success", "Service account successfully deleted")
    }

    const onDownloadCredentialsJson = async () => {
        const serviceAccountCredentials = await serviceAccountsService.getCredentials(props.serviceAccount.name);

        const credentialsJson = Buffer.from(serviceAccountCredentials.credentials, 'base64').toString();
        const dataStr = JSON.stringify(JSON.parse(credentialsJson), null, 2);
        
        downloadContent(dataStr, props.serviceAccount.name + "_credentials.json");
        showToast("success", "Success", "Service account credentials successfully downloaded")
    }

    return (
        <ServiceAccountActionsContent 
            serviceAccount={{...props.serviceAccount}}
            onDelete={onDelete}      
            showEditModal={showEditModal}
            toggleEditModal={toggleEditModal}
            showDeleteModal={showDeleteModal}
            toggleShowDeleteModal={toggleShowDeleteModal}
            onDownloadCredentialsJson={onDownloadCredentialsJson}
        />
    );
}

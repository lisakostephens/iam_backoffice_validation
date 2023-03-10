import { useContext, useState } from "react";
import { ToastContext } from "../../infrastructure/context";
import { ClientCardProps } from "../../infrastructure/interfaces/components/client-card";
import { ClientsService } from "../../infrastructure/services/clients";
import { ClientCardContent } from "../../modules/components/client-card";

export const ClientCard = (props: ClientCardProps) => {
    const [showEditModal, toggleShowEditModal] = useState(false);
    const [showDeleteConfimationModal, toggleShowDeleteConfimationModal] = useState(false);
    
    const showToast = useContext(ToastContext);    
    
    const onDeleteClient = async (clientID: number) => {
        const clientsService = new ClientsService();

        const isClientExcluded = await clientsService.delete(clientID);
        if (!isClientExcluded) {
            return;
        }

        props.onDeleteClient && props.onDeleteClient(clientID);
        showToast("success", "Success", "Client successfully deleted")
    }

    return (
        <ClientCardContent 
            clientData={ props.clientData }
            onDeleteClient={ onDeleteClient }
            toggleShowEditModal={ toggleShowEditModal }
            showEditModal={ showEditModal }
            onEditClient={ props.onEditClient }
            showDeleteConfimationModal={ showDeleteConfimationModal }
            toggleShowDeleteConfimationModal={ toggleShowDeleteConfimationModal }
        />
    );
}
import { FilterMatchMode } from "primereact/api";
import { DataTableFilterMeta } from "primereact/datatable";
import React, { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../infrastructure/context";
import { ServiceAccount } from "../../infrastructure/interfaces/services/services";
import { ServiceAccountsService } from "../../infrastructure/services/service-accounts";
import { ServiceContent } from "../../modules/services";

export default function ServiceAccounts() {
  const [serviceAccounts, updateServiceAccounts] = useState<ServiceAccount[]>(
    []
  );
  const [showAddServiceAccountModal, toggleShowAddServiceAccountModal] =
    useState<boolean>(false);
  const [showConfirmDeleteMultiple, toggleShowConfirmDeleteMultiple] =
    useState(false);
  const [selectedServiceAccounts, updateSelectedServerAccounts] = useState<
    ServiceAccount[]
  >([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const serviceAccountsService = new ServiceAccountsService();
  const showToast = useContext(ToastContext);

  useEffect(() => {
    getServiceAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getServiceAccounts = async () => {
    const services = await serviceAccountsService.list();
    updateServiceAccounts(services);
  };

  const onCreate = (serviceAccount: ServiceAccount) => {
    updateServiceAccounts((prevState) => [...prevState, serviceAccount]);
  };

  const onDelete = (service_account_id: number) => {
    updateServiceAccounts((prevState) => [
      ...prevState?.filter(
        (serviceAccount) =>
          serviceAccount.service_account_id != undefined &&
          serviceAccount.service_account_id != service_account_id
      ),
    ]);
    updateSelectedServerAccounts((prevState) => [
      ...prevState?.filter(
        (serviceAccount) =>
          serviceAccount.service_account_id != undefined &&
          serviceAccount.service_account_id != service_account_id
      ),
    ]);
  };

  const onDeleteMultiple = async () => {
    const selectedServiceAccountsNames = selectedServiceAccounts.map(
      (selectedServiceAccount) => selectedServiceAccount.name
    );
    const areDeleted = await serviceAccountsService.deleteMultiple(
      selectedServiceAccountsNames
    );
    if (!areDeleted) {
      return;
    }

    const selectedServiceAccountsID = selectedServiceAccounts.map(
      (selectedServiceAccount) => selectedServiceAccount.service_account_id
    );
    updateServiceAccounts((prevState) => [
      ...prevState?.filter(
        (serviceAccount) =>
          serviceAccount.service_account_id != undefined &&
          !selectedServiceAccountsID.includes(serviceAccount.service_account_id)
      ),
    ]);
    updateSelectedServerAccounts([]);

    showToast(
      "success",
      "Success",
      "Multiple service accounts successfully deleted"
    );
  };

  return (
      <ServiceContent
        setFilters={setFilters}
        serviceAccounts={serviceAccounts}
        filters={filters}
        toggleShowAddServiceAccountModal={toggleShowAddServiceAccountModal}
        showAddServiceAccountModal={showAddServiceAccountModal}
        onCreate={onCreate}
        onDelete={onDelete}
        onDeleteMultiple={onDeleteMultiple}
        selectedServiceAccounts={selectedServiceAccounts}
        updateSelectedServerAccounts={updateSelectedServerAccounts}
        showConfirmDeleteMultiple={showConfirmDeleteMultiple}
        toggleShowConfirmDeleteMultiple={toggleShowConfirmDeleteMultiple}
      />
  );
}

import { useContext, useEffect, useState } from "react";
import { Resource } from "../../infrastructure/interfaces/services/resources";
import { ResourceService } from "../../infrastructure/services/resources";
import { ResourceContent } from "../../modules/resources";
import { ColumnProps } from "../../infrastructure/interfaces/components/datatable";
import { DataTableFilterMeta } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { ToastContext } from "../../infrastructure/context";

export default function Resources() {
  const [resources, updateResources] = useState<Resource[]>([]);
  const [showAddModal, toggleShowAddServiceAccountModal] = useState(false);
  const [showConfirmDeleteMultiple, toggleShowConfirmDeleteMultiple] = useState(false);
  const [selectedResources, updateSelectedResources] = useState<Resource[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const resourceService = new ResourceService();
  const showToast = useContext(ToastContext);

  useEffect(() => {
    listResources();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns: ColumnProps[] = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
  ];

  const listResources = async () => {
    let guy = await resourceService.list()
    updateResources(guy);
  };

  const onEditResource = (updatedResource: Resource) => {
    updateResources((prevState) => {
      let _resourceData = prevState?.find(
        (prevResourceData) =>
          prevResourceData.resource_id == updatedResource.resource_id
      );
      if (_resourceData == undefined) {
        return [...prevState];
      }
      const index = prevState.indexOf(_resourceData);

      prevState[index] = _resourceData;

      return [...prevState];
    });
  };

  const onCreateResource = async (resource: Resource) => {
    updateResources((prevState) => [...prevState, resource]);
  };

  const onDeleteResource = async (resourceID: number) => {
    updateResources((prevState) => [
      ...prevState?.filter((_resource) => _resource.resource_id != resourceID),
    ]);
    updateSelectedResources((prevState) => [
      ...prevState?.filter((_resource) => _resource.resource_id != resourceID),
    ]);
  };

  const onDeleteMultiple = async () => {
    const selectedResourcesId = selectedResources.map(
      (selectedResources) => selectedResources.resource_id!
    );
    const areDeleted = await resourceService.deleteMultiple(
      selectedResourcesId
    );
    if (!areDeleted) {
      return;
    }

    updateResources((prevState) => [
      ...prevState?.filter(
        (resource) =>
          resource.resource_id != undefined &&
          !selectedResourcesId.includes(resource.resource_id)
      ),
    ]);
    updateSelectedResources([]);

    showToast("success", "Success", "Multiple Resources successfully deleted");
  };

  return (
    <>
    <ResourceContent
      resources={resources}
      columns={columns}
      onDeleteResource={onDeleteResource}
      showAddModal={showAddModal}
      toggleShowAddServiceAccountModal={toggleShowAddServiceAccountModal}
      filters={filters}
      setFilters={setFilters}
      onCreateResource={onCreateResource}
      onEditResource={onEditResource}
      selectedResources={selectedResources}
      updateSelectedResources={updateSelectedResources}
      onDeleteMultiple={onDeleteMultiple}
      showConfirmDeleteMultiple={showConfirmDeleteMultiple}
      toggleShowConfirmDeleteMultiple={toggleShowConfirmDeleteMultiple}
    />
    </>
  );
}

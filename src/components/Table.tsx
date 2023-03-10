import React, { useEffect, useState } from "react";
import LoadingIcon from "../../public/assets/icons/loading.svg";
import LeftIcon from "../../public/assets/icons/left-icon.svg";
import RightIcon from "../../public/assets/icons/right-icon.svg";

interface HeaderItem {
  className?: string;
  title?: string;
  content?: JSX.Element;
}

export const Table = ({
  header,
  data,
  customRow,
  onSelectItem,
  selectedItems,
}: {
  header: HeaderItem[];
  data: any[] | null | undefined;
  customRow: (e: any, index: number) => JSX.Element;
  onSelectItem?: Function;
  selectedItems?: any[];
}) => {
  const [offset, updateOffset] = useState(0);
  const [limit, updateLimit] = useState(5);

  useEffect(() => {
    updateOffset(0);
  }, [data]);

  const renderContent = () => {
    if (data) {
      if (data.length === 0) {
        return (
          <tr>
            <td>Nothing found</td>
          </tr>
        );
      } else {
        return (data || [])
          .slice(offset, offset + limit)
          .map((dataItem, index: number) => (
            <React.Fragment key={index}>
              {customRow(dataItem, index)}
            </React.Fragment>
          ));
      }
    }
  };

  return (
    <div className="data-table">
      <div className="data-table-content">
        <table className="w-100">
          <thead>
            <tr>
              {header.map(({ title, content, className }, index) => (
                <th key={"header_item_" + index} className={className || ""}>
                  {title}
                  {content}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderContent()}</tbody>
        </table>
      </div>
      <div className="data-table-menu">
        <div className="offsets d-flex flex-row align-items-center justify-content-center">
          <LeftIcon
            className="arrow"
            onClick={() => {
              if (offset > 0) {
                updateOffset(offset - limit);
                // onGetProjects({ limit: 10, offset: offset-10 });
              }
            }}
          />

          <ul className="d-flex flex-row justify-content-center align-items-center">
            {Array.from(
              Array(Math.ceil((data || []).length / limit)).keys()
            ).map((key) => (
              <li
                className={offset === key * limit ? "selected" : ""}
                key={key}
                onClick={() => {
                  updateOffset(key * limit);
                  // onGetProjects({ limit: 10, offset: key * 10 });
                }}
              >
                {key + 1}
              </li>
            ))}
          </ul>

          <RightIcon
            className="arrow"
            onClick={() => {
              console.log(Math.ceil((data || []).length / limit) * limit);
              if (
                offset <
                Math.ceil((data || []).length / limit) * limit - limit
              ) {
                console.log(offset + limit);
                updateOffset(offset + limit);
                //     onGetProjects({ limit: 10, offset: offset+10 });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

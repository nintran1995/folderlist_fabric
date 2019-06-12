import * as React from "react";
import {
  MarqueeSelection,
  DetailsList,
  IColumn,
  Selection,
  SelectionMode,
  DetailsListLayoutMode,
  Fabric,
  mergeStyleSets,
  IObjectWithKey,
  SelectionZone
} from "office-ui-fabric-react";
import { IDocument } from "../App";

interface IFolderItemsGridProps {
  items: any[];
  onOpenContextualMenu(e: any): void;
}
interface IFolderItemsGridState {
  columns: IColumn[];
  selectionDetails: string;
}

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px"
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden"
      }
    }
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px"
  },
  selectionDetails: {
    marginBottom: "20px",
    marginLeft: "20px"
  }
});

type Props = IFolderItemsGridProps;
export class FolderItemsGrid extends React.Component<
  Props,
  IFolderItemsGridState
> {
  private _selection: Selection;

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return (
          "1 item selected: " +
          (this._selection.getSelection()[0] as IDocument).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  constructor(props: Props) {
    super(props);

    const columns: IColumn[] = [
      {
        key: "column1",
        name: "File Type",
        className: classNames.fileIconCell,
        iconClassName: classNames.fileIconHeaderIcon,
        ariaLabel:
          "Column operations for File type, Press to sort on File type",
        iconName: "Page",
        isIconOnly: true,
        fieldName: "name",
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return (
            <img
              src={item.iconName}
              className={classNames.fileIconImg}
              alt={item.fileType + " file icon"}
            />
          );
        }
      },
      {
        key: "column2",
        name: "Name",
        fieldName: "name",
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true
      },
      {
        key: "column3",
        name: "Date Modified",
        fieldName: "dateModifiedValue",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: "number",
        onRender: (item: IDocument) => {
          return <span>{item.dateModified}</span>;
        },
        isPadded: true
      },
      {
        key: "column4",
        name: "Modified By",
        fieldName: "modifiedBy",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: "string",
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true
      },
      {
        key: "column5",
        name: "File Size",
        fieldName: "fileSizeRaw",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: "number",
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.fileSize}</span>;
        }
      }
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails()
        });
      }
    });

    this.state = {
      columns: columns,
      selectionDetails: this._getSelectionDetails()
    };
  }

  public render() {
    return (
      <Fabric>
        <div className={classNames.selectionDetails}>
          {this.state.selectionDetails}
        </div>
          <DetailsList
            items={this.props.items}
            columns={this.state.columns}
            selectionMode={SelectionMode.multiple}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            enterModalSelectionOnTouch={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            onItemContextMenu={this._onItemContextMenu}
          />
      </Fabric>
    );
  }

  private _onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    const { columns } = this.state;
    const { items } = this.props;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(
      currCol => column.key === currCol.key
    )[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      items,
      currColumn.fieldName!,
      currColumn.isSortedDescending
    );
    // this.props.items = newItems;
  };
  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _onItemContextMenu = (item: any, index: any, ev: any): boolean => {
    this.props.onOpenContextualMenu(ev);

    return false;
  };
}

function _copyAndSort<T>(
  items: T[],
  columnKey: string,
  isSortedDescending?: boolean
): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
    );
}

import * as React from "react";
import {
  List,
  Check,
  mergeStyleSets,
  IRawStyle,
  Fabric,
  Selection,
  SelectionZone,
  ISelection,
  SelectionMode
} from "office-ui-fabric-react";
import { IDocument } from "../App";

interface IFolderItemsProps {
  items: any[];
  onOpenContextualMenu(e: any): void;
}
interface IFolderItemsState {
  items: any[];
  selectionDetails: string;
  selection: ISelection;
  selectionMode: SelectionMode;
  canSelect: "all" | "vowels";
}

const commonStyles: IRawStyle = {
  display: "inline-block",
  cursor: "default",
  boxSizing: "border-box",
  verticalAlign: "top",
  background: "none",
  backgroundColor: "transparent",
  border: "none"
};
const classNames = mergeStyleSets({
  check: [
    commonStyles,
    {
      position: "absolute",
      zIndex: 10,
      padding: "6px",
      right: 0
    }
  ],
  selectionDetails: {
    marginBottom: "20px",
    marginLeft: "20px"
  }
});
const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 195;

type Props = IFolderItemsProps;
export class FolderItems extends React.Component<Props, IFolderItemsState> {
  private _hasMounted: boolean;

  constructor(props: Props) {
    super(props);

    this._hasMounted = false;

    this.state = {
      items: [],
      selection: new Selection({
        onSelectionChanged: this._onSelectionChanged
      }),
      selectionMode: SelectionMode.multiple,
      canSelect: "all",
      selectionDetails: this._getSelectionDetails()
    };
    this.state.selection.setItems(this.props.items, false);
  }

  private _getSelectionDetails(): string {
    const selectionCount = this.state
      ? this.state.selection.getSelectedCount()
      : 0;

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return (
          "1 item selected: " +
          (this.state.selection.getSelection()[0] as IDocument).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onSelectionChanged = (): void => {
    if (this._hasMounted) {
      this.setState({
        selectionDetails: this._getSelectionDetails(),
        items: [...this.state.items]
      });
    }
  };

  private _columnCount: any;
  private _columnWidth: any;
  private _rowHeight: any;

  private _getItemCountForPage = (itemIndex: any, surfaceRect: any): any => {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  };

  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  };

  private _onRenderCell = (item: any, index: any): JSX.Element => {
    const { selection } = this.state;

    let isSelected = false;

    if (selection && index !== undefined) {
      isSelected = selection.isIndexSelected(index);
    }
    return (
      <div
        className="folder-item-contain"
        style={{
          width: 100 / this._columnCount + "%"
        }}
        onContextMenu={e => {
          e.preventDefault();
          this.props.onOpenContextualMenu(e);
        }}
      >
        <div
          className="folder-content"
          data-selection-index={index}
          data-is-focusable={true}
        >
          <span
            className={
              isSelected
                ? "folder-content-check is-checked"
                : "folder-content-check"
            }
            data-is-focusable={true}
            data-selection-toggle={true}
          >
            <Check className={classNames.check} checked={isSelected} />
          </span>
          <div className="folder-content-sizer">
            <div className="folder-content-padder">
              <div
                className="folder-cover"
                onDoubleClick={() => {
                  alert("Open folder");
                }}
              >
                <i className="folder-cover-back">
                  <img src="https://spoprod-a.akamaihd.net/files/fabric/office-ui-fabric-react-assets/foldericons-fluent/folder-large_backplate.svg" />
                </i>
                {index % 2 != 0 ? (
                  <span className="folder-cover-blank">
                    <span className="folder-cover-frame">
                      <span style={{ width: "104px", height: "64px" }} />
                    </span>
                  </span>
                ) : null}
                <i className="folder-cover-front">
                  <img src="https://spoprod-a.akamaihd.net/files/fabric/office-ui-fabric-react-assets/foldericons-fluent/folder-large_frontplate_nopreview.svg" />
                </i>
                <span className="folder-content-child">
                  {index % 2 != 0 ? index : 0}
                </span>
              </div>
              <span className="folder-content-info">{item.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  public render() {
    const { selection } = this.state;
    return (
      <Fabric>
        <SelectionZone selection={selection}>
          <div>{this.state.selectionDetails}</div>
          <List
            className="folder-contain"
            items={this.state.items}
            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            renderedWindowsAhead={4}
            onRenderCell={this._onRenderCell}
          />
        </SelectionZone>
      </Fabric>
    );
  }

  public componentDidMount(): void {
    this._hasMounted = true;
    this.setState({ items: this.props.items });
  }
}

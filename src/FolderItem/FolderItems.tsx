import * as React from "react";
import {
  FocusZone,
  List,
  Check,
  mergeStyleSets,
  IRawStyle,
  Fabric
} from "office-ui-fabric-react";

interface IFolderItemsProps {
  items: any[];
  onSelect(item: any): void;
  onOpenContextualMenu(e: any): void;
}
interface IFolderItemsState {}

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
      cursor: "pointer",
      zIndex: 10,
      padding: "6px",
      right: 0
    }
  ]
});
const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 195;

type Props = IFolderItemsProps;
export class FolderItems extends React.Component<Props, IFolderItemsState> {
  constructor(props: Props) {
    super(props);
  }
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
    return (
      <div
        className="folder-item-contain"
        data-selection-index={index}
        data-is-focusable={true}
        style={{
          width: 100 / this._columnCount + "%"
        }}
        onContextMenu={e => {
          e.preventDefault();
          this.props.onOpenContextualMenu(e);
        }}
      >
        <div className="folder-content">
          <span
            className={
              item.check
                ? "folder-content-check is-checked"
                : "folder-content-check"
            }
            role="checkbox"
            aria-checked="true"
            onClick={() => {
              this.props.onSelect(item);
            }}
          >
            <Check className={classNames.check} checked={item.check} />
          </span>
          <div className="folder-content-sizer">
            <div className="folder-content-padder">
              <div className="folder-cover">
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

  private _onCheckboxChange = (ev: any, isChecked: any) => {
    console.log(`The option has been changed to ${isChecked}.`);
  };

  public render() {
    console.log(this.props.items);
    return (
      <FocusZone>
        <List
          className="folder-contain"
          items={this.props.items}
          getItemCountForPage={this._getItemCountForPage}
          getPageHeight={this._getPageHeight}
          renderedWindowsAhead={4}
          onRenderCell={this._onRenderCell}
        />
      </FocusZone>
    );
  }
}

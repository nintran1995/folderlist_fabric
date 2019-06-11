import React from "react";
import {
  FocusZone,
  List,
  mergeStyleSets,
  IRawStyle,
  ContextualMenuItemType,
  ContextualMenu,
  DirectionalHint,
  Check
} from "office-ui-fabric-react";
import "./App.css";

export interface IListGridExampleProps {
  items?: any[];
}

interface IListGridExampleStates {
  contextualMenuVisible: boolean;
}

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 195;

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

export class App extends React.Component<
  IListGridExampleProps,
  IListGridExampleStates
> {
  constructor(props: IListGridExampleProps) {
    super(props);
    this.state = { contextualMenuVisible: false };
  }
  private _columnCount: any;
  private _columnWidth: any;
  private _rowHeight: any;
  x: any;
  y: any;

  public render(): JSX.Element {
    return (
      <FocusZone>
        {this.state.contextualMenuVisible && (
          <ContextualMenu
            shouldFocusOnMount={true}
            directionalHint={DirectionalHint.bottomLeftEdge}
            gapSpace={10}
            onDismiss={() => {
              this.setState({ contextualMenuVisible: false });
            }}
            target={{ x: this.x, y: this.y }}
            items={[
              {
                key: "newItem",
                iconProps: {
                  iconName: "Add"
                },
                text: "New",
                onClick: () => {
                  alert("Add new");
                }
              },
              {
                key: "divider_1",
                itemType: ContextualMenuItemType.Divider
              },
              {
                key: "upload",
                iconProps: {
                  iconName: "Upload",
                  style: {
                    color: "salmon"
                  }
                },
                text: "Upload",
                title: "Upload a file"
              }
            ]}
          />
        )}
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

  _onCheckboxChange = (ev: any, isChecked: any) => {
    console.log(`The option has been changed to ${isChecked}.`);
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
          this.x = e.clientX;
          this.y = e.clientY;
          this.setState({ contextualMenuVisible: true });
        }}
      >
        <div className="folder-content">
          <span
            className="folder-content-check"
            role="checkbox"
            aria-checked="true"
            onClick={() => {
              console.log(item);
              item.check = true;
              this.forceUpdate();
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
              <span className="folder-content-info">{`item ${index}`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

import React from "react";
import {
  Fabric,
  TextField,
  CommandBar,
  ContextualMenuItemType,
  IContextualMenuItem
} from "office-ui-fabric-react";
import "./App.css";
import { FolderItems } from "./FolderItem/FolderItems";
import { FolderItemsGrid } from "./FolderItem/FolderItemsGrid";
import { FolderContextualMenu } from "./FolderItem/FolderContextualMenu";

export interface IListGridExampleProps {}
export interface IListGridExampleStates {
  isOpenContextualMenu: boolean;
  isGrid: boolean;
  items: IDocument[];
  selection?: { [key: string]: boolean };
}
export interface IDocument {
  index: number;
  name: string;
  value: string;
  iconName: string;
  fileType: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
}
export interface IDetailsListDocumentsExampleState {
  items: IDocument[];
}

function _randomDate(
  start: Date,
  end: Date
): { value: number; dateFormatted: string } {
  const date: Date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return {
    value: date.valueOf(),
    dateFormatted: date.toLocaleDateString()
  };
}

function _randomFileSize(): { value: string; rawSize: number } {
  const fileSize: number = Math.floor(Math.random() * 100) + 30;
  return {
    value: `${fileSize} KB`,
    rawSize: fileSize
  };
}

const FILE_ICONS: { name: string }[] = [
  { name: "accdb" },
  { name: "csv" },
  { name: "docx" },
  { name: "dotx" },
  { name: "mpt" },
  { name: "odt" },
  { name: "one" },
  { name: "onepkg" },
  { name: "onetoc" },
  { name: "pptx" },
  { name: "pub" },
  { name: "vsdx" },
  { name: "xls" },
  { name: "xlsx" },
  { name: "xsn" }
];

function _randomFileIcon(): { docType: string; url: string } {
  const docType: string =
    FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
  return {
    docType,
    // url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`
    url:
      "https://spoprod-a.akamaihd.net/files/odsp-next-prod_2019-05-31_20190606.002/odsp-media/images/itemtypesfluent/20/folder.svg"
  };
}

const LOREM_IPSUM = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut " +
  "labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut " +
  "aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
  "eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt "
).split(" ");
let loremIndex = 0;

function _lorem(wordCount: number): string {
  const startIndex =
    loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
  loremIndex = startIndex + wordCount;
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(" ");
}

function _generateDocuments() {
  const items: IDocument[] = [];
  for (let i = 0; i < 20; i++) {
    const randomDate = _randomDate(new Date(2012, 0, 1), new Date());
    const randomFileSize = _randomFileSize();
    const randomFileType = _randomFileIcon();
    let fileName = _lorem(2);
    fileName =
      fileName.charAt(0).toUpperCase() +
      fileName.slice(1).concat(`.${randomFileType.docType}`);
    let userName = _lorem(2);
    userName = userName
      .split(" ")
      .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
    items.push({
      index: i,
      name: fileName,
      value: fileName,
      iconName: randomFileType.url,
      fileType: randomFileType.docType,
      modifiedBy: userName,
      dateModified: randomDate.dateFormatted,
      dateModifiedValue: randomDate.value,
      fileSize: randomFileSize.value,
      fileSizeRaw: randomFileSize.rawSize
    });
  }
  return items;
}

export class App extends React.Component<
  IListGridExampleProps,
  IListGridExampleStates
> {
  constructor(props: IListGridExampleProps) {
    super(props);

    this.state = {
      isOpenContextualMenu: false,
      isGrid: false,
      items: _generateDocuments(),
      selection: {},
    };
  }

  private _onCloseMenuContext = () => {
    this.setState({ isOpenContextualMenu: false });
  };

  private _onOpenContextualMenu = (e: any) => {
    this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.setState({ isOpenContextualMenu: true });
  };

  clientX: any;
  clientY: any;

  private _onToggleSelectBy = (ev?: any, item?: IContextualMenuItem): void => {
    const { selection: selection } = this.state;

    // ev!.preventDefault();
    switch (item!.key) {
      case "name": {
        selection![item!.key] = true;
        selection!["modified"] = false;
        selection!["size"] = false;
        break;
      }
      case "modified": {
        selection![item!.key] = true;
        selection!["name"] = false;
        selection!["size"] = false;
        break;
      }
      case "size": {
        selection![item!.key] = true;
        selection!["name"] = false;
        selection!["modified"] = false;
        break;
      } 
      case "ascending": {
        selection![item!.key] = true;
        selection!["descending"] = false;
        break;
      }
      case "descending": {
        selection![item!.key] = true;
        selection!["ascending"] = false;
        break;
      }
    }

    this.setState({
      selection: selection
    });
  };

  public render() {
    const { selection: selectionBy } = this.state;

    return (
      <Fabric>
        <CommandBar
          items={[
            {
              key: "newItem",
              name: "New",
              cacheKey: "myCacheKey", // changing this key will invalidate this items cache
              iconProps: {
                iconName: "Add"
              }
            },
            {
              key: "upload",
              name: "Upload",
              iconProps: {
                iconName: "Upload"
              },
              href: "https://dev.office.com/fabric",
              ["data-automation-id"]: "uploadButton"
            },
            {
              key: "share",
              name: "Share",
              iconProps: {
                iconName: "Share"
              },
              onClick: () => console.log("Share")
            },
            {
              key: "download",
              name: "Download",
              iconProps: {
                iconName: "Download"
              },
              onClick: () => console.log("Download")
            }
          ]}
          overflowItems={[
            {
              key: "move",
              name: "Move to...",
              onClick: () => console.log("Move to"),
              iconProps: {
                iconName: "MoveToFolder"
              }
            },
            {
              key: "copy",
              name: "Copy to...",
              onClick: () => console.log("Copy to"),
              iconProps: {
                iconName: "Copy"
              }
            },
            {
              key: "rename",
              name: "Rename...",
              onClick: () => console.log("Rename"),
              iconProps: {
                iconName: "Edit"
              }
            }
          ]}
          farItems={[
            {
              key: "sort",
              name: "Sort",
              iconProps: {
                iconName: "SortLines"
              },
              subMenuProps: {
                items: [
                  {
                    key: "name",
                    name: "Name",
                    canCheck: true,
                    isChecked: selectionBy!["name"],
                    onClick: this._onToggleSelectBy
                  },
                  {
                    key: "modified",
                    name: "Modified",
                    canCheck: true,
                    isChecked: selectionBy!["modified"],
                    onClick: this._onToggleSelectBy
                  },
                  {
                    key: "size",
                    name: "Size",
                    canCheck: true,
                    isChecked: selectionBy!["size"],
                    onClick: this._onToggleSelectBy
                  },
                  {
                    key: "divider_1",
                    itemType: ContextualMenuItemType.Divider
                  },
                  {
                    key: "ascending",
                    name: "Ascending",
                    canCheck: true,
                    isChecked: selectionBy!["ascending"],
                    onClick: this._onToggleSelectBy
                  },
                  {
                    key: "descending",
                    name: "Descending",
                    canCheck: true,
                    isChecked: selectionBy!["descending"],
                    onClick: this._onToggleSelectBy
                  }
                ]
              }
            },
            {
              key: "tile",
              name: "Grid view",
              iconProps: {
                iconName: "Tiles"
              },
              iconOnly: true,
              onClick: () => this.setState({ isGrid: !this.state.isGrid })
            },
            {
              key: "info",
              name: "Info",
              iconProps: {
                iconName: "Info"
              },
              iconOnly: true,
              onClick: () => console.log("Info")
            }
          ]}
        />
        {this.state.isGrid ? (
          <FolderItemsGrid
            items={this.state.items}
            onOpenContextualMenu={this._onOpenContextualMenu}
          />
        ) : (
          <FolderItems
            items={this.state.items}
            onOpenContextualMenu={this._onOpenContextualMenu}
          />
        )}
        {this.state.isOpenContextualMenu && (
          <FolderContextualMenu
            clinetX={this.clientX}
            clinetY={this.clientY}
            onClose={this._onCloseMenuContext}
          />
        )}
      </Fabric>
    );
  }
}

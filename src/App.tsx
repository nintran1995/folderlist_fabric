import React from "react";
import { Fabric, TextField, CommandBar } from "office-ui-fabric-react";
import "./App.css";
import { FolderItems } from "./FolderItem/FolderItems";
import { FolderItemsGrid } from "./FolderItem/FolderItemsGrid";
import { FolderContextualMenu } from "./FolderItem/FolderContextualMenu";

export interface IListGridExampleProps {}
export interface IListGridExampleStates {
  isOpenContextualMenu: boolean;
  isGrid: boolean;
  items: IDocument[];
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

const controlStyles = {
  root: {
    margin: "0 30px 20px 0",
    maxWidth: "300px"
  }
};

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
      fileSizeRaw: randomFileSize.rawSize,
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

    this._allItems = _generateDocuments();

    this.state = {
      isOpenContextualMenu: false,
      isGrid: false,
      items: this._allItems
    };
  }

  private _allItems: IDocument[];

  private _onChangeText = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: any
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1)
        : this._allItems
    });
  };

  private _onCloseMenuContext = () => {
    this.setState({ isOpenContextualMenu: false });
  };

  private _onOpenContextualMenu = (e: any) => {
    this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.setState({ isOpenContextualMenu: true });
  };

  private _onSelect = (items: any[]) => {
    this.setState({ items: [...this._allItems] });
  };

  clientX: any;
  clientY: any;

  public render() {
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
              },
              ariaLabel: "New",
              subMenuProps: {
                items: [
                  {
                    key: "emailMessage",
                    name: "Email message",
                    iconProps: {
                      iconName: "Mail"
                    },
                    ["data-automation-id"]: "newEmailButton"
                  },
                  {
                    key: "calendarEvent",
                    name: "Calendar event",
                    iconProps: {
                      iconName: "Calendar"
                    }
                  }
                ]
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
          overflowButtonProps={{ ariaLabel: "More commands" }}
          farItems={[
            {
              key: "sort",
              name: "Sort",
              ariaLabel: "Sort",
              iconProps: {
                iconName: "SortLines"
              },
              onClick: () => console.log("Sort")
            },
            {
              key: "tile",
              name: "Grid view",
              ariaLabel: "Grid view",
              iconProps: {
                iconName: "Tiles"
              },
              iconOnly: true,
              onClick: () => this.setState({ isGrid: !this.state.isGrid })
            },
            {
              key: "info",
              name: "Info",
              ariaLabel: "Info",
              iconProps: {
                iconName: "Info"
              },
              iconOnly: true,
              onClick: () => console.log("Info")
            }
          ]}
          ariaLabel={
            "Use left and right arrow keys to navigate between commands"
          }
        />
        <TextField
          label="Filter by name:"
          onChange={this._onChangeText}
          styles={controlStyles}
        />
        {this.state.isGrid ? (
          <FolderItemsGrid
            items={this.state.items}
            onOpenContextualMenu={this._onOpenContextualMenu}
          />
        ) : (
          <FolderItems
            items={this.state.items}
            onSelect={this._onSelect}
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

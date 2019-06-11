import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import { Customizer, mergeStyles, CommandBar } from "office-ui-fabric-react";
import * as serviceWorker from "./serviceWorker";
import { createListItems } from "./exampleData";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();

// Inject some global styles
mergeStyles({
  selectors: {
    ":global(body), :global(html), :global(#root)": {
      margin: 0,
      padding: 0,
      height: "100vh"
    }
  }
});

const _cachedItems = createListItems(20);

ReactDOM.render(
  <Customizer {...FluentCustomizations}>
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
          onClick: () => console.log("Tiles")
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
      ariaLabel={"Use left and right arrow keys to navigate between commands"}
    />
    <App items={_cachedItems} />
  </Customizer>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import * as React from "react";
import {
  ContextualMenuItemType,
  DirectionalHint,
  ContextualMenu
} from "office-ui-fabric-react";

interface IFolderContextualMenuProps {
  clinetX: any;
  clinetY: any;
  onClose(): void;
}
interface IFolderContextualMenuState {}

type Props = IFolderContextualMenuProps;
export class FolderContextualMenu extends React.Component<
  Props,
  IFolderContextualMenuState
> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ContextualMenu
        shouldFocusOnMount={true}
        directionalHint={DirectionalHint.bottomLeftEdge}
        gapSpace={10}
        onDismiss={this.props.onClose}
        target={{ x: this.props.clinetX, y: this.props.clinetY }}
        items={[
          {
            key: "open",
            text: "Open",
            iconProps: {
              iconName: "FabricOpenFolderHorizontal"
            },
            onClick: () => {
              alert("Open");
            }
          },
          {
            key: "divider_1",
            itemType: ContextualMenuItemType.Divider
          },
          {
            key: "unmarkAsFavorite",
            text: "Unmark As Favorite",
            iconProps: {
              iconName: "Unfavorite"
            },
            disabled: true,
            onClick: () => {
              alert("Unmark As Favorite");
            }
          },
          {
            key: "rename",
            text: "Rename",
            iconProps: {
              iconName: "EditStyle"
            },
            onClick: () => {
              alert("Rename");
            }
          },
          {
            key: "designFolderIcon",
            text: "Design Folder Icon",
            iconProps: {
              iconName: "EditPhoto"
            },
            onClick: () => {
              alert("Design Folder Icon");
            }
          },
          {
            key: "divider_2",
            itemType: ContextualMenuItemType.Divider
          },
          {
            key: "delete",
            text: "Delete",
            iconProps: {
              iconName: "Delete"
            },
            onClick: () => {
              alert("Delete");
            }
          }
        ]}
      />
    );
  }
}

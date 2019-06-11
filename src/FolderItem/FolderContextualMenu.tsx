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
    );
  }
}

import { Paper } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import React from "react";
import UserChip from "./UserChip";

const Leaf = (props: any) => {
  // const ref = React.useRef<HTMLButtonElement | null>(null)
  // const classes = useStyles()
  var { attributes, children, leaf }: any = props;
  const [anchorEl, setAnchorEl]: any = React.useState<null | HTMLElement>(null);

  const handleClick: any = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  if (leaf.Special) {
    // if (props.is_just_created){
    //    handleClick()
    // }

    children = (
      <span>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <span aria-describedby={id}>
            <span
              // TODO
              // className={classes.hoverig}
              style={{
                borderBottom: "2px solid #FFD400"
              }}
              onClick={handleClick}
            >
              {children}
            </span>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Paper
                style={{
                  padding: "4px",
                  backgroundColor: "lightgray",
                  borderRadius: "40px"
                }}
              >
                {UserChip(leaf.Special.username)}
                {/* TODO how to make this comment editable */}
                you comment is here.
                {/* <RichText
                  item={{
                    addedBy: { id: 0 },
                    id: 0,
                    username: '',
                    description:
                      '[{"type":"paragraph","children":[{"text":"my values are here"}]}]',
                    whoCanSee: [],
                    whoCanEdite: [],
                  }}
                /> */}
              </Paper>
            </Popper>
          </span>
        </ClickAwayListener>
      </span>
    );
  }
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <code
        style={{
          background: "#F0F0F7",
          borderRadius: "5px",
          color: "tomato"
        }}
      >
        {children}
      </code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
export default Leaf;

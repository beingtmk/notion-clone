import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import React from "react";
import { useSelected } from "slate-react";
import UserChip from "./UserChip";
import HtmlTableToJson from "html-table-to-json";
import { decode } from "html-entities";
import { CenterFocusStrongOutlined } from "@material-ui/icons";

const Element = (props: any) => {
  const selected = useSelected();
  // const { enqueueSnackbar }: any = useSnackbar();
  var ref: any = React.useRef(null);
  ref.current && console.log({ x: `${ref.current.innerHTML}` });
  ref.current &&
    console.log({
      x: HtmlTableToJson.parse(`${ref.current.innerHTML}`).results
    });
  const jsonTables = HtmlTableToJson.parse(`
        <table>
            <tr>
                <th>Animal</th>
                <th>Color</th>
                <th>Name</th>
            </tr>
            <tr>
                <td>Unicorn</td>
                <td>Pink</td>
                <td>Billy</td>
            </tr>
            <tr>
                <td>Walrus</td>
                <td>Orange</td>
                <td>Sue</td>
            </tr>
        </table>
    `);

  const { attributes, children, element } = props;
  switch (element.type) {
    case "table":
      return (
        <TableContainer ref={ref} component={Paper} {...attributes}>
          <Table>{children}</Table>
        </TableContainer>
      );
    case "table-body":
      return <TableBody ref={ref}>{children}</TableBody>;
    case "table-head":
      return <TableHead {...attributes}>{children}</TableHead>;
    case "table-row":
      return <TableRow {...attributes}>{children}</TableRow>;
    case "table-cell":
      return <TableCell {...attributes}>{children}</TableCell>;
    case "mention":
      return (
        <span
          {...attributes}
          suppressContentEditableWarning
          contentEditable={false}
        >
          {UserChip(element.character, selected)}
          {children}
        </span>
      );
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "title":
      return <h2 {...attributes}>{children}</h2>;
    case "divider":
      return (
        <div contentEditable={false} {...attributes}>
          <Divider />
          {children}
        </div>
      );
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "subtitle1":
    case "subtitle2":
    case "body1":
    case "body2":
    case "button":
    case "caption":
    case "overline":
      const text = element.children[0].text;
      const id = text
        .replaceAll(" ", "-")
        .slice(0, text.length > 12 ? 12 : text.length);
      const link = window.location.origin + window.location.pathname + "#" + id;
      return (
        <Typography
          component={"span"}
          onMouseDown={(e: any) => {
            if (e.button === 2) {
              e.preventDefault();
              // enqueueSnackbar(
              //   <Typography component={"span"} variant={"body2"}>
              //     <Typography component={"span"} variant={"body2"}>
              //       The fragment link is:{" "}
              //     </Typography>
              //     <a style={{ color: "lightblue" }} href={link}>
              //       {link}
              //     </a>
              //   </Typography>,
              //   {}
              // );
            }
          }}
          id={id}
          variant={element.type}
          {...attributes}
        >
          {children}
        </Typography>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;

import React, { useCallback, useMemo, useRef, useState } from "react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import UserChip from "./Components/UserChip";
import Element from "./Components/Element";
import HoverToolbar from "./Components/HoverToolbar";
import Leaf from "./Components/Leaf";
import MenuItems from "./Components/MenuItems";
import insertComp from "./function/insertCom";
import insertMention from "./function/insertMention";
import withElements from "./function/withElements";
import useConvert from "./Hooks/useConvert";
import useMention from "./Hooks/useMention";

const RichText = ({ item }: any) => {
  const CHARACTERS: any = ["ali", "samy", "john"];

  const ref = useRef<HTMLDivElement | null | any>();

  const [value, setValue] = useState<Node[]>(
    JSON.parse(
      item.description
        ? item.description
        : '[{"type":"paragraph","children":[{"text":""}]}]'
    )
  );
  React.useEffect(() => {
    item.description && setValue(JSON.parse(item.description));
  }, [item]);

  const editor = useMemo(
    () => withElements(withReact(withHistory(createEditor()))),
    []
  );

  const [
    index,
    chars,
    onKeyDown,
    onChange,
    setIndex,
    activate_mention_insert
  ] = useMention(/^@(\w+)$/, insertMention, editor, CHARACTERS, ref);

  const [In, Chars, onKey, onCh, setIn, activateMentionInsert] = useMention(
    /^\/(\w+)$/,
    insertComp,
    editor,
    [
      "table",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "subtitle1",
      "subtitle2",
      "body1",
      "body2",
      "button",
      "caption",
      "overline",
      "numbered-list",
      "divider"
    ],
    ref
  );
  const [change]: any = useConvert(/(<)(.+)(>)/, insertMention, editor, ref);

  const userId = localStorage.getItem("userId");
  const allowedUsers = item.whoCanEdite.map((item: any) => item.id);
  var readOnly: boolean;

  if (item.addedBy.username === localStorage.getItem("username")) {
    readOnly = false;
  } else if (item.whoCanEdite.length > 0) {
    readOnly = !allowedUsers.includes(userId) ? true : false;
  } else if (localStorage.getItem("userId") === "1") {
    readOnly = false;
  } else {
    readOnly = true;
  }

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        localStorage.setItem("description", JSON.stringify(value));
        // console.log('there was change')
        // console.log(value)
        // setstate({ id: item.id, description: JSON.stringify(value) });
        onChange();
        onCh();
        change();
      }}
    >
      <HoverToolbar />
      <Editable
        readOnly={false}
        renderElement={useCallback((props) => {
          return <Element editor={editor} {...props} />;
        }, [])}
        renderLeaf={useCallback(
          (props) => (
            <Leaf {...props} />
          ),
          []
        )}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(e: any) => {
          onKeyDown(e);
          onKey(e);
        }}
      />
      {chars &&
        chars.length > 0 &&
        MenuItems(
          chars,
          setIndex,
          activate_mention_insert,
          ref,
          index,
          UserChip
        )}
      {Chars &&
        Chars.length > 0 &&
        MenuItems(Chars, setIn, activateMentionInsert, ref, In)}
    </Slate>
  );
};

export default RichText;

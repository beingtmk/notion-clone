import { Editor, Transforms } from "slate";

const insertComp = (editor: Editor, character: string, key: any) => {
  function getFullName(params: any) {
    return eval(params.colDef.formula);
  }
  const table: any = [
    {
      type: "table",
      children: [
        {
          type: "table-header",
          children: [
            {
              type: "table-row",
              children: [
                {
                  type: "table-cell",
                  children: [{ text: "" }]
                },
                {
                  type: "table-cell",
                  children: [{ text: "Human", bold: true }]
                },
                {
                  type: "table-cell",
                  children: [{ text: "Dog", bold: true }]
                },
                {
                  type: "table-cell",
                  children: [{ text: "Cat", bold: true }]
                }
              ]
            }
          ]
        },
        {
          type: "table-row",
          children: [
            {
              type: "table-row",
              children: [
                {
                  type: "table-cell",
                  children: [{ text: "# of Feet", bold: true }]
                },
                {
                  type: "table-cell",
                  children: [{ text: "2" }]
                },
                {
                  type: "table-cell",
                  children: [{ text: "4" }]
                },
                {
                  type: "table-cell",
                  children: [{ text: "4" }]
                }
              ]
            },
            {
              type: "table-row",
              children: [
                {
                  type: "table-cell",
                  children: [{ text: "# of Lives", bold: true }]
                },
                {
                  type: "table-cell",
                  children: [{ text: "1" }]
                },
                {
                  type: "table-cell",
                  children: [{ text: "1" }]
                },
                {
                  type: "table-cell",
                  children: [{ text: "9" }]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "paragraph",
      children: [{ text: "" }]
    }
  ];

  switch (character) {
    case "table":
      Transforms.insertNodes(editor, table);
      return;
    case "numbered-list":
      return Transforms.insertNodes(editor, [
        {
          type: character,
          children: [{ type: "list-item", children: [{ text: "" }] }]
        }
      ]);
    case "divider":
      return Transforms.insertNodes(editor, [
        {
          type: character,
          children: [{ text: "" }]
        },
        {
          type: "paragraph",
          children: [{ text: "" }]
        }
      ]);
    default:
      if (key === "Tab") {
        Transforms.setNodes(editor, {
          type: character,
          children: [{ text: "" }]
        });

        Transforms.insertText(editor, "");
      } else {
        Transforms.insertNodes(editor, {
          type: character,
          children: [{ text: "" }]
        });
      }
      return Transforms.move(editor);
  }
};

export default insertComp;

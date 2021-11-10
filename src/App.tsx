import RichText from "./slatejs/RichText";
export default function App() {
  // localStorage.setItem("new", "item");
  console.log(console.log(localStorage.getItem("description")));

  return (
    <div className="App">
      <h1>Notion so clone</h1>
      <RichText
        item={{
          // description: `[{"type":"paragraph","children":[{"text":""}]}]`,
          description: localStorage.getItem("description"),
          whoCanEdite: [],
          addedBy: { username: "name" },
          id: 1
        }}
      />
    </div>
  );
}

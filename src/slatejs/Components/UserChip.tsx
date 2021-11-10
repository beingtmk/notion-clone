import React from "react";
function UserChip(username: string, select?: boolean) {
  // const classes = useStyles()

  var user: { username: string; imageUrl: string } = {
    username: "",
    imageUrl: ""
  };

  return (
    <span
      style={{
        paddingRight: "0.3em",
        paddingBottom: "0px",
        display: "inline-block",
        borderRadius: "50em",
        backgroundColor: select ? "lightblue" : "lightgray"
      }}
    >
      <img
        style={{
          border: "0.1em solid gray",
          float: "left",
          height: "1.2em",
          width: "1.2em",
          borderRadius: "50%"
        }}
        alt={username[0]}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Emoji_u263a.svg/1200px-Emoji_u263a.svg.png"
      />
      {username}
    </span>
  );
}

export default UserChip;

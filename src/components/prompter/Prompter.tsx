import React from "react";

export default function Prompter() {
  return (
    <div className="prompter" key="prompter">
      <form className="prompter prompter-form">
        <input
          className="prompter prompter-input"
          key="prompter-input-1"
          type="text"
          placeholder="Input 1"
        ></input>
        <input
          className="prompter prompter-input"
          key="prompter-input-2"
          type="text"
          placeholder="Input 2"
        ></input>
        <input
          className="prompter prompter-submit"
          key="prompter-submit"
          type="submit"
          value="Search"
        ></input>
      </form>
    </div>
  );
}

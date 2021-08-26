import React from "react";
import "./App.css";
import TagInput from "./components/TagInput/TagInput";

function App() {
  return (
    <div className="App">
      <TagInput
        inputName="lol"
        darkMode
        suggestionData={[
          "lol",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "lol",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "axaxax",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "axaxax",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "lol",
          "jopa",
          "axaxax",
        ]}
        suggestion="extended"
      />
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import TagInput from "./components/TagInput/TagInput";

function App() {
  return (
    <div className="App">
      <TagInput
        inputName="lol"
        suggestionData={["lol", "jopa", "axaxax"]}
        suggestion="extended"
      />
    </div>
  );
}

export default App;

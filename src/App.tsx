import React, { useState } from "react";
import "./App.css";
import TagInput from "./components/TagInput/TagInput";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <div className="App">
      <TagInput
        inputName="lol"
        darkMode={darkMode}
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
      <button onClick={() => setDarkMode(!darkMode)} style={{ margin: 50 }}>
        switch
      </button>
    </div>
  );
}

export default App;

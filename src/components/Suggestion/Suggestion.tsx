import { FunctionComponent } from "react";
import Tag from "../Tag/Tag";
import "./Suggestion.css";

const Suggestion: FunctionComponent = ({ children }) => {
  return (
    <div className="tags-suggestion">
      <div className="tags-suggestion__base">
        <Tag>{children}</Tag>
      </div>
    </div>
  );
};

export default Suggestion;

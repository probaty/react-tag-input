import { FunctionComponent } from "react";
import Tag from "../Tag/Tag";
import "./Suggestion.css";

interface SuggestionProps {
  extended?: boolean;
  addTag: () => void;
}

const Suggestion: FunctionComponent<SuggestionProps> = ({
  children,
  addTag,
  extended = false,
}) => {
  return (
    <div className="tags-suggestion" onClick={addTag}>
      <div className="tags-suggestion__base">
        Create
        <Tag>{children}</Tag>
      </div>
    </div>
  );
};

export default Suggestion;

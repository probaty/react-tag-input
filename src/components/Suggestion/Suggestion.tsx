import { FunctionComponent } from "react";
import Tag from "../Tag/Tag";
import "./Suggestion.css";

interface SuggestionProps {
  extended?: boolean;
  data?: string[];
  currentColor?: string;
  addTag: () => void;
}

const Suggestion: FunctionComponent<SuggestionProps> = ({
  children,
  addTag,
  currentColor,
  extended = false,
}) => {
  return (
    <div className="tags-suggestion" onClick={addTag}>
      <div className="tags-suggestion__base">
        Create
        <Tag bgColor={currentColor}>{children}</Tag>
      </div>
      {extended && <div className="tags-suggestion__extended"></div>}
    </div>
  );
};

export default Suggestion;

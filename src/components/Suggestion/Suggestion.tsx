import { FunctionComponent } from "react";
import { CustomTag } from "../CustomTag.props";
import SuggestionExtended from "../SuggestionExtended/SuggestionExtended";
import Tag from "../Tag/Tag";
import "./Suggestion.css";

interface SuggestionProps {
  extended?: boolean;
  data?: CustomTag[];
  currentColor?: string;
  addTag: () => void;
  addSuggestionTag: (tag: CustomTag) => void;
}

const Suggestion: FunctionComponent<SuggestionProps> = ({
  children,
  addTag,
  addSuggestionTag,
  currentColor,
  data = [],
  extended = false,
}) => {
  return (
    <div className="tags-suggestion">
      {extended && data.length > 0 && (
        <SuggestionExtended
          tags={data}
          addTag={addSuggestionTag}
          inputValue={children as string}
        />
      )}
      {children && (
        <div className="tags-suggestion__base" onClick={addTag}>
          Create
          <Tag bgColor={currentColor}>{children}</Tag>
        </div>
      )}
    </div>
  );
};

export default Suggestion;

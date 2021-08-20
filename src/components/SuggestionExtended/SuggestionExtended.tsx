import { FunctionComponent } from "react";
import { CustomTag } from "../CustomTag.props";
import Tag from "../Tag/Tag";
import "./SuggestionExtended.css";

interface SuggestionExtendedProps {
  inputValue: string;
  tags: CustomTag[];
  addTag: (tag: CustomTag) => void;
}

const SuggestionExtended: FunctionComponent<SuggestionExtendedProps> = ({
  tags,
  inputValue,
  addTag,
}) => {
  let filteredTags = tags.filter((tag: CustomTag) =>
    tag.name.includes(inputValue)
  );

  return (
    <div className="tags-suggestion__extended">
      <small>Select an option or create a new one</small>
      {filteredTags.map((tag: CustomTag, index: number) => {
        return (
          <div
            className="tags-suggestion__extended__tag"
            key={index}
            onClick={() => addTag(tag)}
          >
            <Tag bgColor={tag.color}>{tag.name}</Tag>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestionExtended;

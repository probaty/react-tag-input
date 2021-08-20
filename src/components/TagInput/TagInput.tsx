import React, { FunctionComponent, useRef, useState } from "react";
import Suggestion from "../Suggestion/Suggestion";
import Tag from "../Tag/Tag";
import "./TagInput.css";
import { randomColor } from "../randomColor";

interface TagInputProps {
  inputName: string;
  className?: string;
  tagClassName?: string;
  textColor?: string;
  textTagColor?: string;
  bgColor?: string;
  bgTagColor?: string;
  suggestion?: "default" | "extended";
  suggestionData?: string[];
  data?: CustomTag[];
}

interface CustomTag {
  name: string;
  color: string;
}

const TagInput: FunctionComponent<TagInputProps> = ({
  inputName,
  className,
  tagClassName,
  textColor,
  textTagColor,
  bgColor,
  bgTagColor,
  children,
  data,
  suggestion = "default",
}) => {
  const [tags, updateTags] = useState<CustomTag[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>(randomColor());
  const tagsInputRef = useRef<HTMLInputElement>(null);
  let borderRadius = "5px";

  if (suggestion === "default" || suggestion === "extended") {
    borderRadius = "";
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      if (!inputValue) return;
      addTag();
    }
    if (e.key === "Backspace") {
      if (inputValue) return;
      removeTag(tags.length - 1);
    }
  };

  const addTag = (): void => {
    const tag: CustomTag = { name: inputValue.trim(), color: currentColor };
    updateTags([...tags, tag]);
    setInputValue("");
    setCurrentColor(randomColor());
  };

  const removeTag = (indexToRemove: number): void => {
    updateTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const changeFocus = () => {
    if (!tagsInputRef.current) return;
    tagsInputRef.current.focus();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <div
      className={`tags-field ${className ? className : ""}`}
      tabIndex={1}
      onFocus={changeFocus}
      style={{
        borderRadius: inputValue ? borderRadius : "5px",
      }}
    >
      <input
        name={inputName}
        type="text"
        value={tags.join("*_*")}
        style={{
          display: "none",
        }}
      />
      <div className="tags">
        {tags.map((tag, index) => (
          <Tag
            removeTag={() => removeTag(index)}
            key={index}
            bgColor={tag.color}
          >
            {tag.name}
          </Tag>
        ))}
        <input
          type="text"
          className="tag-input"
          ref={tagsInputRef}
          onChange={handleChange}
          value={inputValue}
          style={{
            display: !tags.length ? "block" : "",
          }}
          placeholder={tags.length ? "" : "Press enter to add tag..."}
          onKeyDown={handleKeyDown}
        />
      </div>
      {inputValue && (
        <Suggestion
          addTag={addTag}
          currentColor={currentColor}
          extended={suggestion === "extended" ? true : false}
        >
          {inputValue}
        </Suggestion>
      )}
    </div>
  );
};

export default TagInput;

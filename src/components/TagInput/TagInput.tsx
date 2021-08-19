import React, { FunctionComponent, useRef, useState } from "react";
import Suggestion from "../Suggestion/Suggestion";
import Tag from "../Tag/Tag";
import "./TagInput.css";

interface TagInputProps {
  inputName: string;
  className?: string;
  tagClassName?: string;
  textColor?: string;
  textTagColor?: string;
  bgColor?: string;
  bgTagColor?: string;
  suggestion?: "none" | "default" | "extended";
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
  const [tags, updateTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
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
    updateTags([...tags, inputValue.trim()]);
    setInputValue("");
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

  const suggestionBlock =
    suggestion === "extended" ? (
      <Suggestion extended addTag={addTag}>
        {inputValue}
      </Suggestion>
    ) : (
      <Suggestion addTag={addTag}>{inputValue}</Suggestion>
    );

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
          <Tag removeTag={() => removeTag(index)} key={index}>
            {tag}
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
      {suggestion !== "none" && inputValue && suggestionBlock}
    </div>
  );
};

export default TagInput;

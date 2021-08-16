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
  suggestion?: string[];
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
  suggestion,
  bgColor,
  bgTagColor,
  children,
  data,
}) => {
  const [tags, updateTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const tagsInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      if (!inputValue) return;
      updateTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
    if (e.key === "Backspace") {
      if (inputValue) return;
      updateTags(tags.filter((_, index) => index !== tags.length - 1));
    }
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

  // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   setInputValue("");
  // };

  return (
    <div
      className={`tags-field ${className ? className : ""}`}
      tabIndex={1}
      onFocus={changeFocus}
      // onBlur={handleBlur}
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
      <Suggestion>{inputValue}</Suggestion>
    </div>
  );
};

export default TagInput;

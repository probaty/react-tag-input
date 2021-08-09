import React, { FunctionComponent, useEffect, useRef, useState } from "react";

interface TagInputProps {
  inputName: string;
  className?: string;
  tagClassName?: string;
  textColor?: string;
  bgColor?: string;
  bgTagColor?: string;
  autocomplete?: boolean;
  data?: CustomTag[];
}

interface CustomTag {
  name: string;
  color: string;
}

const TagInput: FunctionComponent<TagInputProps> = ({
  inputName,
  className = "",
}: TagInputProps) => {
  const [tags, updateTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.value = tags.join("*_*");
  }, [tags]);

  const handleKeyDown = (
    e: React.KeyboardEvent & React.FormEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      if (!e.currentTarget.value) return;
      updateTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
    if (e.key === "Backspace") {
      if (e.currentTarget.value) return;
      updateTags(tags.filter((_, index) => index !== tags.length - 1));
    }
  };

  const removeTag = (indexToRemove: number): void => {
    updateTags(tags.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div className={`tag-field ${className}`}>
      <input
        name={inputName}
        ref={inputRef}
        style={{
          display: "none",
        }}
      />
      <ol className="tags">
        {tags.map((tag, index) => (
          <li key={index}>
            {tag}
            <span onClick={() => removeTag(index)}>×</span>
          </li>
        ))}
      </ol>
      <input
        type="text"
        className="tag-input"
        placeholder="Press enter to add tag..."
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TagInput;

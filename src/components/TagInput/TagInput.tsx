import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Suggestion from "../Suggestion/Suggestion";
import Tag from "../Tag/Tag";
import "./TagInput.css";
import { randomColor, switchColor } from "../randomColor";
import { CustomTag } from "../CustomTag.props";

interface TagInputProps {
  inputName?: string;
  className?: string;
  darkMode?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  tagClassName?: string;
  textColor?: string;
  textTagColor?: string;
  bgColor?: string;
  bgTagColor?: string;
  suggestion?: "default" | "extended";
  suggestionData?: string[];
  data?: CustomTag[];
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
  darkMode = false,
  suggestionData = [],
  suggestion = "default",
}) => {
  const [tags, updateTags] = useState<CustomTag[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>(
    randomColor(!darkMode)
  );
  const [borderRadius, setBorderRadius] = useState<string>("5px");
  const tagsInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    switchMode();
  }, [darkMode]);

  let suggestionTags: CustomTag[] = useMemo(() => {
    return suggestionData.map((tagName: string): CustomTag => {
      return { name: tagName, color: randomColor(darkMode) };
    });
  }, [suggestionData, darkMode]);

  const switchMode = () => {
    setCurrentColor(switchColor(currentColor));

    if (tags.length) {
      updateTags(
        tags.map((tag: CustomTag) => {
          return {
            name: tag.name,
            color: switchColor(tag.color),
          };
        })
      );
    }

    if (suggestionTags) {
      suggestionTags = suggestionTags.map((tag: CustomTag) => {
        return { name: tag.name, color: switchColor(tag.color) };
      });
    }
  };

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
    if (checkIncludes(tag.name)) return;
    updateTags([...tags, tag]);
    setInputValue("");
    setCurrentColor(randomColor(darkMode));
  };

  const addSuggestionTag = (tag: CustomTag): void => {
    if (checkIncludes(tag.name)) return;
    updateTags([...tags, tag]);
    setInputValue("");
  };

  const checkIncludes = (name: string): boolean => {
    const found = tags.find((tag) => tag.name === name);
    if (found) return true;
    return false;
  };

  const removeTag = (indexToRemove: number): void => {
    updateTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleFocus = (): void => {
    if (!tagsInputRef.current) return;
    tagsInputRef.current.focus();
    if (suggestion === "extended") setBorderRadius("5px 5px 0 0");
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
    if (inputValue) setBorderRadius("5px 5px 0 0");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setInputValue("");
      setBorderRadius("5px");
    }
  };

  return (
    <div
      className={`tags-field ${className ? className : ""}${
        darkMode ? "dark" : ""
      }`}
      tabIndex={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        borderRadius: borderRadius,
        colorScheme: darkMode ? "dark" : "light",
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
      <Suggestion
        addTag={addTag}
        addSuggestionTag={addSuggestionTag}
        currentColor={currentColor}
        extended={suggestion === "extended" ? true : false}
        data={suggestionTags}
      >
        {inputValue}
      </Suggestion>
    </div>
  );
};

export default TagInput;

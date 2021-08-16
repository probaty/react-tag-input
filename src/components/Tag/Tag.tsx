import { FunctionComponent } from "react";
import "./Tag.css";

interface TagProps {
  className?: string;
  textColor?: string;
  bgColor?: string;
  hasCloseButton?: boolean;
  removeTag?: () => void;
}

const Tag: FunctionComponent<TagProps> = ({
  className,
  textColor,
  bgColor,
  children,
  removeTag,
  hasCloseButton = true,
}) => {
  return (
    <div
      className={`tag ${className ? className : ""}`}
      style={{
        backgroundColor: bgColor ? bgColor : undefined,
        color: textColor ? textColor : undefined,
      }}
    >
      {children}
      {hasCloseButton && (
        <span className="tag-close" onClick={removeTag}>
          ×
        </span>
      )}
    </div>
  );
};

export default Tag;

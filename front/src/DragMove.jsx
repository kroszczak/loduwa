import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function DragMove(props) {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onDragMove,
    children,
    style,
    className,
    isSvg = false
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e) => {
    setIsDragging(true);

    onPointerDown(e);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);

    onPointerUp(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging) onDragMove(e);

    onPointerMove(e);
  };

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  // Dynamically render a <g> or <div> tag
  const Tag = isSvg ? "g" : "div";

  return (
    <Tag
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  );
}
DragMove.propTypes = {
  onPointerDown: PropTypes.func,
  onPointerUp: PropTypes.func,
  onPointerMove: PropTypes.func,
  onDragMove: PropTypes.func.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  isSvg: PropTypes.bool
};


DragMove.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {}
};

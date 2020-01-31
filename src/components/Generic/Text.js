import React from "react";

function Text(props) {
  const { center, small, children } = props;

  if (small)
    return (
      <p className={`text-muted ${center && "text-center"}`}>
        <small>{children}</small>
      </p>
    );

  return <p className={`text-muted ${center && "text-center"}`}>{children}</p>;
}

export default Text;

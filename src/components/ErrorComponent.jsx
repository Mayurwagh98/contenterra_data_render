import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <h1
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "8rem",
        color: "white",
        fontSize: "4rem",
        fontFamily: "cursive",
      }}
    >
      {message}
    </h1>
  );
};

export default ErrorComponent;

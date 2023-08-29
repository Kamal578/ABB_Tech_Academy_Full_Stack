import React, { Component } from "react";

class Button extends Component {
  render() {
    const { backgroundColor, text, onClick, isVisible } = this.props;

    const buttonStyle = {
      backgroundColor: backgroundColor,
      display: isVisible ? "block" : "none",
    };

    return (
      <button style={buttonStyle} onClick={onClick}>
        {text}
      </button>
    );
  }
}

export default Button;

import React, { Component } from "react";

class Modal extends Component {
  render() {
    const { header, text, onClick, actions } = this.props;

    return (
      <div className="modal">
        <header>
          {header}
          <button className="modal--close-btn" onClick={onClick}>
            ×
          </button>
        </header>
        <main>{text}</main>
        <footer>
          <button className="modal-btn">{actions[0].btnText}</button>
          <button className="modal-btn">{actions[1].btnText}</button>
        </footer>
      </div>
    );
  }
}

export default Modal;

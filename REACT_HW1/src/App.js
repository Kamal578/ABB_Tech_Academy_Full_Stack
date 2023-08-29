import React, { Component } from "react";
import Button from "./components/Button";
import Modal from "./components/Modal";

const modalData = [
  {
    header: "Do you want to delete this file?",
    text: "Once you delete this file, it won't be possible to undo this action. Are you sure you want to delete it?",
    actions: [
      {
        btnText: "Ok",
      },
      {
        btnText: "Cancel",
      },
    ],
  },
  {
    header: "Lorem ipsum dolor sit amet.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    actions: [
      {
        btnText: "Buy",
      },
      {
        btnText: "Sell",
      },
    ],
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalIndex: -1,
      isOpen: false,
    };
  }

  handleModalToggle = (index) => {
    this.setState((prevState) => ({
      openModalIndex: prevState.openModalIndex === index ? -1 : index,
      isOpen: !prevState.isOpen,
    }));
  };

  handleCloseModalsOutsideClick = (event) => {
    if (this.state.isOpen && !event.target.closest(".modal")) {
      this.setState({
        openModalIndex: -1,
        isOpen: false,
      });
    }
  };

  render() {
    const { openModalIndex, isOpen } = this.state;

    return (
      <>
        <div
          className={isOpen ? "container dark-bg" : "container"}
          onClick={this.handleCloseModalsOutsideClick}
        >
          <header className="container--header">
            <Button
              backgroundColor={"orange"}
              text={
                !isOpen ? "Open first modal" : "Close"
              }
              onClick={() => this.handleModalToggle(0)}
              isVisible={!isOpen}
            />
            <Button
              backgroundColor={"orange"}
              text={
                !isOpen ? "Open second modal" : "Close"
              }
              onClick={() => this.handleModalToggle(1)}
              isVisible={true}
            />
          </header>
          <div className="modal--section">
            {modalData.map(
              (modal, index) =>
                isOpen &&
                openModalIndex === index && (
                  <Modal
                    key={index}
                    header={modal.header}
                    text={modal.text}
                    onClick={() => this.handleModalToggle(index)}
                    actions={modal.actions}
                  />
                )
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;

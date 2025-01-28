import React, { Component } from "react";
import { Stage, Layer, Image } from "react-konva";
import {
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const loadImage = (src) => {
  const img = new window.Image();
  img.src = src;
  return img;
};

class App extends Component {
  state = {
    objects: [],
    imageSrc: loadImage("kaczka.jpg"),
    selectedObject: null,
    isModalOpen: false,
    modalContent: "",
    modalHeader: "",
    isEditing: false,
    isCreating: false,
  };

  openCreateModal = () => {
    this.setState({
      isCreating: true,
      modalContent: "",
      modalHeader: "",
      isModalOpen: true,
    });
  };

  createObject = () => {
    if (this.state.modalContent.trim() === "" || this.state.modalHeader.trim() === "") {
      alert("Nagłówek i treść nie mogą być puste!");
      return;
    }

    const newObject = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      header: this.state.modalHeader,
      content: this.state.modalContent,
    };

    this.setState((prevState) => ({
      objects: [...prevState.objects, newObject],
      isModalOpen: false,
      modalContent: "",
      modalHeader: "",
      isCreating: false,
    }));
  };

  openEditModal = (index) => {
    const object = this.state.objects[index];
    this.setState({
      selectedObject: index,
      modalHeader: object.header,
      modalContent: object.content,
      isModalOpen: true,
      isEditing: false,
      isCreating: false,
    });
  };

  closeModal = () => {
    this.setState({
      selectedObject: null,
      isModalOpen: false,
      modalContent: "",
      modalHeader: "",
      isEditing: false,
      isCreating: false,
    });
  };

  handleModalContentChange = (e) => {
    this.setState({ modalContent: e.target.value });
  };

  handleModalHeaderChange = (e) => {
    this.setState({ modalHeader: e.target.value });
  };

  saveContent = () => {
    const { selectedObject, modalContent, modalHeader, objects } = this.state;
    const newObjects = [...objects];
    newObjects[selectedObject] = {
      ...newObjects[selectedObject],
      content: modalContent,
      header: modalHeader,
    };

    this.setState({
      objects: newObjects,
      isEditing: false,
    });
  };

  enableEditing = () => {
    this.setState({ isEditing: true });
  };

  handleDragEnd = (e, index) => {
    const newObjects = [...this.state.objects];
    newObjects[index] = {
      ...newObjects[index],
      x: e.target.x(),
      y: e.target.y(),
    };
    this.setState({ objects: newObjects });
  };

  render() {
    return (
      <div>
        <IconButton
          icon={<AddIcon />}
          aria-label="Dodaj obiekt"
          onClick={this.openCreateModal}
          position="absolute"
          top="20px"
          right="20px"
          zIndex="10"
          colorScheme="red"
          size="lg"
          isRound
        />

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {this.state.objects.map((obj, index) => (
              <Image
                key={index}
                x={obj.x}
                y={obj.y}
                draggable
                image={this.state.imageSrc}
                onDragEnd={(e) => this.handleDragEnd(e, index)}
                onClick={(e) => {
                  if (e.evt.cancelBubble) return;
                  this.openEditModal(index);
                }}
                width={50}
                height={50}
              />
            ))}
          </Layer>
        </Stage>

        <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              {this.state.isEditing || this.state.isCreating ? (
                <>
                  <Input
                    placeholder="Nagłówek"
                    value={this.state.modalHeader}
                    onChange={this.handleModalHeaderChange}
                    mb={3}
                  />
                  <Input
                    placeholder="Treść"
                    value={this.state.modalContent}
                    onChange={this.handleModalContentChange}
                  />
                </>
              ) : (
                <>
                  <Text fontWeight="bold">
                    {this.state.modalHeader || "Brak nagłówka"}
                  </Text>
                  <Text>{this.state.modalContent || "Brak treści"}</Text>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              {this.state.isCreating ? (
                <Button colorScheme="blue" onClick={this.createObject}>
                  Dodaj
                </Button>
              ) : this.state.isEditing ? (
                <Button colorScheme="blue" onClick={this.saveContent}>
                  Zapisz
                </Button>
              ) : (
                <Button colorScheme="blue" onClick={this.enableEditing}>
                  Edytuj
                </Button>
              )}
              <Button onClick={this.closeModal}>Anuluj</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }
}

export default App;

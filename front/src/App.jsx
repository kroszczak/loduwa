import React, { Component } from "react";
import { Stage, Layer, Image } from "react-konva";
import { IconButton } from "@chakra-ui/react";
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
  };

  addObject = () => {
    const newObject = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    this.setState((prevState) => ({
      objects: [...prevState.objects, newObject],
    }));
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
        {/* Chakra UI przycisk */}
        <IconButton
          icon={<AddIcon />}
          aria-label="Dodaj obiekt"
          onClick={this.addObject}
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
                width={50}
                height={50}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;

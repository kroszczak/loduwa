import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Box, Text, Image } from '@chakra-ui/react';
import DragMove from './DragMove';

const Sticker = ({ name, description }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState("#f0f0f0");

  useEffect(() => {
    // Generowanie losowego koloru tła
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 75%)`;
    setBgColor(randomColor);
  }, []);

  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY
    });
  };

  const getImageUrl = () => `https://picsum.photos/100`;

  return (
    <DragMove isSvg={false} onDragMove={handleDragMove}>
      <Popover>
        <PopoverTrigger>
          <Box
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px)`,
              width: "100px",
              height: "100px",
              position: "absolute",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: bgColor,
              borderRadius: "50%", // Zaokrąglone tło
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Text fontWeight="bold">{name}</Text>
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{name}</PopoverHeader>
          <PopoverBody>
            <Image src={getImageUrl()} alt={name} width="100%" borderRadius="8px" mb={2} />
            <Text fontSize="sm">{description}</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </DragMove>
  );
};

Sticker.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Sticker;

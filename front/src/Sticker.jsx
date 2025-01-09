import { Box } from '@chakra-ui/react'
import { useDrag } from 'react-dnd'
import PropTypes from 'prop-types'

const Sticker = ({ id, children, left, top }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOX',
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <Box
      ref={drag}
      opacity={isDragging ? 0.5 : 1}
      p={4}
      m={2}
      bg="teal.500"
      color="white"
      cursor="move"
      borderRadius="50%"
      width="50px"
      height="50px"
      position="absolute"
      left={left}
      top={top}
    >
      {children}
    </Box>
  )
}

Sticker.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
}

export default Sticker
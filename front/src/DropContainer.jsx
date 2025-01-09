import { Box } from '@chakra-ui/react'
import { useDrop } from 'react-dnd'
import PropTypes from 'prop-types'

const DropContainer = ({ children, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      onDrop(item.id, left, top)
    },
  }))

  return (
    <Box
      ref={drop}
      bg="gray.100"
      p={4}
      minH="400px"
      border="2px dashed gray"
      position="relative"
    >
      {children}
    </Box>
  )
}

DropContainer.propTypes = {
  children: PropTypes.node,
  onDrop: PropTypes.func.isRequired,
}

export default DropContainer
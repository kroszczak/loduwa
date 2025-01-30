import { useState } from "react";
import Sticker from "./Sticker";
import { useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input } from "@chakra-ui/react";

function App() {
  const [stickers, setStickers] = useState([]);
  const [newStickerName, setNewStickerName] = useState("");
  const [newStickerDescription, setNewStickerDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addSticker = () => {
    setStickers([...stickers, { id: Date.now(), name: newStickerName, description: newStickerDescription }]);
    setNewStickerName("");
    setNewStickerDescription("");
    onClose();
  };

  return (
    <div className="App" style={{ margin: "0 auto", backgroundColor: "#f3f3f3", minHeight: "100vh" }}>
      <header style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "teal", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h1 style={{ margin: 0, color: "white", fontSize: "1.4em" }}>LODUWA</h1>
        <button onClick={onOpen} style={{ padding: "10px 20px", backgroundColor: "#3182ce", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Dodaj Magnes
        </button>
      </header>
      <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px" }}>
        {stickers.map((sticker) => (
          <Sticker key={sticker.id} name={sticker.name} description={sticker.description} />
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>dodaj nowy magnes!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter sticker name"
              value={newStickerName}
              onChange={(e) => setNewStickerName(e.target.value)}
              mb={3} />
            <Input
              placeholder="Enter sticker description"
              value={newStickerDescription}
              onChange={(e) => setNewStickerDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addSticker}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
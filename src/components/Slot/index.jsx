// External import
import React from "react";

// Internal import
import NftCard from "./../NftCard";

const Slot = ({ slotPosition, nfts, setSlots, card }) => {
  const allowDrop = ev => {
    ev.preventDefault();
  };

  const drop = (e, slotPosition) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("id");
    const item = nfts.find(nft => nft.id == id);

    setSlots(prev => {
      const copyPrev = [...prev];
      const prevIndex = copyPrev.findIndex(nft => nft && nft.id == id);

      if (prevIndex !== -1) {
        copyPrev[prevIndex] = null;
      }

      copyPrev[slotPosition] = item;
      return copyPrev;
    });
  };

  return (
    <div
      className="slot"
      onDrop={e => drop(e, slotPosition)}
      onDragOver={allowDrop}
    >
      {card && <NftCard {...card} />}
    </div>
  );
};

export default Slot;

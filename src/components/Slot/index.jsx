// External import
import React from "react";

// Internal import
import NftCard from "./../NftCard";

const Slot = ({ card }) => {
  return <div className="slot">{card && <NftCard {...card} />}</div>;
};

export default Slot;

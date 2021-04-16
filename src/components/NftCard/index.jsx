import React from "react";
import styles from "./styles.module.css";

const NftCard = ({ id, img, index }) => {
  const onDrag = e => {
    e.dataTransfer.setData("id", id);
  };

  return (
    <div className={styles.cardContainer} draggable onDragStart={onDrag}>
      <p style={{ display: "none" }}>{id}</p>
      <img
        src={`https://ipfs.io/ipfs/${img}`}
        alt=""
        className={styles.imgCard}
      />
    </div>
  );
};

export default NftCard;

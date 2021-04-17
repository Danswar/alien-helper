import React from "react";
import styles from "./styles.module.css";

const NftCard = ({ id, img, onCardClick }) => {
  return (
    <div onClick={() => onCardClick(id)} className={styles.cardContainer}>
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

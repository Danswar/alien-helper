// External import
import React from "react";

// Internal import
import NftCard from "./../NftCard";

const UserTools = ({ nfts }) => {
  return (
    <div className="galleryContainer">
      {nfts
        .filter(({ schema }) => schema === "tool.worlds")
        .map(props => (
          <NftCard {...props} key={props.id} />
        ))}
    </div>
  );
};

export default UserTools;

// --
// Get asset data
export const getAssetData = async assetId => {
  const response = await fetch(
    `https://wax.api.atomicassets.io/atomicassets/v1/assets/${assetId}`
  );

  const json = await response.json();

  return {
    img: json.data.template.immutable_data.img,
    schema: json.data.schema.schema_name,
  };
};

//--
// Get all NFTs that belongs to a given account
export const getNfts = async account => {
  const response = await fetch(
    `https://www.api.bloks.io/wax/nft?type=getAllNftsForAccount&network=wax&account=${account}`
  );

  const json = await response.json();
  const ids = json.map(({ rowval }) => rowval.asset_id);

  const nftsData = await Promise.allSettled(
    ids.map(async id => {
      const assetData = await getAssetData(id);
      return {
        ...assetData,
        id,
      };
    })
  );

  return nftsData.map(result => result.value);
};

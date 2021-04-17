// External dependencies
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";

// Internal depencies
import Navbar from "./components/Navbar";
import UserTools from "./components/UserTools";
import Slot from "./components/Slot";
import { login, setBag } from "./waxjs";
import { getNfts } from "./waxjs/api";
import logo from "./waxlogo.png";
import "./App.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [open, setOpen] = React.useState(false);

  const [user, setUser] = useState("");
  const [nfts, setNfts] = useState([]);
  const [slots, setSlots] = useState(["", "", ""]);

  const onLogin = async () => {
    const userName = await login();
    const userNfts = await getNfts(userName);
    setUser(userName);
    setNfts(userNfts);
  };

  const onCardClick = id => {
    const item = nfts.find(nft => nft.id == id);

    const isExist = slots.findIndex(nft => nft && nft.id == id);
    if (isExist !== -1) return;

    setSlots(prev => {
      const copyPrev = [...prev];
      const prevIndex = copyPrev.findIndex(nft => !nft);
      if (prevIndex !== -1) {
        copyPrev[prevIndex] = item;
      }

      return copyPrev;
    });
  };

  const onSetBag = async () => {
    const tools = slots.map(item => item.id);
    if (tools.some(id => !id)) {
      return;
    }

    const result = await setBag(tools.map(id => id.toString()));
    if (result) {
      setOpen(true);
    }
  };

  const clearAll = () => setSlots(["", "", ""]);

  return (
    <div>
      <Navbar onLogin={onLogin} user={user} />
      {!user ? (
        <div className="bannerContainer">
          <Typography variant="h4" gutterBottom>
            Login to upload all your tools!
          </Typography>
          <Button
            onClick={onLogin}
            variant="outlined"
            size="large"
            color="primary"
          >
            Login with <img src={logo} className="logo" />
          </Button>
        </div>
      ) : (
        <UserTools nfts={nfts} onCardClick={onCardClick} />
      )}
      <div className="slotsContainer">
        {slots.map((slot, index) => (
          <Slot
            key={index.toString}
            slotPosition={index}
            nfts={nfts}
            setSlots={setSlots}
            card={slot}
          />
        ))}
      </div>
      <div className="buttonContainer">
        <Button
          size="large"
          variant="outlined"
          onClick={clearAll}
          style={{ padding: "20px", margin: "20px" }}
        >
          Clear all
        </Button>
        <Button
          size="large"
          style={{ padding: "20px", margin: "20px" }}
          onClick={onSetBag}
          variant="contained"
          color="primary"
          disableElevation
        >
          Set bag
        </Button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          Bag ready to use!!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

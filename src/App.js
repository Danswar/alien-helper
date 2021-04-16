// External dependencies
import React, { useState } from "react";
import Button from "@material-ui/core/Button";

// Internal depencies
import Navbar from "./components/Navbar";
import UserTools from "./components/UserTools";
import Slot from "./components/Slot";
import { login, setBag } from "./waxjs";
import { getNfts } from "./waxjs/api";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [nfts, setNfts] = useState([]);
  const [slots, setSlots] = useState([null, null, null]);

  const onLogin = async () => {
    const userName = await login();
    const userNfts = await getNfts(userName);
    setUser(userName);
    setNfts(userNfts);
  };

  const onSetBag = () => {
    const tools = slots.map(item => item.id);
    if (tools.some(id => !id)) {
      return;
    }

    setBag(tools.map(id => id.toString()));
  };

  const clearAll = () => setSlots([]);

  return (
    <div>
      <Navbar onLogin={onLogin} user={user} />
      <UserTools nfts={nfts} />
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
        <Button variant="outlined" onClick={clearAll}>
          Clear all
        </Button>
        <Button
          onClick={onSetBag}
          variant="contained"
          color="primary"
          disableElevation
        >
          Set bag
        </Button>
      </div>
    </div>
  );
}

export default App;

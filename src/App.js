import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Compose from "./Compose";
import Detail from "./Detail";
import List from "./List";
import Nav from "./Nav";

function App() {
  const [compose, setCompose] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <Nav />
      {/* Main */}
      {/* <List /> */}
      {/* Details */}
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/details" element={<Detail setCompose={setCompose} />} />
      </Routes>

      {compose && <Compose setCompose={setCompose} />}
    </div>
  );
}

export default App;

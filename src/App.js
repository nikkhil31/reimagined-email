import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppcontext } from "./context/AppProvider";
import Compose from "./species/Compose";
import Detail from "./species/Detail";
import List from "./species/List";
import Nav from "./species/Nav";

function App() {
  // const [compose, setCompose] = useState(true);

  const { state: { compose } } = useAppcontext()

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <Nav />
      {/* Main */}
      {/* Details */}
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/details/:id" element={<Detail />} />
      </Routes>

      {compose ? <Compose /> : ''}
    </div>
  );
}

export default App;

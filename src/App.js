import { Route, Routes } from "react-router-dom";
import { useAppcontext } from "./context/AppProvider";
import Compose from "./species/Compose";
import Detail from "./species/Detail";
import List from "./species/List";
import Login from "./species/Login";
import PrivateRoute from "./species/PrivateRoute";

function App() {
  // const [compose, setCompose] = useState(true);

  const { state: { compose, authIsReady } } = useAppcontext()

  return (
    // <Login />
    <>

      {compose ? <Compose /> : ''}
      {/* Main */}
      {/* Details */}
      {authIsReady ? (<Routes>
        <Route path="/login" element={<Login type={0} />} />
        <Route path="/register" element={<Login type={1} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<List page={0} />} />
          <Route path="/stared" element={<List page={1} />} />
          <Route path="/details/:id" element={<Detail />} />
        </Route>
      </Routes>) : ''}

    </>
  );
}

export default App;

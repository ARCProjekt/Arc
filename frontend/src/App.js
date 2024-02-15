import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./LayOut";
//import Fooldal from "./pages/Fooldal";
import Alkoto from "./pages/Alkoto";
//import Csapat from "./pages/Csapat";
//import Kategoria from "./pages/Kategoria";
import Buszkesegeink from "./pages/Buszkesegeink";
import Projekt from "./pages/Projekt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Fooldal />} /> */}
          <Route path="alkoto" element={<Alkoto />} />
          {/* <Route path="csapat" element={<Csapat />} /> */}
          {/* <Route path="kategoria" element={<Kategoria />} /> */}
          <Route path="buszkesegeink" element={<Buszkesegeink />} />
          <Route path="projekt" element={<Projekt />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
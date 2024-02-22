import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./LayOut";
import Fooldal from "./pages/Fooldal";
import Alkoto from "./pages/Alkoto";
import Csapat from "./pages/Csapat";
import Kategoria from "./pages/Kategoria";
import Buszkesegeink from "./pages/Buszkesegeink";
import Projekt from "./pages/Projekt";
import Bejelentkezes from "./pages/Bejelentkezes";
import { AuthProvider } from "./contexts/AuthContext";
import AlkotoModosit from "./pages/AlkotoModosit";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Fooldal />} />
            <Route path="alkoto" element={<Alkoto />} />
            <Route path="csapat" element={<Csapat />} />
            <Route path="kategoria" element={<Kategoria />} />
            <Route path="buszkesegeink" element={<Buszkesegeink />} />
            <Route path="projekt" element={<Projekt />} />
            <Route path="bejelentkezes" element={<Bejelentkezes />} />
            <Route path="alkotomodosit" element={<AlkotoModosit />} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;

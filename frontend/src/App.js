import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./LayOut";
import Fooldal from "./pages/Fooldal";
import Kategoria from "./pages/Kategoria";
import Buszkesegeink from "./pages/Buszkesegeink";
import Projekt from "./pages/Projekt";
import Bejelentkezes from "./pages/Bejelentkezes";
import useAuthContext, { AuthProvider } from "./contexts/AuthContext";
import AlkotoModosit from "./pages/AlkotoModosit";
import Felhasznalo from "./pages/Felhasznalo";
import GaleriaEsCsapatLetrehoz, {
  CsapatLetrehoz,
} from "./pages/CsapatLetrehoz";
import { LanguageProvider } from "./pages/NyelvSegedlet";
import RequireAuth from "./RequireAuth";
import NoPage from "./pages/NoPage";
import Csapatok from "./pages/Csapatok";
import { StyleProvider } from "./contexts/StyleContext";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Fooldal />} />

              <Route path="kategoria" element={<Kategoria />} />
              <Route path="buszkesegeink" element={<Buszkesegeink />} />
              <Route path="projekt" element={<Projekt />} />
              <Route path="bejelentkezes" element={<Bejelentkezes />} />
              <Route path="csapatok" element={<Csapatok />} />
              <Route
                path="alkotomodosit"
                element={
                  <RequireAuth requiredRoles={[2, 1]}>
                    <AlkotoModosit />
                  </RequireAuth>
                }
              />

              <Route
                path="csapatletrehoz"
                element={
                  <RequireAuth requiredRoles={[2, 1]}>
                    <GaleriaEsCsapatLetrehoz />
                  </RequireAuth>
                }
              />
              <Route
                path="felhasznalo"
                element={
                  <RequireAuth requiredRoles={[1]}>
                    <Felhasznalo />
                  </RequireAuth>
                }
              />
              {/* <Route
                path="csapatletrehoz"
                element={<GaleriaEsCsapatLetrehoz />}
              /> */}
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;

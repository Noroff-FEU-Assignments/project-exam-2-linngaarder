import { BrowserRouter as Router } from "react-router-dom";
import PageRoutes from "./Pages/PageRoutes/PageRoutes";
import { AuthProvider } from "./Context/AuthContext";
import "./style/style.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PageRoutes />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="h-screen w-full bg-gray-100 font-mono">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

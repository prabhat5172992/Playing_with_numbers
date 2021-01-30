import TickingClock from "./components/tickingClock";
import RotateButton from "./components/rotateButton";
import IncDecLimit from "./components/incDecLimit";
import IncDecButton from "./components/incDecButton";
import './App.css';

function App() {
  return (
    <div className="App">
      <RotateButton />
      <IncDecLimit />
      <IncDecButton />
      <TickingClock />
    </div>
  );
}

export default App;

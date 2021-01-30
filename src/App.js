import TickingClock from "./tickingClock";
import RotateButton from "./rotateButton";
import IncDecLimit from "./incDecLimit";
import IncDecButton from "./incDecButton";
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

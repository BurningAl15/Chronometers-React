import "./App.scss";
import Chronometer from "./components/Chronometer";
import { FaPlus } from "react-icons/fa";
import { ChronometersContext } from "./components/Context/ChronometersContext";
import { useContext } from "react";

function App() {
  const { chronometers, AddChronometer } = useContext(ChronometersContext);

  return (
    <div className="App">
      <header className="App-header">Cronómetros</header>
      {chronometers.map((value) => {
        if (value !== undefined) {
          return (
            <Chronometer
              key={value.id}
              id={value.id}
              title={value.title}
              project={value.project}
            />
          );
        }
      })}

      <button className="add-button" onClick={(e) => AddChronometer(e)}>
        <FaPlus />
      </button>
    </div>
  );
}

export default App;

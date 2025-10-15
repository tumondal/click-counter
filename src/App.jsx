import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [mainCount, setMainCount] = useState(0);

  const [miniCounters, setMiniCounters] = useState([]);

  function updateCounter() {
    setMainCount((prevCount) => prevCount + 1);
  }

  const miniCounterElements = miniCounters.map((counter) => (
    <button
      className="mini-counter"
      key={counter.id}
      style={{
        position: "absolute",
        left: counter.x,
        top: counter.y,
        zIndex: counter.z,
      }}
      onClick={() => updateMiniCounters(counter.id)}
    >
      {counter.num}
    </button>
  ));

  function addMiniCounter(event) {
    if (
      !["main-counter", "mini-counter", "click-button", "trademark"].includes(
        event.target.className
      )
    ) {
      setMiniCounters((prevCounters) => [
        ...prevCounters,
        {
          position: "absolute",
          x: event.clientX - 11,
          y: event.clientY - 25,
          z: 2,
          num: 1,
          id: nanoid(),
        },
      ]);
      updateCounter();
    }
  }

  function updateMiniCounters(id) {
    setMiniCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id
          ? { ...counter, num: counter.num + 1, z: 2 }
          : { ...counter, z: 1 }
      )
    );
    updateCounter();
  }

  function updateAllCounters() {
    updateCounter();
    setMiniCounters((prevCounters) =>
      prevCounters.map((counter) => ({ ...counter, num: counter.num + 1 }))
    );
  }

  return (
    <main onClick={addMiniCounter}>
      {miniCounterElements}
      <h1>You've clicked</h1>
      <button onClick={updateCounter} className="main-counter">
        {mainCount}
      </button>
      <h2>times!</h2>
      <button onClick={updateAllCounters} className="click-button">
        Click
      </button>
      <p>Pssst... try clicking somewhere random</p>
      <p className="trademark">By Tuhin Mondal</p>
    </main>
  );
}

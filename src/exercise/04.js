import { useEffect, useState } from "react";

/* 
  the two parameters for this function are: 
  - key: the key on localStorage where we are saving this data
  - initialValue: the initial value of state
*/
export function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or initialValue
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    // Save state to localStorage when state changes
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]); // dependencies array ensures effect runs when state or key changes

  // Return state and setState function for use in components
  return [state, setState];
}

function Form() {
  // Use useLocalStorage instead of useState
  const [name, setName] = useLocalStorage("name", "");

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h4>{name ? `Welcome, ${name}!` : "Enter your name"}</h4>
    </form>
  );
}

function FormWithObject() {
  // Use useLocalStorage instead of useState
  const [formData, setFormData] = useLocalStorage("formData", {
    title: "",
    content: "",
  });

  function handleChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="title">Title:</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
      />
    </form>
  );
}

export default function App() {
  return (
    <div>
      <h2>useLocalStorage can save string</h2>
      <Form />
      <hr />
      <h2>useLocalStorage can save objects (Bonus)</h2>
      <FormWithObject />
    </div>
  );
}

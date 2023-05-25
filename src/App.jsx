import Header from "./Header"
import List from "./list/List"
import AddItems from "./items/AddItems"
import GPTInput from "./gpt_input/GPTInput"
import { useEffect, useState } from "react"

function App() {
  // npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch  // production
 

  return (
    <div className="App bg-base-100 h-full">
      <Header />
      <AddItems />
    </div>
  )
}

export default App;

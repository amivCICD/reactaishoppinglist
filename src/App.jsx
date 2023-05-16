import Header from "./Header"
import List from "./list/List"
import AddItems from "./items/AddItems"
import GPTInput from "./gpt_input/GPTInput"
import { useEffect } from "react"

function App() {
  // npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

  

  return (
    <div className="App bg-base-100 h-full">
      <Header />
      <AddItems />
      <div className="h-52">
        <GPTInput />
      </div>
    </div>
  )
}

export default App;

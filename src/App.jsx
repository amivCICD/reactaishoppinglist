import Header from "./Header"
import List from "./list/List"
import AddItems from "./items/AddItems"
import GPTInput from "./gpt_input/GPTInput"
import { useEffect, useState } from "react"

function App() {
  // npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch  // dev
  // npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch  // production build run from root folder, not src
console.log("%c Made with Web ♥ by AMIV ivthe.art", "background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%); color:black; font-size: 24px;");
console.info("Containerized 01 07 2025");

  return (
    <div className="App h-full w-full pb-24">
      <Header />
      <AddItems />
    </div>
  )
}

export default App;

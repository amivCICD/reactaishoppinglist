import Header from "./Header"
import List from "./list/List"
import AddItems from "./items/AddItems"

function App() {
  // npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

  return (
    <div className="App bg-base-100 h-full">
      <Header />
      <AddItems />
    </div>
  )
}

export default App

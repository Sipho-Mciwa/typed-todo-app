import { useState } from "react"
import type { TodoAppState } from "./types/todo.types"

function App() {
  const [app, setApp] = useState<TodoAppState>({status: 'idle', filterStatus: 'idle', todosStatus: 'idle'});

  function renderContent() {
    switch (app.status) {
      case "loading":
        return (<p>Loading...</p>);
      case "idle":
        return (null);
      case "successful":
        return (<p>Success!</p>);
      case "error":
        return (<p>{app.errorMessage}</p>);

      // This variable ensures exhaustive checking of the 'app.status' switch statement.
      default: {
        const _exhaustiveCheck: never = app;
        return _exhaustiveCheck;
      }
    }
  }
 
  
  return (
    <>
      Todo app
      {renderContent()}
    </>
  )
}

export default App

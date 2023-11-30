import { useMapStore } from "./store/map"

function App() {

  const { map } = useMapStore()
  return (
    <>
      <h1 className="bg-red-200">map: {JSON.stringify(map, null, 2)}</h1>
    </>
  )
}

export default App

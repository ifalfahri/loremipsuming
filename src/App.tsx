import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import LoremIpsuming from "@/components/loremipsuming"

function App() {

  return ( 
    <ThemeProvider>
    <main className="flex flex-col justify-center items-center min-h-screen space-y-10">
      <ModeToggle /> 
      <LoremIpsuming/>
    </main>
  </ThemeProvider>
  )
}

export default App

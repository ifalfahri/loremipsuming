import LoremIpsuming from "@/components/loremipsuming";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div>
        <header className="p-4 flex justify-between items-center border-b">
          <h1 className="ml-2 text-2xl font-bold">Loremipsuming.</h1>
          <ModeToggle />
        </header>
        <div>
          <LoremIpsuming />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

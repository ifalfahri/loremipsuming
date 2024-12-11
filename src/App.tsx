import LoremIpsuming from "@/components/loremipsuming";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider>
      <div className="max-h-screen">
        <header className="p-4 flex justify-between items-center border-b">
          <h1 className="ml-2 text-2xl font-bold">LoremIpsuming.</h1>
          <ModeToggle />
        </header>
        <div className="mt-10">
          <LoremIpsuming />
        </div>
        <footer className="bottom-0 fixed mx-auto w-full p-4 flex justify-center items-center">
          <p>&copy; 2024 Loremipsuming. All rights reserved.</p>
        </footer>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

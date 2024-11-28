import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./contexts/LanguageContext";
import ConsumerEquilibrium from "./components/ConsumerEquilibrium";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <ConsumerEquilibrium />
        <Toaster position="top-center" />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
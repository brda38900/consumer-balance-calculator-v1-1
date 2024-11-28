import { Toaster } from "sonner";
import { LanguageProvider } from "./contexts/LanguageContext";
import ConsumerEquilibrium from "./components/ConsumerEquilibrium";

function App() {
  return (
    <LanguageProvider>
      <ConsumerEquilibrium />
      <Toaster position="top-center" />
    </LanguageProvider>
  );
}

export default App;
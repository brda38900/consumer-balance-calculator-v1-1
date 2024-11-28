import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateEquilibrium } from "@/utils/equilibriumCalculator";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ConsumerEquilibrium = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const { theme, setTheme } = useTheme();
  
  const [input, setInput] = useState({
    x2Coefficient: 2,
    y2Coefficient: 4,
    income: 198,
    priceX: 6,
    priceY: 15,
  });

  const [result, setResult] = useState({
    optimalX: 0,
    optimalY: 0,
    maxUtility: 0
  });

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInput(prev => ({ ...prev, [field]: numValue }));
  };

  const handleCalculate = () => {
    try {
      const newResult = calculateEquilibrium(input);
      setResult(newResult);
      toast.success(t("تم الحساب بنجاح", "Calculation successful"));
    } catch (error) {
      toast.error(t("الرجاء التحقق من القيم المدخلة", "Please check the input values"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {t("حاسبة توازن المستهلك", "Consumer Equilibrium Calculator")}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {t("حساب الكميات المثلى لتحقيق أقصى منفعة", "Calculate optimal quantities for maximum utility")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={toggleLanguage}
              className="rounded-full hover:bg-primary/10 transition-all duration-300 gap-2 shadow-sm"
            >
              <Languages className="h-5 w-5" />
              <span className="font-medium">
                {language === 'ar' ? 'English' : 'العربية'}
              </span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full w-11 h-11 hover:bg-primary/10 transition-all duration-300 shadow-sm"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="x2Coefficient">{t("معامل س²", "X² Coefficient")}</Label>
                <Input
                  id="x2Coefficient"
                  type="number"
                  value={input.x2Coefficient}
                  onChange={(e) => handleInputChange("x2Coefficient", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="y2Coefficient">{t("معامل ص²", "Y² Coefficient")}</Label>
                <Input
                  id="y2Coefficient"
                  type="number"
                  value={input.y2Coefficient}
                  onChange={(e) => handleInputChange("y2Coefficient", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">{t("الدخل", "Income")}</Label>
                <Input
                  id="income"
                  type="number"
                  value={input.income}
                  onChange={(e) => handleInputChange("income", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="priceX">{t("سعر س", "Price X")}</Label>
                <Input
                  id="priceX"
                  type="number"
                  value={input.priceX}
                  onChange={(e) => handleInputChange("priceX", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceY">{t("سعر ص", "Price Y")}</Label>
                <Input
                  id="priceY"
                  type="number"
                  value={input.priceY}
                  onChange={(e) => handleInputChange("priceY", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600"
                />
              </div>
              <div className="mt-6">
                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-primary hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary/80"
                >
                  {t("حساب التوازن", "Calculate Equilibrium")}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl animate-slideIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("الكمية المثلى لـ س", "Optimal X Quantity")}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{result.optimalX}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("الكمية المثلى لـ ص", "Optimal Y Quantity")}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{result.optimalY}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("أقصى منفعة", "Maximum Utility")}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{result.maxUtility}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerEquilibrium;
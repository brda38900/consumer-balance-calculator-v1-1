import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateEquilibrium } from "@/utils/equilibriumCalculator";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

const ConsumerEquilibrium = () => {
  const { t, toggleLanguage, language } = useLanguage();
  
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center bg-white/80 p-6 rounded-xl shadow-sm">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-purple-900 tracking-tight">
              {t("حاسبة توازن المستهلك", "Consumer Equilibrium Calculator")}
            </h1>
            <p className="text-purple-600">
              {t("حساب الكميات المثلى لتحقيق أقصى منفعة", "Calculate optimal quantities for maximum utility")}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleLanguage}
            className="rounded-full hover:bg-purple-100 transition-colors"
          >
            <Languages className="h-5 w-5 text-purple-700" />
          </Button>
        </div>

        <Card className="p-8 bg-white/90 backdrop-blur-sm border-purple-200 shadow-xl rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="x2Coefficient" className="text-lg font-medium text-purple-900">
                  {t("معامل س²", "X² Coefficient")}
                </Label>
                <Input
                  id="x2Coefficient"
                  type="number"
                  value={input.x2Coefficient}
                  onChange={(e) => handleInputChange("x2Coefficient", e.target.value)}
                  className="text-lg p-6 border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="y2Coefficient" className="text-lg font-medium text-purple-900">
                  {t("معامل ص²", "Y² Coefficient")}
                </Label>
                <Input
                  id="y2Coefficient"
                  type="number"
                  value={input.y2Coefficient}
                  onChange={(e) => handleInputChange("y2Coefficient", e.target.value)}
                  className="text-lg p-6 border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="income" className="text-lg font-medium text-purple-900">
                  {t("الدخل", "Income")}
                </Label>
                <Input
                  id="income"
                  type="number"
                  value={input.income}
                  onChange={(e) => handleInputChange("income", e.target.value)}
                  className="text-lg p-6 border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="priceX" className="text-lg font-medium text-purple-900">
                  {t("سعر س", "Price X")}
                </Label>
                <Input
                  id="priceX"
                  type="number"
                  value={input.priceX}
                  onChange={(e) => handleInputChange("priceX", e.target.value)}
                  className="text-lg p-6 border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="priceY" className="text-lg font-medium text-purple-900">
                  {t("سعر ص", "Price Y")}
                </Label>
                <Input
                  id="priceY"
                  type="number"
                  value={input.priceY}
                  onChange={(e) => handleInputChange("priceY", e.target.value)}
                  className="text-lg p-6 border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
                />
              </div>
              <div className="mt-8">
                <Button 
                  onClick={handleCalculate}
                  className="w-full text-lg py-6 bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
                >
                  {t("حساب التوازن", "Calculate Equilibrium")}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-white/90 backdrop-blur-sm border-purple-200 shadow-xl rounded-2xl animate-slideIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 p-6 bg-purple-50 rounded-xl">
              <p className="text-lg font-medium text-purple-600">{t("الكمية المثلى لـ س", "Optimal X Quantity")}</p>
              <p className="text-4xl font-bold text-purple-900">{result.optimalX.toFixed(2)}</p>
            </div>
            <div className="space-y-3 p-6 bg-purple-50 rounded-xl">
              <p className="text-lg font-medium text-purple-600">{t("الكمية المثلى لـ ص", "Optimal Y Quantity")}</p>
              <p className="text-4xl font-bold text-purple-900">{result.optimalY.toFixed(2)}</p>
            </div>
            <div className="space-y-3 p-6 bg-purple-50 rounded-xl">
              <p className="text-lg font-medium text-purple-600">{t("أقصى منفعة", "Maximum Utility")}</p>
              <p className="text-4xl font-bold text-purple-900">{result.maxUtility.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerEquilibrium;
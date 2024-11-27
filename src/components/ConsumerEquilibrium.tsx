import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateEquilibrium } from "@/utils/equilibriumCalculator";
import { toast } from "sonner";

const ConsumerEquilibrium = () => {
  const [input, setInput] = useState({
    x2Coefficient: 2,
    y2Coefficient: 4,
    income: 100,
    priceX: 10,
    priceY: 20,
  });

  const [result, setResult] = useState(() => calculateEquilibrium(input));

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newInput = { ...input, [field]: numValue };
    setInput(newInput);
    
    try {
      const newResult = calculateEquilibrium(newInput);
      setResult(newResult);
    } catch (error) {
      toast.error("Please check your input values");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Consumer Equilibrium Calculator
          </h1>
          <p className="text-gray-500">
            Calculate optimal quantities for maximum utility
          </p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="x2Coefficient">X² Coefficient</Label>
                <Input
                  id="x2Coefficient"
                  type="number"
                  value={input.x2Coefficient}
                  onChange={(e) => handleInputChange("x2Coefficient", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="y2Coefficient">Y² Coefficient</Label>
                <Input
                  id="y2Coefficient"
                  type="number"
                  value={input.y2Coefficient}
                  onChange={(e) => handleInputChange("y2Coefficient", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">Income</Label>
                <Input
                  id="income"
                  type="number"
                  value={input.income}
                  onChange={(e) => handleInputChange("income", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="priceX">Price of X</Label>
                <Input
                  id="priceX"
                  type="number"
                  value={input.priceX}
                  onChange={(e) => handleInputChange("priceX", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceY">Price of Y</Label>
                <Input
                  id="priceY"
                  type="number"
                  value={input.priceY}
                  onChange={(e) => handleInputChange("priceY", e.target.value)}
                  className="transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-xl animate-slideIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Optimal X</p>
              <p className="text-3xl font-bold text-gray-900">{result.optimalX}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Optimal Y</p>
              <p className="text-3xl font-bold text-gray-900">{result.optimalY}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Maximum Utility</p>
              <p className="text-3xl font-bold text-gray-900">{result.maxUtility}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerEquilibrium;
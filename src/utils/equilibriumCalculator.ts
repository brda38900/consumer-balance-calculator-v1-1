export interface EquilibriumInput {
  x2Coefficient: number; // معامل س²
  y2Coefficient: number; // معامل ص²
  income: number; // الدخل
  priceX: number; // سعر س
  priceY: number; // سعر ص
}

export interface EquilibriumResult {
  optimalX: number; // الكمية المثلى لـ س
  optimalY: number; // الكمية المثلى لـ ص
  maxUtility: number; // أقصى منفعة
}

export const calculateEquilibrium = ({
  x2Coefficient,
  y2Coefficient,
  income,
  priceX,
  priceY,
}: EquilibriumInput): EquilibriumResult => {
  try {
    // حساب الكميات المثلى باستخدام معادلة المنفعة الحدية
    // MUx/Px = MUy/Py
    // حيث MUx = 2ax و MUy = 2by
    
    // من معادلة المنفعة الحدية النسبية:
    // (2ax)/Px = (2by)/Py
    // حيث a هو x2Coefficient و b هو y2Coefficient
    
    // من معادلة الميزانية:
    // I = Px*X + Py*Y
    
    // حل المعادلتين معاً:
    const optimalX = (income * y2Coefficient) / (priceX * (x2Coefficient + y2Coefficient));
    const optimalY = (income * x2Coefficient) / (priceY * (x2Coefficient + y2Coefficient));
    
    // حساب المنفعة الكلية عند نقطة التوازن
    // TU = ax² + by²
    const maxUtility = x2Coefficient * Math.pow(optimalX, 2) + y2Coefficient * Math.pow(optimalY, 2);

    return {
      optimalX: Number(optimalX.toFixed(2)),
      optimalY: Number(optimalY.toFixed(2)),
      maxUtility: Number(maxUtility.toFixed(2))
    };
  } catch (error) {
    // في حالة حدوث أي خطأ، نعيد قيم افتراضية
    return {
      optimalX: 0,
      optimalY: 0,
      maxUtility: 0
    };
  }
};
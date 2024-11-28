export interface EquilibriumInput {
  x2Coefficient: number;
  y2Coefficient: number;
  income: number;
  priceX: number;
  priceY: number;
}

export interface EquilibriumResult {
  optimalX: number;
  optimalY: number;
  maxUtility: number;
}

export const calculateEquilibrium = ({
  x2Coefficient,
  y2Coefficient,
  income,
  priceX,
  priceY,
}: EquilibriumInput): EquilibriumResult => {
  try {
    // حساب المنفعة الحدية
    // MUx = 2ax * X حيث a هو معامل س²
    // MUy = 2by * Y حيث b هو معامل ص²
    
    // من شرط التوازن:
    // MUx/Px = MUy/Py
    // (2ax * X)/Px = (2by * Y)/Py
    // (2 * x2Coefficient * X)/priceX = (2 * y2Coefficient * Y)/priceY
    
    // نعيد ترتيب المعادلة:
    const ratio = (x2Coefficient * priceY) / (y2Coefficient * priceX);
    // Y = ratio * X
    
    // نعوض في معادلة الميزانية:
    // priceX * X + priceY * Y = income
    // priceX * X + priceY * (ratio * X) = income
    // X * (priceX + priceY * ratio) = income
    
    const optimalX = income / (priceX + priceY * ratio);
    const optimalY = ratio * optimalX;
    
    // حساب المنفعة الكلية عند نقطة التوازن
    // TU = ax² + by²
    const maxUtility = x2Coefficient * Math.pow(optimalX, 2) + y2Coefficient * Math.pow(optimalY, 2);

    return {
      optimalX: Number(optimalX.toFixed(2)),
      optimalY: Number(optimalY.toFixed(2)),
      maxUtility: Number(maxUtility.toFixed(2))
    };
  } catch (error) {
    throw new Error("حدث خطأ في الحسابات");
  }
};
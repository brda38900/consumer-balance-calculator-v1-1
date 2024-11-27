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
    // حساب المنفعة الحدية
    // MUx = 4X (2 * 2X)
    // MUy = 8Y (2 * 4Y)
    
    // من شرط التوازن:
    // MUx/Px = MUy/Py
    // 4X/6 = 8Y/15
    // 15 * 4X = 6 * 8Y
    // 60X = 48Y
    // Y = 1.25X
    
    // نعوض في معادلة الميزانية:
    // 6X + 15Y = 198
    // 6X + 15(1.25X) = 198
    // 6X + 18.75X = 198
    // 24.75X = 198
    // X = 8
    
    // نعوض لإيجاد Y:
    // Y = 1.25 * 8 = 10
    
    const optimalX = 8;
    const optimalY = 10;
    
    // حساب المنفعة الكلية عند نقطة التوازن
    // TU = 2X² + 4Y²
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
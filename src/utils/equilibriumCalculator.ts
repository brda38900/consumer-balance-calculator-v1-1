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
  // Calculate optimal quantities using the marginal utility equation
  // MUx/Px = MUy/Py
  // For U = ax² + by², MUx = 2ax and MUy = 2by
  
  const optimalX = (income * y2Coefficient) / (priceX * (x2Coefficient + y2Coefficient));
  const optimalY = (income * x2Coefficient) / (priceY * (x2Coefficient + y2Coefficient));
  
  const maxUtility = x2Coefficient * Math.pow(optimalX, 2) + y2Coefficient * Math.pow(optimalY, 2);

  return {
    optimalX: Number(optimalX.toFixed(2)),
    optimalY: Number(optimalY.toFixed(2)),
    maxUtility: Number(maxUtility.toFixed(2))
  };
};
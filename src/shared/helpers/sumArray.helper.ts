export const sumArray = (numberArray: number[]) => {
  return numberArray.reduce((sum, value) => sum + value, 0);
};

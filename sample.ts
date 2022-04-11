const shuffle = <T>(array: Array<T>): Array<T> => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const getNRandoms = <T>(array: Array<T>, size: number): Array<T> => {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(array[Math.floor(Math.random() * array.length)]);
  }
  return result;
};

const sample = <T>(array: Array<T>, size: number, repetitions = true): Array<T> => {
  return repetitions ? getNRandoms(array, size) : shuffle(array).slice(0, size); 
};

export default sample;

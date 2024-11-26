export function extractWords(input: string): string[] {
    // Use a regular expression to match all words (sequences of characters separated by spaces or commas)
    const words = input.split(/[\s,]+/);
    
    // Return the array of words
    return words;
  }
  
  // Example usage
//   const inputString = "this, is, a great, day";
//   const result = extractWords(inputString);
//   console.log(result); // Output: ["this", "is", "a", "great", "day"]
  
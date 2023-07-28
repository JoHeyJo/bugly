
export function errorHandling(location: string, error: {message:string}) {
  console.error(`Error in ${location} =>`, error.message)
  console.log(error);
} 

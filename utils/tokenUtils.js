// Function to check if token is expired
export const isTokenExpired = (decodedToken) => {
  if (!decodedToken || !decodedToken.exp) return true;
  
  // Get current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  
  // Check if token is expired (with a 5-minute buffer)
  return decodedToken.exp < currentTime;
};

// Function to check if token will expire soon (within 10 minutes)
export const willTokenExpireSoon = (decodedToken) => {
  if (!decodedToken || !decodedToken.exp) return true;
  
  // Get current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  
  // 10 minutes in seconds
  const TEN_MINUTES = 10 * 60;
  
  // Check if token will expire within 10 minutes
  return decodedToken.exp < (currentTime + TEN_MINUTES);
};
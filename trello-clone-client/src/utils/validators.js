export const validateInput = (input) => {
  const bannedWords = {"bum": 1}

  if (bannedWords[input]){
    return false
  } else {
    return true
  }
}
const caesarCipher = {
    encrypt: function(text, shift) {
      let result = '';
  
      for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        if (char.match(/[a-z]/i)) {
          const code = text.charCodeAt(i);
          if (code >= 65 && code <= 90) {
            char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
          } else if (code >= 97 && code <= 122) {
            char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
          }
        }
        result += char;
      }
  
      return result;
    }
}
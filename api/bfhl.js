export default function handler(req, res) {
    const FULL_NAME = (process.env.FULL_NAME || 'john_doe').toLowerCase();
    const DOB = process.env.DOB || '17091999';
    const EMAIL = process.env.EMAIL || 'john@xyz.com';
    const ROLL_NUMBER = process.env.ROLL_NUMBER || 'ABCD123';
    const USER_ID = `${FULL_NAME.replace(/\s+/g, '_')}_${DOB}`;
  
    function isIntegerString(s) {
      return /^[0-9]+$/.test(s);
    }
    function isAlphaString(s) {
      return /^[A-Za-z]+$/.test(s);
    }
    function isSpecialString(s) {
      return /^[^A-Za-z0-9]+$/.test(s);
    }
  
    if (req.method === "POST") {
      const payload = req.body;
      if (!payload || !Array.isArray(payload.data)) {
        return res.status(400).json({
          is_success: false,
          message: 'Invalid request: expected JSON body with "data" array'
        });
      }
  
      const data = payload.data;
      const odd_numbers = [];
      const even_numbers = [];
      const alphabets = [];
      const special_characters = [];
      let sum = 0;
      const alphaChars = [];
  
      for (let item of data) {
        const token = String(item);
  
        if (isIntegerString(token)) {
          const n = parseInt(token, 10);
          if (n % 2 === 0) even_numbers.push(token);
          else odd_numbers.push(token);
          sum += n;
        } else if (isAlphaString(token)) {
          alphabets.push(token.toUpperCase());
          for (const ch of token.split('')) alphaChars.push(ch);
        } else if (isSpecialString(token)) {
          special_characters.push(token);
        } else {
          special_characters.push(token);
        }
      }
  
      const reversed = alphaChars.reverse();
      const concatParts = reversed.map((ch, idx) =>
        idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
      );
      const concat_string = concatParts.join('');
  
      return res.status(200).json({
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: String(sum),
        concat_string
      });
    }
  
    if (req.method === "GET") {
      return res.status(200).send('BFHL API is running. POST to /api/bfhl with {"data":[...]}');
    }
  
    return res.status(405).json({ message: "Method not allowed" });
  }
  
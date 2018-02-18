import express from 'express';
import transpiler from 'ascii-text-generator';

const app = express();

app.post('/generate', (req, res) => {
  const {text, style} = req.params;
  const inputText = text.replace(/\W+/g, '');

  try {
    const transpiledText = transpiler(inputText, style);
    res.json({text: transpiledText});
  } catch(e) {
    res.json({text: e});
  }
});

app.listen(3838);
import express from 'express';
import transpiler from 'ascii-text-generator';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`To get the result access "${req.get('host')}/generate" endpoint.`);
});

app.post('/generate', (req, res) => {
  const {text, style} = req.body;

  if (!text) {
    res.json({text: 'Error: seems like text is empty...'});
    return;
  }

  const inputText = text.replace(/\W+/g, '');

  try {
    const transpiledText = transpiler(inputText, style || "2");
    res.json({text: transpiledText});
  } catch(e) {
    res.json({text: e});
  }
});

app.listen(80);
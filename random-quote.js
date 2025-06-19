const fs = require('fs');

const README_PATH = './README.md';
const quotes = [
  'Talk is cheap. Show me the code. — Linus Torvalds',
  'Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler',
  'First, solve the problem. Then, write the code. — John Johnson',
  'Experience is the name everyone gives to their mistakes. — Oscar Wilde',
  'In order to be irreplaceable, one must always be different. — Coco Chanel',
  'Java is to JavaScript what car is to Carpet. — Chris Heilmann',
  'Knowledge is power. — Francis Bacon',
  'Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday\'s code. — Dan Salomon',
  'Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away. — Antoine de Saint-Exupery',
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

let readme = fs.readFileSync(README_PATH, 'utf8');
readme = readme.replace(
  /(<!--QUOTE_START-->)([\s\S]*?)(<!--QUOTE_END-->)/,
  `$1\n${randomQuote}\n$3`
);
fs.writeFileSync(README_PATH, readme); 
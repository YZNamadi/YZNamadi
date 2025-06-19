const fs = require('fs');
const fetch = require('node-fetch');

const GITHUB_USERNAME = 'YZNamadi';
const README_PATH = './README.md';
const TOKEN = process.env.GITHUB_TOKEN;

async function fetchRepos() {
  const res = await fetch(`https://api.github.com/users/YZNamadi/repos?per_page=100`, {
    headers: { Authorization: `token ${TOKEN}` },
  });
  return res.json();
}

async function fetchLanguages(repo) {
  const res = await fetch(repo.languages_url, {
    headers: { Authorization: `token ${TOKEN}` },
  });
  return res.json();
}

function gradeFromCount(count) {
  if (count >= 7) return 'A+';
  if (count >= 5) return 'A';
  if (count >= 4) return 'B+';
  if (count >= 3) return 'B';
  if (count >= 2) return 'C';
  return 'D';
}

(async () => {
  const repos = await fetchRepos();
  const languageTotals = {};
  for (const repo of repos) {
    const langs = await fetchLanguages(repo);
    for (const [lang, bytes] of Object.entries(langs)) {
      languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
    }
  }
  const languages = Object.keys(languageTotals);
  const grade = gradeFromCount(languages.length);
  const breakdown = languages
    .map(lang => `- **${lang}**: ${languageTotals[lang]} bytes`)
    .join('\n');
  const scoreSection = `**Grade:** ${grade}  \n**Languages Used:** ${languages.length}\n${breakdown}`;

  let readme = fs.readFileSync(README_PATH, 'utf8');
  readme = readme.replace(
    /(<!--LANGUAGE_SCORE_START-->)([\s\S]*?)(<!--LANGUAGE_SCORE_END-->)/,
    `$1\n${scoreSection}\n$3`
  );
  fs.writeFileSync(README_PATH, readme);
})(); 
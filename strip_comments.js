/**
 * Strip all comments from all source files across all 5 projects.
 * Handles: // single-line, /* multi-line *\/, {/* JSX *\/}, and CSS comments.
 * Safely ignores // inside string literals and URLs.
 */
const fs = require('fs');
const path = require('path');

const PROJECTS = ['ShopSphere', 'LibraryPro', 'EventEase', 'CareerConnect', 'MediSlot'];
const BASE = path.join(__dirname);
const JS_EXTS = ['.js', '.jsx'];
const CSS_EXTS = ['.css'];

function stripJSComments(src) {
  let result = '';
  let i = 0;
  const len = src.length;

  while (i < len) {
    // String: single quote
    if (src[i] === "'" && (i === 0 || src[i - 1] !== '\\')) {
      let j = i + 1;
      while (j < len && !(src[j] === "'" && src[j - 1] !== '\\')) j++;
      result += src.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    // String: double quote
    if (src[i] === '"' && (i === 0 || src[i - 1] !== '\\')) {
      let j = i + 1;
      while (j < len && !(src[j] === '"' && src[j - 1] !== '\\')) j++;
      result += src.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    // Template literal
    if (src[i] === '`') {
      let j = i + 1;
      while (j < len && !(src[j] === '`' && src[j - 1] !== '\\')) j++;
      result += src.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    // JSX comment: {/*  */}
    if (src[i] === '{' && src.slice(i, i + 4) === '{/*') {
      let end = src.indexOf('*/}', i + 3);
      if (end !== -1) {
        i = end + 3;
        continue;
      }
    }
    // Multi-line comment: /* */
    if (src[i] === '/' && src[i + 1] === '*') {
      let end = src.indexOf('*/', i + 2);
      if (end !== -1) {
        i = end + 2;
        continue;
      }
    }
    // Single-line comment: //
    if (src[i] === '/' && src[i + 1] === '/') {
      let end = src.indexOf('\n', i);
      if (end === -1) { i = len; continue; }
      i = end; // keep the newline
      continue;
    }
    result += src[i];
    i++;
  }
  return result;
}

function stripCSSComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '');
}

function collapseBlankLines(src) {
  return src.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  let src = fs.readFileSync(filePath, 'utf8');
  let stripped;
  if (JS_EXTS.includes(ext)) {
    stripped = stripJSComments(src);
  } else if (CSS_EXTS.includes(ext)) {
    stripped = stripCSSComments(src);
  } else {
    return;
  }
  stripped = collapseBlankLines(stripped);
  if (stripped !== src) {
    fs.writeFileSync(filePath, stripped, 'utf8');
    console.log('  stripped:', path.relative(BASE, filePath));
  } else {
    console.log('  no change:', path.relative(BASE, filePath));
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walkDir(full);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (JS_EXTS.includes(ext) || CSS_EXTS.includes(ext)) {
        try {
          processFile(full);
        } catch (e) {
          console.error('  ERROR processing', full, e.message);
        }
      }
    }
  }
}

for (const project of PROJECTS) {
  const srcDir = path.join(BASE, project, 'src');
  console.log(`\n=== ${project} ===`);
  if (fs.existsSync(srcDir)) {
    walkDir(srcDir);
  } else {
    console.log('  src/ not found, skipping');
  }
}
console.log('\nDone stripping comments from all projects.');

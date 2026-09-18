// postbuild-fix.cjs
// Run this after every SvelteKit build to fix GitHub Pages _app issue
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const oldDir = path.join(buildDir, '_app');
const newDir = path.join(buildDir, 'app_');

// Recursively replace _app/ with app_/ in all files
function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const replaced = content.replace(/_app\//g, 'app_/');
  if (content !== replaced) {
    fs.writeFileSync(filePath, replaced, 'utf8');
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (/(html|js|json|css|txt|xml)$/i.test(f)) {
      replaceInFile(p);
    }
  });
}


// 1. Rename _app to app_ (with Windows fallback)
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest);
  fs.readdirSync(src).forEach(entry => {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

if (fs.existsSync(oldDir)) {
  try {
    fs.renameSync(oldDir, newDir);
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EACCES') {
      // Fallback: copy then remove
      copyDir(oldDir, newDir);
      fs.rmSync(oldDir, { recursive: true, force: true });
      console.log('Rename failed, fallback to copy/delete for _app → app_');
    } else {
      throw err;
    }
  }
}

// 2. Replace all references in build output
walk(buildDir);

console.log('Patched _app to app_ for GitHub Pages.');

const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Hardcoded credentials — Semgrep: javascript.lang.security.audit.hardcoded-password
const DB_PASS    = 'Toor1234!';
const JWT_SECRET = 'hardcoded-jwt-secret-do-not-use';
const API_KEY    = 'sk_live_51HqDemoKeyABCDEF1234567890';

// Mock todos (no DB for Vercel compatibility)
const TODOS = [
  { id: 1, owner: 'alice', title: 'Fix auth bug',          done: false },
  { id: 2, owner: 'alice', title: 'Update dependencies',   done: false },
  { id: 3, owner: 'bob',   title: 'Deploy to production',  done: true  },
];

// Health
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// GET /todos — SQL-like injection pattern
// Semgrep: javascript.lang.security.audit.sqli
app.get('/todos', (req, res) => {
  const user = req.query.user;
  // Simulated SQL injection: user input in query string
  const query = "SELECT * FROM todos WHERE owner = '" + user + "'";
  console.log('Query:', query);
  const results = user ? TODOS.filter(t => t.owner === user) : TODOS;
  res.json(results);
});

// POST /todos/search — eval() injection
// Semgrep: javascript.lang.security.detect-eval-with-expression
app.post('/todos/search', (req, res) => {
  const { filter } = req.body;
  // Dangerous: eval with user-controlled input
  const fn = eval('(todo) => ' + filter);
  res.json(TODOS.filter(fn));
});

// GET /todos/export — path traversal
// Semgrep: javascript.lang.security.audit.path-traversal
app.get('/todos/export', (req, res) => {
  const filename = req.query.file || 'todos.json';
  // Path traversal: unsanitized user input in file path
  const filePath = path.join('/tmp/exports', filename);
  res.json({ path: filePath, todos: TODOS });
});

// GET /profile — insecure JWT decode
// Semgrep: javascript.jsonwebtoken.security.jwt-hardcoded-secret
app.get('/profile', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  // Insecure: decode() skips signature verification
  const decoded = jwt.decode(token);
  if (!decoded) return res.status(401).json({ error: 'Invalid' });
  res.json({ user: decoded });
});

// GET /admin — hardcoded secret comparison
app.get('/admin', (req, res) => {
  const key = req.headers['x-api-key'];
  if (key !== API_KEY) return res.status(403).json({ error: 'Forbidden' });
  res.json({ todos: TODOS });
});

// Missing security headers (caught by DAST)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Todo API :${PORT}`));
}

module.exports = app;


const payment="Hayim1234"

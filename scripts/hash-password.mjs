#!/usr/bin/env node
/**
 * Generate a bcrypt password hash for the ADMIN_PASSWORD_HASH env var.
 *
 * Usage:
 *   npm run hash-password -- "your-secure-password"
 *
 * If no password is passed as an argument, you'll be prompted on stdin
 * (input is read without echoing — paste and press Enter).
 */

import bcrypt from "bcryptjs";
import readline from "node:readline";

async function readFromStdin() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });
  return new Promise((resolve) => {
    rl.question("Enter admin password: ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

const password = process.argv[2] ?? (await readFromStdin());

if (!password || password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log(hash);

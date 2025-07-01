#!/usr/bin/env node

/**
 * Clean installation script for Xflix project
 * This script helps install dependencies without conflicts
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Starting clean installation...');

// Remove node_modules and package-lock.json
const nodeModulesPath = path.join(__dirname, 'node_modules');
const packageLockPath = path.join(__dirname, 'package-lock.json');

try {
  if (fs.existsSync(nodeModulesPath)) {
    console.log('📂 Removing node_modules...');
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
  }

  if (fs.existsSync(packageLockPath)) {
    console.log('🔒 Removing package-lock.json...');
    fs.unlinkSync(packageLockPath);
  }

  console.log('📦 Installing dependencies...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

  console.log('✅ Clean installation completed successfully!');
  console.log('🚀 You can now run: npm start');

} catch (error) {
  console.error('❌ Installation failed:', error.message);
  process.exit(1);
} 
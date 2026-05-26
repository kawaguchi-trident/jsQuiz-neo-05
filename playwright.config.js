module.exports = {
  testDir: './tests',
  webServer: {
    command: 'npx http-server . -p 8080 -s -c-1',
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  reporter: 'list',
};

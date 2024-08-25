import('./src/index.js').then(({ default: app }) => {
  app.listen( 5003, () => {
    console.log('Server running...');
  });
}).catch(err => {
  console.error('Error starting the application:', err);
});
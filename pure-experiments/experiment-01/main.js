console.log('==Main==');

document.addEventListener('DOMContentLoaded', function() {
  // seu código canvas aqui
  const canvas = document.getElementById('showroom');
  console.log(canvas);
  const ctx = canvas.getContext('2d');

  // Responsividade e alta definição
  function resizeCanvas() {
    console.log('...resizing canvas...');
    const dpr = window.devicePixelRatio || 1;
    // Pegue o tamanho exibido pelo CSS
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';

    ctx.font = '24px Space Grotesk, sans-serif';
    ctx.fillStyle = 'red';
    ctx.fillText('Welcome to the HTML Canvas Experiments Showroom!', 32, canvas.height/2);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

});

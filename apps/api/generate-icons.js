const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourceImage = path.join(__dirname, '../web/app/favicon.ico'); // a imagem de 512x512 original
const publicDir = path.join(__dirname, '../web/public');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'favicon-144x144.png', size: 144 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

async function generate() {
  console.log('Iniciando geração de ícones...');
  
  if (!fs.existsSync(sourceImage)) {
    console.error('Erro: Imagem de origem não encontrada em ' + sourceImage);
    process.exit(1);
  }

  const imageBuffer = fs.readFileSync(sourceImage);

  // 1. Gerar os tamanhos em formato PNG na pasta public
  for (const s of sizes) {
    const targetPath = path.join(publicDir, s.name);
    await sharp(imageBuffer)
      .resize(s.size, s.size)
      .toFile(targetPath);
    console.log(`Gerado: ${s.name} (${s.size}x${s.size})`);
  }

  // 2. Sobrescrever o favicon.ico na raiz do app com uma versão de 32x32 compacta
  // Google e navegadores lerão uma versão menor muito mais rápido
  const appFavicon = path.join(__dirname, '../web/app/favicon.ico');
  
  // Vamos salvar como PNG 32x32 mas nomear como favicon.ico para compatibilidade
  await sharp(imageBuffer)
    .resize(32, 32)
    .toFile(appFavicon);
  console.log('Sobrescrito app/favicon.ico com versão otimizada 32x32');

  // Copiar também para public/favicon.ico
  const publicFavicon = path.join(publicDir, 'favicon.ico');
  await sharp(imageBuffer)
    .resize(32, 32)
    .toFile(publicFavicon);
  console.log('Gerado public/favicon.ico com versão otimizada 32x32');
  
  console.log('Todos os ícones foram gerados com sucesso!');
}

generate().catch(console.error);

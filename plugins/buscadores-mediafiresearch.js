import axios from 'axios';
import cheerio from 'cheerio';

// Mezcla aleatoria de resultados
function shuffle(arr) {
  for (let i = arr.length - 1; i> 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
  return arr;
}

// Función principal de búsqueda
async function mfsearch(query) {
  if (!query) throw new Error('❌ La búsqueda no puede estar vacía.');

  const { data: html} = await axios.get(`https://mediafiretrend.com/?q=${encodeURIComponent(query)}&search=Search`);
  const $ = cheerio.load(html);

  const links = shuffle(
    $('tbody tr a[href*="/f/"]').map((_, el) => $(el).attr('href')).get()
).slice(0, 5);

  if (!links.length) throw new Error('⚠️ No se encontraron resultados.');

  const result = await Promise.all(links.map(async link => {
    const { data} = await axios.get(`https://mediafiretrend.com${link}`);
    const $ = cheerio.load(data);
    const raw = $('div.info tbody tr:nth-child(4) td:nth-child(2) script').text();
    const match = raw.match(/unescape\(['"`]([^'"`]+)['"`]\)/);
    const decoded = cheerio.load(decodeURIComponent(match[1]));

    return {
      filename: $('tr:nth-child(2) td:nth-child(2) b').text().trim(),
      filesize: $('tr:nth-child(3) td:nth-child(2)').text().trim(),
      url: decoded('a').attr('href'),
      source_url: $('tr:nth-child(5) td:nth-child(2)').text().trim(),
      source_title: $('tr:nth-child(6) td:nth-child(2)').text().trim()
};
}));

  return result;
}

// Handler del comando
let handler = async (m, { text}) => {
  if (!text) {
    return m.reply(`🌸 *Uso correcto:*\n.mfsearch <nombre del archivo>\n\nEjemplo:\n.mfsearch config epep`);
}

  m.reply('🔍 *Buscando archivos en MediaFireTrend...*');

  try {
    const res = await mfsearch(text);
    if (!res.length) return m.reply('⚠️ No se encontraron resultados. Probá con otro término.');

    const resultado = res.map((v, i) =>
      `📁 *${i + 1}. ${v.filename}*\n📦 Tamaño: ${v.filesize}\n🔗 Link: ${v.url}\n🌐 Fuente: ${v.source_title}\n🔸 ${v.source_url}`
).join('\n\n');

    await m.reply(`✨ *Resultados encontrados:*\n\n${resultado}`);
} catch (e) {
    m.reply(`❌ *Error al buscar:*\n${e.message}`);
}
};

handler.help = ['mediafiresearch <query>'];
handler.tags = ['search'];
handler.command = ['mfsearch', 'mediafiresearch'];

export default handler;

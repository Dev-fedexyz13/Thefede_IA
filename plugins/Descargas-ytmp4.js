import axios from 'axios';
import fetch from 'node-fetch';

const MAX_FILE_SIZE = 280e6;
const VIDEO_THRESHOLD = 70e6;
const HEAVY_FILE_THRESHOLD = 100e6;
const REQUEST_LIMIT = 3;
const COOLDOWN_MS = 120000;
const requestTimestamps = [];
let isCooldown = false, isProcessingHeavy = false;

const isValidYouTubeUrl = url =>
  /^(https?:\/\/)?(www\.|m\.|music\.)?youtu\.?be(\.com)?\/?.*(watch|embed)?(.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);

const formatSize = b => {
  if (!b || isNaN(b)) return 'Desconocido';
  const u = ['B', 'KB', 'MB', 'GB'], i = Math.floor(Math.log(b) / Math.log(1024));
  return `${(b / Math.pow(1024, i)).toFixed(2)} ${u[i]}`;
};

const getSize = async url => {
  try {
    const res = await axios.head(url, { timeout: 10000});
    return parseInt(res.headers['content-length'], 10);
} catch {
    throw new Error('No se pudo obtener el tamaño');
}
};

const ytdl = async url => {
  const headers = {
    accept: '*/*',
    referer: 'https://id.ytmp3.mobi/',
    'referrer-policy': 'strict-origin-when-cross-origin'
};
  const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  if (!id) throw new Error('ID no encontrado');

  const init = await (await fetch(`https://d.ymcdn.org/api/v1/init?p=y&_=${Date.now()}`, { headers})).json();
  const convert = await (await fetch(`${init.convertURL}&v=${id}&f=mp4&_=${Date.now()}`, { headers})).json();

  for (let i = 0; i < 3; i++) {
    const info = await (await fetch(convert.progressURL, { headers})).json();
    if (info.progress === 3) return { url: convert.downloadURL, title: info.title || 'Video sin título'};
    await new Promise(r => setTimeout(r, 1000));
}

  throw new Error('No se pudo obtener la URL de descarga');
};

const checkRequestLimit = () => {
  const now = Date.now();
  requestTimestamps.push(now);
  while (requestTimestamps.length && now - requestTimestamps[0]> 10000) requestTimestamps.shift();
  if (requestTimestamps.length>= REQUEST_LIMIT) {
    isCooldown = true;
    setTimeout(() => { isCooldown = false; requestTimestamps.length = 0;}, COOLDOWN_MS);
    return false;
}
  return true;
};

let handler = async (m, { conn, text, usedPrefix, command}) => {
  const react = e => m.react(e);
  if (!text) return conn.reply(m.chat, `🧩 Uso: ${usedPrefix}${command} <enlace YouTube>`, m);
  if (!isValidYouTubeUrl(text)) return react('🔴'), m.reply('🚫 Enlace inválido');
  if (isCooldown ||!checkRequestLimit()) return react('🔴'), conn.reply(m.chat, '⏳ Espera un momento...');
  if (isProcessingHeavy) return react('🔴'), conn.reply(m.chat, '⚠️ Ya estoy procesando otro archivo.');

  await react('⏳');
  try {
    const { url, title} = await ytdl(text);
    const size = await getSize(url);
    if (!size) throw new Error('No se pudo determinar el tamaño');
    if (size> MAX_FILE_SIZE) throw new Error('📦 Archivo demasiado grande (280MB)');

    if (size> HEAVY_FILE_THRESHOLD) {
      isProcessingHeavy = true;
      await conn.reply(m.chat, '💾 Descargando archivo grande...');
}

    const caption = `
╭╌╌〔 *🍁 𝖣𝖤𝖲𝖢𝖠𝖱𝖦𝖠 🍁* 〕╌╌╮
┃ 🌸 *𝖳𝗂́𝗍𝗎𝗅𝗈:* ${title}
┃ 📦 *𝖳𝖺𝗆𝖺ñ𝗈:* ${formatSize(size)}
┃ 🔗 *𝖤𝗇𝗅𝖺𝖼𝖾:* ${text}
┃ 🧁 *𝖤𝗌𝗍𝗂𝗅𝗈:* MP4 directo al corazón
╰╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╯`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/3z9alv.jpg'}, // reemplazá con tu imagen real
      caption,
      footer: '🌸 𝖲𝗎𝗄𝗂Bot_MD siempre lista para ayudarte',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '🍁 𝙈𝙀𝙉𝙐'}, type: 1}
      ],
      headerType: 4
}, { quoted: m});

    const buffer = await fetch(url).then(r => r.buffer());
    await conn.sendFile(m.chat, buffer, `${title}.mp4`, undefined, m, null, {mimetype: 'video/mp4',
      asDocument: size>= VIDEO_THRESHOLD,
      filename: `${title}.mp4`
});

    await react('✅');
    isProcessingHeavy = false;
} catch (e) {
    await react('❌');
    isProcessingHeavy = false;
    return m.reply(`🧨 *ERROR:* ${e.message}`);
}
};

handler.help = ['ytmp4 <url>'];
handler.tags = ['descargas'];
handler.command = ['ytmp4'];
handler.black = true;

export default handler;

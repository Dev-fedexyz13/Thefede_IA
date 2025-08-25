const MAX_FILE_SIZE = 280 * 1024 * 1024;
const VIDEO_THRESHOLD = 70 * 1024 * 1024;
const HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024;
const REQUEST_LIMIT = 3;
const REQUEST_WINDOW_MS = 10000;
const COOLDOWN_MS = 120000;

// 🔐 𝖤𝗌𝗍𝖺𝖽𝗈 𝖽𝖾𝗅 𝗌𝗂𝗌𝗍𝖾𝗆𝖺 𝖲𝗎𝗄𝗂Bot_MD
const requestTimestamps = [];
let isCooldown = false;
let isProcessingHeavy = false;

// 🎯 𝖵𝖺𝗅𝗂𝖽𝖺𝖽𝗈𝗋 𝖽𝖾 𝖾𝗇𝗅𝖺𝖼𝖾𝗌 𝖸𝗈𝗎𝖳𝗎𝖻𝖾
const isValidYouTubeUrl = url =>
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);

// 📏 𝖥𝗈𝗋𝗆𝖺𝗍𝖾𝖺𝗋 𝗍𝖺𝗆𝖺ñ𝗈
function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return '𝖣𝖾𝗌𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈';
  const units = ['𝖡', '𝖪𝖡', '𝖬𝖡', '𝖦𝖡', '𝖳𝖡'];
  let i = 0;
  bytes = Number(bytes);
  while (bytes>= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
}
  return `${bytes.toFixed(2)} ${units[i]}`;
}

// 📡 𝖮𝖻𝗍𝖾𝗇𝖾𝗋 𝗍𝖺𝗆𝖺ñ𝗈 𝗉𝗈𝗋 𝖧𝖤𝖠𝖣
async function getSize(url) {
  try {
    const res = await axios.head(url, { timeout: 10000});
    const size = parseInt(res.headers['content-length'], 10);
    if (!size) throw new Error('𝖳𝖺𝗆𝖺ñ𝗈 𝗇𝗈 𝖽𝗂𝗌𝗉𝗈𝗇𝗂𝖻𝗅𝖾');
    return size;
} catch {
    throw new Error('𝖲𝗎𝗄𝗂 𝗇𝗈 𝗉𝗎𝖾𝖽𝖾 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝖾𝗅 𝗍𝖺𝗆𝖺ñ𝗈 💔');
}
}

// 📥 𝖯𝗋𝗈𝖼𝖾𝗌𝗈 𝖽𝖾 𝖼𝗈𝗇𝗏𝖾𝗋𝗌𝗂𝗈́𝗇 𝗒 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺
async function ytdl(url) {
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    referer: 'https://id.ytmp3.mobi/',
    'referrer-policy': 'strict-origin-when-cross-origin'
};

  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  if (!videoId) throw new Error('🕶️ 𝖨𝖣 𝗇𝗈 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝖺𝖽𝗈');

  try {
    const init = await (await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`, { headers})).json();
    const convert = await (await fetch(`${init.convertURL}&v=${videoId}&f=mp4&_=${Date.now()}`, { headers})).json();

    let info;
    for (let i = 0; i < 3; i++) {
      const res = await fetch(convert.progressURL, { headers});
      info = await res.json();
      if (info.progress === 3) break;
      await new Promise(res => setTimeout(res, 1000));
}

    if (!info ||!convert.downloadURL) throw new Error('💔 𝖲𝗎𝗄𝗂 𝗇𝗈 𝗉𝗎𝖾𝗱𝗈 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝗅𝖺 𝖴𝖱𝖫');
    return { url: convert.downloadURL, title: info.title || '🎀 𝖵𝗂𝖽𝖾𝗈 𝗌𝗂𝗇 𝗍𝗂́𝗍𝗎𝗅𝗈'};
} catch (e) {
    throw new Error(`💔 𝖤𝗋𝗋𝗈𝗋 𝖾𝗇 𝗅𝖺 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺: ${e.message}`);
}
}

// 🔐 𝖫𝗂𝗆𝗂𝗍𝖾 𝖽𝖾 𝗌𝗈𝗅𝗂𝖼𝗂𝗍𝗎𝖽𝖾𝗌
function checkRequestLimit() {
  const now = Date.now();
  requestTimestamps.push(now);
  while (requestTimestamps.length> 0 && now - requestTimestamps[0]> REQUEST_WINDOW_MS) {
    requestTimestamps.shift();
}
  if (requestTimestamps.length>= REQUEST_LIMIT) {
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
      requestTimestamps.length = 0;
}, COOLDOWN_MS);
    return false;
}
  return true;
}

// 🧠 𝖧𝖠𝖭𝖣𝖫𝖤𝖱 𝖯𝖱𝖨𝖭𝖢𝖨𝖯𝖠𝖫
let handler = async (m, { conn, text, usedPrefix, command}) => {
  const react = emoji => m.react(emoji);

  if (!text) {
    return conn.reply(m.chat, `🧩 𝖴𝗌𝗈: ${usedPrefix}${command} <𝖾𝗇𝗅𝖺𝖼𝖾 𝖽𝖾 𝖸𝗈𝗎𝖳𝗎𝖻𝖾>`, m);
}

  if (!isValidYouTubeUrl(text)) {
    await react('😵‍💫');
    return m.reply('🚫 𝖤𝗇𝗅𝖺𝖼𝖾 𝗂𝗇𝗏𝖺́𝗅𝗂𝖽𝗈');
}

  if (isCooldown ||!checkRequestLimit()) {
    await react('😵‍💫');
    return conn.reply(m.chat, '⏳ 𝖬𝗎𝖼𝗁𝖺𝗌 𝗌𝗈𝗅𝗂𝖼𝗂𝗍𝗎𝖽𝖾𝗌. 𝖲𝗎𝗄𝗂 𝗇𝖾𝖼𝖾𝗌𝗂𝗍𝖺 𝗎𝗇 𝗋𝖾𝗌𝗉𝗂𝗋𝗈 🌬️', m);
}

  if (isProcessingHeavy) {
  await react('😵‍💫'); // Emoji estilo Suki para carga pesada
  return conn.reply(m.chat, '⚠️ 𝖲𝗎𝗄𝗂 𝖾𝗌𝗍𝖺́ 𝗍𝗋𝖺𝖻𝖺𝗃𝖺𝗇𝖽𝗈 𝖾𝗇 𝗎𝗇 𝖺𝗋𝖼𝗁𝗂𝗏𝗈 𝗉𝖾𝗌𝖺𝖽𝗈... 𝖤𝗌𝗉𝖾𝗋𝖺 𝗎𝗇 𝗉𝗈𝖼𝗈 🌸', m);
}

await react('🩷'); // Descarga en proceso con ternura

try {
  const { url, title} = await ytdl(text);
  const size = await getSize(url);
  if (!size) throw new Error('💔 𝖲𝗎𝗄𝗂 𝗇𝗈 𝗉𝗎𝖾𝖽𝖾 𝖽𝖾𝗍𝖾𝗋𝗆𝗂𝗇𝖺𝗋 𝖾𝗅 𝗍𝖺𝗆𝖺ñ𝗈 𝖽𝖾𝗅 𝗏𝗂𝖽𝖾𝗈');

  if (size> MAX_FILE_SIZE) {
    await react('😵‍💫');
    throw new Error('📦 𝖤𝗅 𝖺𝗋𝖼𝗁𝗂𝗏𝗈 𝗌𝗎𝗉𝖾𝗋𝖺 𝖾𝗅 𝗅𝗂́𝗆𝗂𝗍𝖾 𝖽𝖾 280MB');
}

  const isHeavy = size> HEAVY_FILE_THRESHOLD;
  if (isHeavy) {
    isProcessingHeavy = true;
    await conn.reply(m.chat, '💾 𝖲𝗎𝗄𝗂 𝖾𝗌𝗍𝖺́ 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗇𝖽𝗈 𝗎𝗇 𝖺𝗋𝖼𝗁𝗂𝗏𝗈 𝗀𝗋𝖺𝗇𝖽𝖾... 𝖳𝖾𝗇 𝗉𝖺𝖼𝗂𝖾𝗇𝖼𝗂𝖺 🍃', m);
}

  const caption = `
╭╌╌〔 *🕶️ 𝖣𝖤𝖲𝖢𝖠𝖱𝖦𝖠𝖲 𝖲𝗎𝗄𝗂Bot_MD - MP4* 〕╌╌╮
┃ 🧿 *𝖳𝗂́𝗍𝗎𝗅𝗈:* ${title}
┃ 📦 *𝖳𝖺𝗆𝖺ñ𝗈:* ${formatSize(size)}
┃ 🔗 *𝖤𝗇𝗅𝖺𝖼𝖾:* ${text}
╰╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╯`.trim();

  const buffer = await fetch(url).then(res => res.buffer());
  await conn.sendFile(
    m.chat,
    buffer,
    `${title}.mp4`,
    caption,
    m,
    null,
    {
      mimetype: 'video/mp4',
      asDocument: size>= VIDEO_THRESHOLD,
      filename: `${title}.mp4`
}
);

  await react('🌟'); // Descarga exitosa con brillo
  isProcessingHeavy = false;
} catch (e) {
  await react('💔'); // Error con dramatismo anime
  isProcessingHeavy = false;
  return m.reply(`🧨 *𝖤𝖱𝖱𝖮𝖱:* ${e.message}`);
}

// 🛑 𝖢𝗈𝗆𝖺𝗇𝖽𝗈 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈 𝗉𝖺𝗋𝖺 𝗎𝗌𝗎𝖺𝗋𝗂𝗈𝗌 𝖯𝗋𝖾𝗆𝗂𝗎𝗆 𝗈 𝖡𝗅𝖺𝖼𝗄
handler.help = ['ytmp4 <url>'];
handler.tags = ['descargas'];
handler.command = ['ytmp4'];
handler.black = true; // 🔒 𝖲𝗎𝗄𝗂 𝗌𝗈𝗅𝗈 𝗉𝖺𝗋𝖺 𝖾𝗅𝗂𝗍𝖾

export default handler;

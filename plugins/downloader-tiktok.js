// Código creado por 𝒇𝒆𝒅𝒆𝒙𝒚𝒛 🍁
// no quites los créditos 🍂
import fg from 'api-dylux';

const handler = async (m, { conn, text, args, usedPrefix, command}) => {
  try {
    const url = args[0];

    if (!url) {
      return conn.reply(m.chat, `
🌷 *𝖲𝗎𝗄𝗂𝗕𝗈𝗍_𝖬𝖣 - Descargador TikTok*

📌 *Debes ingresar un enlace válido de TikTok.*

🎀 *Ejemplo:*
${usedPrefix + command} https://vm.tiktok.com/ZMreHF2dC/
`, m);
}

    const valido = /(?:https?:\/\/)?(?:www\.|vm\.|vt\.|t\.)?tiktok\.com\/[^\s]+/i;
    if (!valido.test(url)) {
      return conn.reply(m.chat, '❎ *Enlace de TikTok inválido.*', m);
}

    m.react('⌛'); // Cargando

    const data = await fg.tiktok(url);
    const { title, play, duration, author} = data.result;

    const caption = `
🌸 *𝖲𝗎𝗄𝗂𝗕𝗈𝗍_𝖬𝖣 - TikTok Downloader*

👤 *Autor:* ${author.nickname}
📌 *Título:* ${title}
⏱️ *Duración:* ${duration}

💖 *Gracias por usar SukiBot_MD*
╰─♡ 𝖲𝗎𝗄𝗂 𝖡𝗈𝗍 𓆩𓆪 ♡─╯
`.trim();

    await conn.sendFile(m.chat, play, 'tiktok.mp4', caption, m);
    m.react('✅'); // Éxito
} catch (e) {
    console.error('❌ Error en TikTok:', e);
    m.react('❌');
    return conn.reply(m.chat, `❌ *Error:* ${e.message}`, m);
}
};

handler.help = ['tiktok <url>'];
handler.tags = ['descargas'];
handler.command = ['tt', 'tiktok', 'ttdl'];

export default handler;

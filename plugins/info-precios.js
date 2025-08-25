import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  const imagen = 'https://files.catbox.moe/rkvuzb.jpg'; // Puedes cambiarla por otra si lo deseas

  const texto = `
╭─❀ 🍒 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈 𝗮 𝖲ᴜᴋ𝗂Bot_MD ❀─╮

¿Quieres dominar WhatsApp con el bot más encantado y poderoso del reino digital?
✨ *¡Suki está aquí para ti!* ✨
Transforma tu experiencia con funciones mágicas, estilo pastelcore y control total.

╰─❀ 💖 𝖯𝗋𝖾𝖼𝗂𝗈𝗌 𝖽𝖾𝗅 𝖡𝗈𝗍 ❀─╯

🎀 \`𝗣𝗘𝗥𝗠𝗔𝗡𝗘𝗡𝗧𝗘\`
• 🧁 *Un grupo:* 𝟧 USD / 6 mil 🇦🇷
• 🍰 *Dos grupos:* 𝟣0 USD / 13 mil 🇦🇷
• 🍡 *Tres grupos:* 15 USD / 19 mil 🇦🇷
• 🍓 *Cuatro grupos:* 20 USD / 26 mil 🇦🇷

🌷 \`𝗣𝗘𝗥𝗦𝗢𝗡𝗔𝗟𝗜𝗭𝗔𝗗𝗢\`
• 🎨 Desde 50 MIL 🇦🇷 (con diseño y funciones a medida)

🧚 \`𝗖𝗢𝗠𝗣𝗥𝗔\`
🔗 Grupo de prueba y compra: https://chat.whatsapp.com/Bt6O68OzrIN28UZz5Ka1hV?mode=ac_t

> 𝖲ᴜᴋ𝗂Bot_MD
`.trim();

  const buffer = await fetch(imagen).then(res => res.buffer());
  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: texto
}, { quoted: m});
};

handler.help = ['precios', 'info'];
handler.tags = ['info'];
handler.command = ['precios', 'infobot', 'botinfo'];

export default handler;

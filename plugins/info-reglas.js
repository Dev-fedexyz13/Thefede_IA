// 🌸 Código decorado por fedexyz 🍁
// No quites los créditos si usas este módulo 💖

import fetch from 'node-fetch';

const handler = async (m, { conn}) => {
  const reglas = `
🩷︵₊˚⊹𓏲𓈒 𝖱𝖾𝗀𝗅𝖺𝗌 & 𝖠𝗒𝗎𝖽𝖺 𝖽𝖾 *𝖲𝗎𝗄𝗂Bot_MD* 𓈒˚₊⊹︵

🎀 *Este bot fue creado para compartir magia pastelcore,* herramientas útiles y funciones kawaii.
Por favor sigue estas reglas para mantener la armonía en el reino digital 🌸

╭───🌷 𝖭𝗈𝗋𝗆𝖺𝗌 𝖽𝖾𝗅 𝗋𝖾𝗂𝗇𝗈 ───╮
• 🚫 No hagas spam o flood de comandos
• 🚷 No compartas contenido ofensivo o inapropiado
• 🧩 No modifiques ni abuses del bot
• 🛡️ No robes el código sin permiso
• 💞 Sé respetuos@ con otros usuarios
╰────────────────────────╯

🍡 *Comandos mágicos disponibles:*
⪼.menu — Mostrar menú kawaii
⪼.sticker — Crear stickers mágicos
⪼.imagen — Buscar imágenes pastelcore
⪼.anime — Buscar animes adorables
⪼.play — Descargar música suave
⪼.serbot — Convertirse en subbot

🪄 *¿Tienes errores o dudas?*
𝖲𝗎𝗄𝗂 te escucha con dulzura~ ☁️✨

📞 *Habla con el creador:*
🔗 wa.me/+5491156178758
👤 Dev: fedexyz13

𓆩♡𓆪 Gracias por usar *𝖲𝗎𝗄𝗂Bot_MD*, tu compañera kawaii en este mundo digital pastel 💖
`;

  // 🖼️ Imagen decorativa.jpg
  const res = await fetch('https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg');
  const img = await res.buffer();

  await conn.sendMessage(m.chat, {
    image: img,
    caption: reglas.trim(),
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999
}
}, { quoted: m});
};

handler.command = ['reglas', 'ayuda', 'normas', 'rules'];
handler.help = ['reglas'];
handler.tags = ['main', 'info'];
handler.register = true;

export default handler;

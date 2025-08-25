// Código creado por 𝒇𝒆𝒅𝒆𝒙𝒚𝒛 🍁
// no quites los créditos 💳

import yts from 'yt-search';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🎀 Sᴜᴋɪ_ʙᴏᴛ_MD • Noticias mágicas'
};

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    await conn.sendMessage(m.chat, { react: { text: '✨', key: m.key}});
    return conn.sendMessage(m.chat, {
      text: `🌸 𝖯𝗈𝗋𝖿𝗂𝗌... escribe lo que deseas buscar en YouTube~\n\n💡 Ejemplo:\n${usedPrefix + command} Nako ga`,
      quoted: m
});
}

  await m.react('🔍');
  const res = await yts(text);
  const videos = res.videos.slice(0, 6);

  if (!videos.length) {
    await m.react('💥');
    return conn.sendMessage(m.chat, {
      text: '🍄 𝖭𝗈 𝖾𝗇𝖼𝗈𝗇𝗍𝗋é 𝗇𝖺𝖽𝖺 𝖼𝗈𝗇 𝖾𝗌𝖾 𝗇𝗈𝗆𝖻𝗋𝖾. ¿Probamos con otra palabra?',
      quoted: m
});
}

  const list = videos.map((v, i) => {
    return `🌸 *𝖱𝖾𝗌𝗎𝗅𝗍𝖺𝖽𝗈 #${i + 1}*
🎀 *𝖳𝗂𝗍𝗎𝗅𝗈:* ${v.title}
📺 *𝖢𝖺𝗇𝖺𝗅:* ${v.author.name}
🕒 *𝖣𝗎𝗋𝖺𝖼𝗂𝗈𝗇:* ${v.timestamp}
📅 *𝖯𝗎𝖻𝗅𝗂𝖼𝖺𝖽𝗈:* ${v.ago}
👁️ *𝖵𝗂𝗌𝗍𝖺𝗌:* ${v.views.toLocaleString()}
🔗 *𝖤𝗇𝗅𝖺𝖼𝖾:* ${v.url}`;
}).join('\n\n⊹˚｡⋆ ── ⋆｡˚⊹\n\n');

  await conn.sendMessage(m.chat, {
    image: { url: videos[0].thumbnail},
    caption: list.trim(),
    fileName: 'suki_yts.jpg',
    mimetype: 'image/jpeg',
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 88,
        newsletterName: channelRD.name
},
      externalAdReply: {
        title: '🎶 𝖱𝖾𝗌𝗎𝗅𝗍𝖺𝖽𝗈𝗌 𝗆𝖺𝗀𝗂𝖼𝗈𝗌 𝖽𝖾 SukiBot_MD-V2',
        body: '✨ YouTube explorado con estilo kawaii',
        thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
        sourceUrl: videos[0].url,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
});

  await m.react('🌸');
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['buscador', 'media'];
handler.command = ['ytsearch', 'yts', 'ytbuscar'];
handler.register = true;
handler.limit = 1;

export default handler;

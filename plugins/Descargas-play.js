import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    throw `❗ 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋 𝗂𝗇𝗀𝗋𝖾𝗌𝖺 𝗎𝗇 𝗍𝖾𝗑𝗍𝗈 𝗉𝖺𝗋𝖺 𝖻𝗎𝗌𝖼𝖺𝗋.\n𝖤𝗃𝖾𝗆𝗉𝗅𝗈: ${usedPrefix + command} 𝖭𝗈𝗆𝖻𝗋𝖾 𝖽𝖾𝗅 𝗏𝗂𝖽𝖾𝗈`;
}

  const search = await yts(text);
  const videoInfo = search.all?.[0];

  if (!videoInfo) {
    throw '❗ 𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝖺𝗋𝗈𝗇 𝗋𝖾𝗌𝗎𝗅𝗍𝖺𝖽𝗈𝗌 𝗉𝖺𝗋𝖺 𝗍𝗎 𝖻𝗎𝗌𝗊𝗎𝖾𝖽𝖺. 𝖨𝗇𝗍𝖾𝗇𝗍𝖺 𝖼𝗈𝗇 𝗈𝗍𝗋𝗈 𝗍𝗂́𝗍𝗎𝗅𝗈.';
}

  const body = `🎀 *𝖲𝗎𝗄𝗂Bot_MD* 🎀

✨𝖲𝗎𝗄𝗂Bot_MD 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗌 ✨

🔎 𝖱𝖾𝗌𝗎𝗅𝗍𝖺𝖽𝗈 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝖺𝖽𝗈:
*${videoInfo.title}*

📥 𝖤𝗅𝗂𝗀𝖾 𝖼𝗈́𝗆𝗈 𝖽𝖾𝗌𝖾𝖺𝗌 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗋:
🎧 *𝖠𝗎𝖽𝗂𝗈* — 𝖨𝖽𝖾𝖺𝗅 𝗉𝖺𝗋𝖺 𝗆𝗎́𝗌𝗂𝖼𝖺 𝗈 𝗉𝗈𝖽𝖼𝖺𝗌𝗍𝗌
📽️ *𝖵𝗂𝖽𝖾𝗈* — 𝖯𝖾𝗋𝖿𝖾𝖼𝗍𝗈 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗌𝗂𝗇 𝖼𝗈𝗇𝖾𝗑𝗂𝗈́𝗇
  `;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: videoInfo.thumbnail},
      caption: body,
      footer: `🍁 *𝖲𝗎𝗄𝗂Bot_MD* 🍁`,
      buttons: [
        { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎧 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗋 𝖠𝗎𝖽𝗂𝗈'}},
        { buttonId: `.ytmp4 ${videoInfo.url}`, buttonText: { displayText: '📽️ 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗋 𝖵𝗂𝖽𝖾𝗈'}},
      ],
      viewOnce: true,
      headerType: 4,
},
    { quoted: m}
);
  m.react('🌸'); // 𝖱𝖾𝖺𝖼𝗂𝗈́𝗇 𝖼𝗈𝗇 𝖾𝗌𝗍𝗂𝗅𝗈 𝖲𝗎𝗄𝗂
};

handler.command = ['play', 'playvid', 'play2'];
handler.tags = ['downloader'];
handler.group = true;
handler.limit = 6;

export default handler;

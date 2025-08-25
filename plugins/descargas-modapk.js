import { search, download} from 'aptoide-scraper';

const channelRD = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';
const sukiIcon = 'https://files.catbox.moe/rkvuzb.jpg';

let handler = async (m, { conn, usedPrefix, command, text}) => {
  const name = conn.getName(m.sender);

  const contextInfo = {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
    externalAdReply: {
      title: '✨ 𝖲𝗎𝗄𝗂 𝗇𝖺𝗄𝗈 𝗀𝖺 | 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺 𝖽𝖾 𝖠𝗉𝗉',
      body: `🌸 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗇𝖽𝗈 𝗉𝖺𝗋𝖺: ${name}`,
      thumbnailUrl: sukiIcon,
      sourceUrl: channelRD,
      mediaType: 1,
      renderLargerThumbnail: true,
},
};

  if (!text) {
    return conn.reply(
      m.chat,
      `🌸 *𝖧𝗈𝗅𝖺 𝗉𝗋𝖾𝖼𝗂𝗈𝗌𝗎𝗋𝖺 ${name}~* 𝖭𝖾𝖼𝖾𝗌𝗂𝗍𝗈 𝗎𝗇 𝗇𝗈𝗆𝖻𝗋𝖾 𝖽𝖾 𝖺𝗉𝗉 𝗉𝖺𝗋𝖺 𝖻𝗎𝗌𝖼𝖺𝗋.\n\n💖 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: ${usedPrefix + command} whatsapp`,
      m,
      { contextInfo, quoted: m}
);
}

  try {
    await m.react('🔍');
    conn.reply(
      m.chat,
      `🧋 *𝖲𝗎𝗄𝗂 𝖾𝗌𝗍𝖺́ 𝖻𝗎𝗌𝖼𝖺𝗇𝖽𝗈 𝗍𝗎 𝖺𝗉𝗉 mágica, ${name}...*`,
      m,
      { contextInfo, quoted: m}
);

    const results = await search(text);
    if (!results?.length) {
      return conn.reply(
        m.chat,
        `💔 *𝖫𝗈 𝗌𝗂𝖾𝗇𝗍𝗈 ${name}~* 𝖭𝗈 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝗈́ 𝗋𝖾𝗌𝗎𝗅𝗍𝖺𝖽𝗈𝗌 𝗉𝖺𝗋𝖺 "${text}".`,
        m,
        { contextInfo, quoted: m}
);
}

    const data = await download(results[0].id);
    if (!data?.dllink) {
      return conn.reply(
        m.chat,
        `😭 *𝖲𝗎𝗄𝗂 𝗇𝗈 𝗉𝗎𝖾𝖽𝗈 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝖾𝗅 𝖾𝗇𝗅𝖺𝖼𝖾 𝗉𝖺𝗋𝖺 "${results[0].name}".*`,
        m,
        { contextInfo, quoted: m}
);
}

    await conn.sendMessage(
      m.chat,
      {
        document: { url: data.dllink},
        mimetype: 'application/vnd.android.package-archive',
        fileName: `${data.name}.apk`,
        caption: `📦 *${data.name}* 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝖽𝖺 𝖾𝗑𝗂𝗍𝗈𝗌𝖺𝗆𝖾𝗇𝗍𝖾 💖`,
},
      { quoted: m}
);
    await m.react('✅');

} catch (error) {
    console.error('Error en apk2:', error);
    conn.reply(
      m.chat,
      `❌ *𝖴𝗉𝗌𝗌, 𝖲𝗎𝗄𝗂 𝗍𝗎𝗏𝗈 𝗎𝗇 𝖾𝗋𝗋𝗈𝗋 mágico...*\n🩵 𝖣𝖾𝗍𝖺𝗅𝗅𝖾𝗌: ${error.message}`,
      m,
      { contextInfo, quoted: m}
);
    await m.react('❌');
}
};

handler.tags = ['descargas'];
handler.help = ['apk'];
handler.command = ['apk'];
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;

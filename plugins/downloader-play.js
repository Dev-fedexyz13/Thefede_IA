// ✨ 𝖢𝗈́𝖽𝗂𝗀𝗈 𝖼𝗋𝖾𝖺𝖽𝗈 𝗒 𝗆𝖾𝗃𝗈𝗋𝖺𝖽𝗈 𝗉𝗈𝗋 𝖿𝖾𝖽𝖾𝗑𝗒𝗓 🍁
// 𝗇𝗈 𝗊𝗎𝗂𝗍𝖾𝗌 𝗅𝗈𝗌 𝖼𝗋𝖾𝖽𝗂𝗍𝗈𝗌 🍂

import fetch from "node-fetch";
import yts from "yt-search";

const channelRD = {
  id: "120363402097425674@newsletter",
  name: "🌷 𝖲𝗎𝗄𝗂_𝖡𝗈𝗍_𝖬𝖣 • 𝖭𝗈𝗍𝗂𝖼𝗂𝖺𝗌 𝗆𝖺́𝗀𝗂𝖼𝖺𝗌"
};

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

const handler = async (m, { conn, text, command}) => {
  try {
    if (!text.trim()) {
      await conn.sendMessage(m.chat, { react: { text: "📡", key: m.key}});
      return conn.sendMessage(m.chat, {
        text: `🌸 *𝖲𝗎𝗄𝗂 𝗇𝖾𝖼𝖾𝗌𝗂𝖳𝖺 𝗎𝗇𝖺 𝖼𝖺𝗇𝖼𝗂𝗈́𝗇 𝗉𝖺𝗋𝖺 𝖾𝗇𝖼𝖾𝗇𝖽𝖾𝗋 𝗌𝗎 𝗆𝖺𝗀𝗂𝖺.*\n🎶 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *${command} 𝖴𝗇 𝖵𝖾𝗋𝖺𝗇𝗈 𝖲𝗂𝗇 𝖳𝗂*`,
        quoted: m
});
}

    await m.react("🔍");

    const videoIdMatch = text.match(youtubeRegexID);
    const searchQuery = videoIdMatch? `https://youtu.be/${videoIdMatch[1]}`: text;
    let result = await yts(searchQuery);

    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      result = result.all.find(v => v.videoId === videoId) || result.videos.find(v => v.videoId === videoId);
} else {
      result = result.videos?.[0] || result.all?.[0] || result;
}

    if (!result) {
      return conn.sendMessage(m.chat, {
        text: `😿 *𝖲𝗎𝗄𝗂 𝗇𝗈 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝗈́ 𝗇𝖺𝖽𝗮 𝖼𝗈𝗇 𝖾𝗌𝖾 𝗇𝖮𝗆𝖻𝗋𝖾.*`,
        quoted: m
});
}

    const res2 = await fetch('https://files.cloudkuimages.guru/images/9m6kTLQt.jpg');
    const thumb2 = await res2.buffer();
    const Shadow = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
},
      message: {
        locationMessage: {
          name: `DESCARGA COMPLETA\n[▓▓▓▓▓▓▓▓░░░░] 100%`,
          jpegThumbnail: thumb2
}
},
      participant: "0@s.whatsapp.net"
};

    const { title, thumbnail, timestamp, views, ago, url, author} = result;
    const thumb = (await conn.getFile(thumbnail)).data;

    const infoMessage = `
🌷 *𝖳𝗎 𝗉𝖾𝖽𝗂𝖽𝗈 𝖾𝗌𝗍𝖺́ 𝗅𝗂𝗌𝗍𝗈, 𝖼𝖺𝗋𝗂𝗇𝗈:*
📺 *𝖢𝖺𝗇𝖺𝗅:* ${author.name || "𝖣𝖾𝗌𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈"}
👁️ *𝖵𝗂𝗌𝗍𝖺𝗌:* ${formatViews(views)}
⏳ *𝖣𝗎𝗋𝖺𝖼𝗂𝗈́𝗇:* ${timestamp || "?"}
📆 *𝖯𝗎𝖻𝗅𝗂𝖼𝖺𝖽𝗈:* ${ago || "?"}
🔗 *𝖤𝗇𝗅𝖺𝗰𝗂𝗌𝗍𝗈:* ${url}`.trim();

    const contextoBonito = {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 101,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: "🎀 𝖲𝗎𝗄𝗂 𝗍𝖾 𝗍𝗋𝖺𝖾 𝗆𝗎́𝗌𝗂𝖼𝖺 𝗆𝖺́𝗀𝗂𝖼𝖺",
          body: `📻 ${author.name || "𝖠𝗋𝗍𝗂𝗌𝗍𝖺 𝖽𝖾𝗌𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈"} • ✨ ${title}`,
          thumbnailUrl: "https://files.catbox.moe/rkvuzb.jpg",
          mediaUrl: url,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
};

    await conn.sendMessage(m.chat, {
      image: thumb,
      caption: infoMessage,
      footer: "ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ • Descargas encantadas",
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '📜 Mᴇɴᴜ Pʀɪɴᴄɪᴘᴀʟ'}, type: 1}
      ],
      headerType: 4,
...contextoBonito
}, { quoted: m});

    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json();
        const audioUrl = api.result?.download?.url;
        if (!audioUrl) throw "⛔ 𝖤𝗋𝗋𝗈𝗋 𝗀𝖾𝗇𝖾𝗋𝖺𝗇𝖽𝗈 𝖾𝗅 𝖺𝗎𝖽𝗂𝗈";
        await conn.sendMessage(m.chat, {
          audio: { url: audioUrl},
          fileName: `${api.result.title || "𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺"}.mp3`,
          mimetype: "audio/mpeg"
}, { quoted: Shadow});
} catch {
        return conn.sendMessage(m.chat, {
          
      text: "💔 𝖭𝗈 𝗌𝖾 𝗉𝗎𝖽𝗈 𝖾𝗇𝗏𝗂𝖺𝗋 𝖾𝗅 𝗏𝗂𝖽𝖾𝗈. 𝖨𝗇𝗍𝖾𝗇𝗍𝖺 𝗈𝗍𝗋𝗈 𝗍𝗂́𝗍𝗎𝗅𝗈 𝗈 𝗋𝖾𝗏𝗂𝗌𝖺 𝖾𝗅 𝗍𝖺𝗆𝖺𝗇𝗈.",
      quoted: m
});
}
}

else {
  return conn.sendMessage(m.chat, {
    text: "✨ 𝖢𝗈𝗆𝖺𝗇𝖽𝗈 𝗇𝗈 𝗋𝖾𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈, 𝗉𝖾𝗋𝗈 𝖲𝗎𝗄𝗂 𝖾𝗌𝗍𝖺́ 𝗅𝗂𝗌𝗍𝖺 𝗉𝖺𝗋𝖺 𝖺𝗒𝗎𝖽𝖺𝗋𝗍𝖾 💫",
    quoted: m
});
}

await m.react("🌸");
} catch (error) {
  await conn.sendMessage(m.chat, {
    text: `💥 𝖴𝗉𝗌, 𝗈𝖼𝗎𝗋𝗋𝗂𝗈́ 𝗎𝗇 𝖾𝗋𝗋𝗈𝗋:\n> \`${error.message || error}\``,
    quoted: m
});
  await m.react("💫");
}
};

handler.command = handler.help = ["play", "ytmp3", "playaudio"];
handler.tags = ["descargas"];
export default handler;

// 🌼 𝖥𝗈𝗋𝗆𝖺𝗍𝗈 𝖽𝗎𝗅𝖼𝖾 𝗉𝖺𝗋𝖺 𝗏𝗂𝗌𝗍𝖺𝗌
function formatViews(views = 0) {
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
        }

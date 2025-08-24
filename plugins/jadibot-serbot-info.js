// créditos 💳  a Thecarlos19
// modificado por Dev-fedexyz13 🍁

async function handler(m, { conn: stars, usedPrefix}) {
  const maxSubBots = 50;
  const conns = Array.isArray(global.conns)? global.conns: [];

  const isConnOpen = (c) => {
    try {
      return c?.ws?.socket?.readyState === 1;
} catch {
      return!!c?.user?.id;
}
};

  const unique = new Map();
  for (const c of conns) {
    if (!c ||!c.user) continue;
    if (!isConnOpen(c)) continue;

    const jidRaw = c.user.jid || c.user.id || '';
    if (!jidRaw) continue;

    unique.set(jidRaw, c);
}

  const users = [...unique.values()];
  const totalUsers = users.length;
  const availableSlots = Math.max(0, maxSubBots - totalUsers);

  const packname = global.packname || '🎋 Sᴜᴋɪ𝐁𝐨𝐭_MD';
  const title = `╔═━━━『 Sᴜᴋɪꜱᴜʙʙᴏᴛꜱ ᴄᴏɴᴇᴄᴛᴀᴅᴏꜱ 』━━━═╗`;
  const barra = '╚═════ ༺༻ ═════╝';

  let responseMessage = '';

  if (totalUsers === 0) {
    responseMessage = `${title}
┃ 🔢 ᴛᴏᴛᴀʟ ᴄᴏɴᴇᴄᴛᴀᴅᴏꜱ: *0*
┃ 🟢 ᴇꜱᴘᴀᴄɪᴏꜱ ᴅɪꜱᴘᴏɴɪʙʟᴇꜱ: *${availableSlots}*
${barra}

📡 ɴᴏ ʜᴀʏ ꜱᴜʙʙᴏᴛꜱ ᴀᴄᴛɪᴠᴏꜱ ᴘᴏʀ ᴀʜᴏʀᴀ.`;
} else if (totalUsers <= 50) {
    const listado = users
.map((v, i) => {
        const num = v.user.jid.replace(/[^0-9]/g, '');
        const nombre = v?.user?.name || v?.user?.pushName || '👤 Sᴜʙʙᴏᴛ ꜱɪɴ ɴᴏᴍʙʀᴇ';
        const waLink = `https://wa.me/${num}?text=${usedPrefix}code`;
        return `╭─── ❖ ───╮
│ 🆔 #${i + 1}
│ 🤖 ᴜꜱᴜᴀʀɪᴏ: @${num}
│ 🧠 ɴᴏᴍʙʀᴇ: ${nombre}
│ 🌐 ʟɪɴᴋ: ${waLink}
╰─── ❖ ───╯`;
})
.join('\n\n');

    responseMessage = `${title}
┃ 🔢 ᴛᴏᴛᴀʟ ᴄᴏɴᴇᴄᴛᴀᴅᴏꜱ: *${totalUsers}*
┃ 🟢 ᴇꜱᴘᴀᴄɪᴏꜱ ᴅɪꜱᴘᴏɴɪʙʟᴇꜱ: *${availableSlots}*
${barra}

${listado}`.trim();
} else {
    responseMessage = `${title}
┃ 🔢 ᴛᴏᴛᴀʟ ᴄᴏɴᴇᴄᴛᴀᴅᴏꜱ: *${totalUsers}*
┃ 🟢 ᴇꜱᴘᴀᴄɪᴏꜱ ᴅɪꜱᴘᴏɴɪʙʟᴇꜱ: *${availableSlots}*
${barra}

⚠️ ʜᴀʏ ᴍᴀ́ꜱ ᴅᴇ *${maxSubBots}* ꜱᴜʙʙᴏᴛꜱ ᴄᴏɴᴇᴄᴛᴀᴅᴏꜱ.
🧠 ʟɪꜱᴛᴀ ᴅᴇᴛᴀʟʟᴀᴅᴀ ɴᴏ ᴍᴏꜱᴛʀᴀᴅᴀ ᴘᴏʀ ꜱᴇɢᴜʀɪᴅᴀᴅ.`;
}

  responseMessage += `

╭─⊹⊱ ᴄʀᴇᴀᴅᴏʀ: ꜰᴇᴅᴇxʏᴢ13 👑 ⊰⊹─╮
╰─⊹⊱ ɢʀᴀᴄɪᴀꜱ ᴘᴏʀ ᴜꜱᴀʀ *Sᴜᴋɪ𝐁𝐨𝐭_MD* 💫 ⊰⊹─╯`;

  const imageUrl = 'https://files.catbox.moe/rkvuzb.jpg';

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo",
},
    message: {
      contactMessage: {
        displayName: "Sᴜᴋɪꜱᴜʙʙᴏᴛ",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Sᴜᴋɪꜱᴜʙʙᴏᴛ;;;\nFN:Sᴜᴋɪꜱᴜʙʙᴏᴛ\nEND:VCARD",
},
},
};

  const mentions = typeof stars.parseMention === 'function'
? stars.parseMention(responseMessage)
: [...new Set(
        (responseMessage.match(/@(\d{5,16})/g) || []).map(v => v.replace('@', '') + '@s.whatsapp.net')
)];

  try {
    await stars.sendMessage(
      m.chat,
      { image: { url: imageUrl}, caption: responseMessage, mentions},
      { quoted: fkontak}
);
} catch (e) {
    console.error('❌ ᴇʀʀᴏʀ ᴇɴ ᴇɴᴠɪ́ᴏ:', e);
    await stars.sendMessage(
      m.chat,
      { text: responseMessage, mentions},
      { quoted: fkontak}
);
}
}

handler.command = ['listjadibot', 'bots'];
handler.help = ['bots'];
handler.tags = ['jadibot'];
export default handler;

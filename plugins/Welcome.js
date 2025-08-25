// 🌸 código creado por ꜰᴇᴅᴇxʏᴢ 🍁
// no quites créditos ⚔️

export async function before(m, { conn}) {
  if (!m.isGroup ||!m.messageStubType ||!m.messageStubParameters) return;

  const who = m.messageStubParameters?.[0];
  if (!who) return;

  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = m.messageStubParameters || [];
  const fecha = new Date().toLocaleDateString('es-AR');

  const audioBienvenida = 'https://files.cloudkuimages.guru/audios/MVdamiSr.mp3';
  const audioDespedida = 'https://files.cloudkuimages.guru/audios/aTh4HrjO.mp3';

  const canalSuki = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';
  const grupoOficial = 'https://chat.whatsapp.com/Bt6O68OzrIN28UZz5Ka1hV';

  for (const user of participants) {
    const name = await conn.getName(user);
    const pp = await conn.profilePictureUrl(user, 'image').catch(() => 'https://files.catbox.moe/rkvuzb.jpg');
    const tag = `@${user.split('@')[0]}`;

    // 🎀 Bienvenida
    if ([27, 31].includes(m.messageStubType)) {
      await conn.sendMessage(m.chat, {
        image: { url: pp},
        caption: `
╭─❀ ʙɪᴇɴᴠᴇɴɪᴅ@ ❀─╮

🌸 ʜᴏʟᴀ ${tag}, ʙᴏᴛ ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ ᴛᴇ ᴀʙʀᴀᴢᴀ~
🍓 ɢʀᴜᴘᴏ: *${groupMetadata.subject}*
🧁 ɴᴏᴍʙʀᴇ: *${name}*
📆 ᴇɴᴛʀᴀᴅᴀ: *${fecha}*

╰─❀───────────────❀─╯

📡 ᴄᴀɴᴀʟ:
${canalSuki}

🎀 ɢʀᴜᴘᴏ ᴏꜰɪᴄɪᴀʟ:
${grupoOficial}

ꜱᴜᴋɪ ᴛᴇ ᴅᴀ ʟᴀ ʙɪᴇɴᴠᴇɴɪᴅᴀ ᴄᴏɴ ᴅᴜʟᴢᴜʀᴀ 🌷`,
        mentions: [who],
        footer: '🌸 ꜱᴜᴋɪ_ʙᴏᴛ_ᴍᴅ • Bienvenida mágica',
        buttons: [
          { buttonId: '.menu', buttonText: { displayText: '📜 Mᴇɴᴜ Pʀɪɴᴄɪᴘᴀʟ'}, type: 1},
          { buttonId: '.reg soy pendejo 50', buttonText: { displayText: '🧩 Aᴜᴛᴏ Vᴇʀɪғɪᴄᴀʀ'}, type: 1}
        ],
        headerType: 4,
        contextInfo: {
          externalAdReply: {
            title: '🌷 ɴᴜᴇᴠ@ ᴇɴ ᴇʟ ʀᴇɪɴᴏ',
            body: `${name} ʟʟᴇɢᴏ́ ᴄᴏɴ ᴇsᴛɪʟᴏ 💫`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: canalSuki
}
}
});

      await conn.sendMessage(m.chat, {
        audio: { url: audioBienvenida},
        mimetype: 'audio/mpeg',
        ptt: true
});
}

    // 🌙 Despedida sin botones
    if ([28, 32].includes(m.messageStubType)) {
      await conn.sendMessage(m.chat, {
        text: `
╭─❀ ᴅᴇsᴘᴇᴅɪᴅᴀ ❀─╮

🍃 ${tag} sᴀʟɪó ᴅᴇ *${groupMetadata.subject}*
🧁 ɴᴏᴍʙʀᴇ: *${name}*
📆 ꜱᴀʟɪᴅᴀ: *${fecha}*

ꜱᴜᴋɪ ᴛᴇ ʀᴇᴄᴏʀᴅᴀʀᴀ́ ᴄᴏɴ ᴄᴀʀɪɴ̃ᴏ 🌸`,
        mentions: [who],
        contextInfo: {
          externalAdReply: {
            title: '🌙 ᴅᴇsᴘᴇᴅɪᴅᴀ ᴅᴇ ꜱᴜᴋɪ',
            body: `${name} ᴄᴏɴᴛɪɴᴜ́ᴀ sᴜ ᴠɪᴀᴊᴇ 🕊️`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true
}
}
});

      await conn.sendMessage(m.chat, {
        audio: { url: audioDespedida},
        mimetype: 'audio/mpeg',
        ptt: true
});
}
}
}

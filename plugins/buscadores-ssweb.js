// 🌸 Código creado por fedexyz 🫧

import fetch from 'node-fetch'

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🌷 Sᴜᴋɪ_ʙᴏᴛ_MD • Noticias mágicas'
}

let handler = async (m, { conn, args, command}) => {
  const link = args[0]
  if (!link) {
    await conn.sendMessage(m.chat, { react: { text: '🔒', key: m.key}})
    return conn.sendMessage(m.chat, {
      text: `☁️ *Suki necesita un enlace para capturar la página.*\n🧃 Ejemplo: *${command} https://example.com*`,
      quoted: m
})
}

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key}})
    await conn.sendMessage(m.chat, {
      text: `🫧 *Capturando tu nube...*\n📸 Esperá un momentito~`,
      quoted: m
})

    const ss = await (await fetch(`https://image.thum.io/get/fullpage/${link}`)).buffer()

    await conn.sendMessage(m.chat, {
      image: ss,
      caption: `📷 *Vista previa generada por Sᴜᴋɪ_ʙᴏᴛ_MD*\n🔗 Enlace: ${link}`,
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 101,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: '🌸 Captura mágica de Suki',
          body: '✨ Vista generada desde el reino digital',
          thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
          sourceUrl: link,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
})

    await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key}})
} catch (err) {
    await conn.sendMessage(m.chat, { react: { text: '💔', key: m.key}})
    return conn.sendMessage(m.chat, {
      text: `🌧️ *Ups… no pude capturar la página.*\n🔍 Verificá el enlace y probamos de nuevo.`,
      quoted: m
})
}
}

handler.help = ['ssweb <url>', 'ss <url>']
handler.tags = ['tools']
handler.command = ['ssweb', 'ss']
handler.register = true

export default handler

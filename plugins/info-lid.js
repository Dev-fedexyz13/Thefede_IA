let handler = async (m, { conn, participants, usedPrefix, command}) => {
  if (!m.isGroup) {
    return conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
      caption: `👥 *Este hechizo solo florece en los jardines grupales de Sᴜᴋɪ* 🌷`,
      footer: 'ꜰᴇᴅᴇxʏᴢ 🍁',
      buttons: [{ buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}],
      headerType: 4
}, { quoted: m})
}

  const total = participants.length
  const lista = participants.map(p => {
    const nombre = conn.getName(p.id)
    return `𓆩 🆔 \`${p.id}\`\n𓆪 🧸 *Nombre:* ${nombre}`
}).join('\n\n')

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
    caption: `✨ *Lista de ID* ✨\n\n👥 *Total de miembros:* ${total}\n\n${lista}`,
    footer: 'ꜰᴇᴅᴇxʏᴢ 🍁',
    buttons: [{ buttonId: '.menu', buttonText: { displayText: '🍁 Ver Menú'}, type: 1}],
    headerType: 4
}, { quoted: m})
}

handler.help = ['lid']
handler.tags = ['info']
handler.command = ['lid']

export default handler

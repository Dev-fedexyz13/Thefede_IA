var handler = async (m, { conn }) => {
  let group = m.chat
  let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
  
  conn.reply(m.chat, `🚩 Aquí tienes el link del grupo:\n${link}`, m, { detectLink: true })
}

handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link']

handler.group = true
handler.botAdmin = true

export default handler
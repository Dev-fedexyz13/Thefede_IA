/* código creado por Dev-fedexyz13 
*/

import fs from 'fs'
import path from 'path'

export async function before(m, { conn}) {
  if (!m.text ||!global.prefix.test(m.text)) return

  const usedPrefix = global.prefix.exec(m.text)[0]
  const command = m.text.slice(usedPrefix.length).trim().split(/\s+/)[0].toLowerCase()
  const comando = usedPrefix + command

  const eggs = {
    hacked: '👾 𝖠𝖼𝖼𝖾𝗌𝗈 𝗈𝖼𝗎𝗅𝗍𝗈... +100 XP',
    glitch: '⚡ 𝖦𝗅𝗂𝗍𝖼𝗁 𝖽𝖾𝗍𝖾𝖼𝗍𝖺𝖽𝗈... +50 monedas',
    neo: '🧬 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈, 𝖭𝖾𝗈... +77 XP'
}

  if (eggs[command]) {
    global.db.data.users[m.sender].exp = (global.db.data.users[m.sender].exp || 0) + 100
    return conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
      caption: `${eggs[command]}\n\n🍁 𝖲𝗎𝗄𝗂𝐁𝗈𝐭_MD 𝖺𝗉𝗋𝖾𝖼𝗂𝖺 𝗍𝗎 𝖼𝗎𝗋𝗂𝗈𝗌𝗂𝖽𝖺𝖽`,
      buttons: [{ buttonId: `${usedPrefix}menu`, buttonText: { displayText: '🍁 𝖬𝖤𝖭𝖴'}, type: 1}],
      headerType: 4
}, { quoted: m})
}

  const frases = [
    `🌙 𝖤𝗌𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗇𝗈 𝖾𝗑𝗂𝗌𝗍𝖾`,
    `🦋 𝖯𝖾𝗋𝗈 𝗍𝗎 𝗂𝗇𝗍𝖾𝗇𝗍𝗈 𝖿𝗎𝖾 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈𝗋`,
    `📘 𝖴𝗌𝖺 *${usedPrefix}menu* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗅𝗈𝗌 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌`
  ]

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/rkvuzb.jpg'},
    caption: frases.join('\n'),
    footer: '🎋 𝖲𝗎𝗄𝗂𝐁𝗈𝐭_MD',
    buttons: [{ buttonId: `${usedPrefix}menu`, buttonText: { displayText: '🍁 𝖬𝖤𝖭𝖴'}, type: 1}],
    headerType: 4
}, { quoted: m})
}

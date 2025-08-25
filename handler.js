import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import {smsg} from './lib/simple.js';
import {format} from 'util';
import {fileURLToPath} from 'url';
import path, {join} from 'path';
import {unwatchFile, watchFile} from 'fs';
import fs from 'fs';
import chalk from 'chalk';
import ws from 'ws';

const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
  clearTimeout(this)
  resolve()
}, ms))

export async function handler(chatUpdate) {
  this.msgqueque = this.msgqueque || []
  this.uptime = this.uptime || Date.now()
  if (!chatUpdate) return
  this.pushMessage(chatUpdate.messages).catch(console.error)
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m) return;
  if (global.db.data == null) await global.loadDatabase()

  try {
    m = smsg(this, m) || m
    if (!m) return
    global.mconn = m
    m.exp = 0
    m.coin = false

    try {
      let user = global.db.data.users[m.sender]
      if (typeof user !== 'object')
        global.db.data.users[m.sender] = {}
      if (user) {
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.coin)) user.coin = 10
        if (!isNumber(user.joincount)) user.joincount = 1
        if (!isNumber(user.diamond)) user.diamond = 3
        if (!isNumber(user.lastadventure)) user.lastadventure = 0
        if (!isNumber(user.lastclaim)) user.lastclaim = 0
        if (!isNumber(user.health)) user.health = 100
        if (!isNumber(user.crime)) user.crime = 0
        if (!isNumber(user.lastcofre)) user.lastcofre = 0
        if (!isNumber(user.lastdiamantes)) user.lastdiamantes = 0
        if (!isNumber(user.lastpago)) user.lastpago = 0
        if (!isNumber(user.lastcode)) user.lastcode = 0
        if (!isNumber(user.lastcodereg)) user.lastcodereg = 0
        if (!isNumber(user.lastduel)) user.lastduel = 0
        if (!isNumber(user.lastmining)) user.lastmining = 0
        if (!('muto' in user)) user.muto = false
        if (!('premium' in user)) user.premium = false
        if (!user.premium) user.premiumTime = 0
        if (!('registered' in user)) user.registered = false
        if (!('genre' in user)) user.genre = ''
        if (!('birth' in user)) user.birth = ''
        if (!('marry' in user)) user.marry = ''
        if (!('description' in user)) user.description = ''
        if (!('packstickers' in user)) user.packstickers = null
        if (!user.registered) {
          if (!('name' in user)) user.name = m.name
          if (!isNumber(user.age)) user.age = -1
          if (!isNumber(user.regTime)) user.regTime = -1
        }
        if (!isNumber(user.afk)) user.afk = -1
        if (!('afkReason' in user)) user.afkReason = ''
        if (!('role' in user)) user.role = 'Nuv'
        if (!('banned' in user)) user.banned = false
        if (!('useDocument' in user)) user.useDocument = false
        if (!isNumber(user.level)) user.level = 0
        if (!isNumber(user.bank)) user.bank = 0
        if (!isNumber(user.warn)) user.warn = 0
      } else
        global.db.data.users[m.sender] = {
          exp: 0,
          coin: 10,
          joincount: 1,
          diamond: 3,
          lastadventure: 0,
          health: 100,
          lastclaim: 0,
          lastcofre: 0,
          lastdiamantes: 0,
          lastcode: 0,
          lastduel: 0,
          lastpago: 0,
          lastmining: 0,
          lastcodereg: 0,
          muto: false,
          registered: false,
          genre: '',
          birth: '',
          marry: '',
          description: '',
          packstickers: null,
          name: m.name,
          age: -1,
          regTime: -1,
          afk: -1,
          afkReason: '',
          banned: false,
          useDocument: false,
          bank: 0,
          level: 0,
          role: 'Nuv',
          premium: false,
          premiumTime: 0,
        }

      let chat = global.db.data.chats[m.chat]
      if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
      if (chat) {
        if (!('isBanned' in chat)) chat.isBanned = false
        if (!('sAutoresponder' in chat)) chat.sAutoresponder = ''
        if (!('welcome' in chat)) chat.welcome = true
        if (!('autolevelup' in chat)) chat.autolevelup = false
        if (!('autoAceptar' in chat)) chat.autoAceptar = true
        if (!('autosticker' in chat)) chat.autosticker = false
        if (!('autoRechazar' in chat)) chat.autoRechazar = true
        if (!('autoresponder' in chat)) chat.autoresponder = false
        if (!('detect' in chat)) chat.detect = true
        if (!('antiBot' in chat)) chat.antiBot = true
        if (!('antiBot2' in chat)) chat.antiBot2 = true
        if (!('modoadmin' in chat)) chat.modoadmin = false
        if (!('antiLink' in chat)) chat.antiLink = true
        if (!('reaction' in chat)) chat.reaction = false
        if (!('nsfw' in chat)) chat.nsfw = false
        if (!('antifake' in chat)) chat.antifake = false
        if (!('delete' in chat)) chat.delete = false
        if (!isNumber(chat.expired)) chat.expired = 0
      } else
        global.db.data.chats[m.chat] = {
          isBanned: false,
          sAutoresponder: '',
          welcome: true,
          autolevelup: false,
          autoresponder: false,
          delete: false,
          autoAceptar: true,
          autoRechazar: true,
          detect: true,
          antiBot: true,
          antiBot2: true,
          modoadmin: false,
          antiLink: true,
          antifake: false,
          reaction: false,
          nsfw: false,
          expired: 0,
          antiLag: false,
          per: [],
        }

      var settings = global.db.data.settings[this.user.jid]
      if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
      if (settings) {
        if (!('self' in settings)) settings.self = false
        if (!('restrict' in settings)) settings.restrict = true
        if (!('jadibotmd' in settings)) settings.jadibotmd = true
        if (!('antiPrivate' in settings)) settings.antiPrivate = false
        if (!('autoread' in settings)) settings.autoread = false
      } else global.db.data.settings[this.user.jid] = {
        self: false,
        restrict: true,
        jadibotmd: true,
        antiPrivate: false,
        autoread: false,
        status: 0
      }
    } catch (e) {
      console.error(e)
    }

    if (typeof m.text !== "string") m.text = ""
    const chat = global.db.data.chats[m.chat]
    globalThis.setting = global.db.data.settings[this.user.jid]
    const detectwhat = m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net'
    const isROwner = [...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, "") + detectwhat).includes(m.sender)
    const isOwner = isROwner || m.fromMe
    const isPrems = isROwner || global.db.data.users[m.sender].premiumTime > 0

    if (opts["queque"] && m.text && !(isMods)) {
      const queque = this.msgqueque, time = 1000 * 5
      const previousID = queque[queque.length - 1]
      queque.push(m.id || m.key.id)
      setInterval(async function () {
        if (queque.indexOf(previousID) === -1) clearInterval(this)
        await delay(time)
      }, time)
    }
    if (m.isBaileys) return
    m.exp += Math.ceil(Math.random() * 10)
    let usedPrefix
    let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

    async function getLidFromJid(id, conn) {
      if (id.endsWith('@lid')) return id
      const res = await conn.onWhatsApp(id).catch(() => [])
      return res[0]?.lid || id
    }

    const senderLid = await getLidFromJid(m.sender, conn)
const botLid = await getLidFromJid(conn.user.jid, conn)
const senderJid = m.sender
const botJid = conn.user.jid

const groupMetadata = m.isGroup
  ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(() => null))
  : {}

const participants = m.isGroup && groupMetadata ? (groupMetadata.participants || []) : []

// Normalizamos ID porque en algunas versiones es .id y en otras .jid
const user = participants.find(
  p => (p?.id === senderLid || p?.id === senderJid || p?.jid === senderLid || p?.jid === senderJid)
) || {}

const bot = participants.find(
  p => (p?.id === botLid || p?.id === botJid || p?.jid === botLid || p?.jid === botJid)
) || {}

const isRAdmin = (user && user.admin) === 'superadmin'
const isAdmin = isRAdmin || ((user && user.admin) === 'admin')
const isBotAdmin = !!(bot && bot.admin)
    
    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
for (let name in global.plugins) {
let plugin = global.plugins[name]
if (!plugin)
continue
if (plugin.disabled)
continue
const __filename = join(___dirname, name)
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(this, m, {
chatUpdate,
__dirname: ___dirname,
__filename
})
} catch (e) {
console.error(e)
}}
if (!opts['restrict'])
if (plugin.tags && plugin.tags.includes('admin')) {
continue
}
const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
let match = (_prefix instanceof RegExp ? 
[[_prefix.exec(m.text), _prefix]] :
Array.isArray(_prefix) ?
_prefix.map(p => {
let re = p instanceof RegExp ?
p :
new RegExp(str2Regex(p))
return [re.exec(m.text), re]
}) :
typeof _prefix === 'string' ?
[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
[[[], new RegExp]]
).find(p => p[1])
if (typeof plugin.before === 'function') {
if (await plugin.before.call(this, m, {
match,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}))
continue
}
if (typeof plugin !== 'function')
continue
if ((usedPrefix = (match[0] || '')[0])) {
let noPrefix = m.text.replace(usedPrefix, '')
let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
args = args || []
let _args = noPrefix.trim().split` `.slice(1)
let text = _args.join` `
command = (command || '').toLowerCase()
let fail = plugin.fail || global.dfail
let isAccept = plugin.command instanceof RegExp ? 
plugin.command.test(command) :
Array.isArray(plugin.command) ?
plugin.command.some(cmd => cmd instanceof RegExp ? 
cmd.test(command) :
cmd === command) :
typeof plugin.command === 'string' ? 
plugin.command === command :
false

global.comando = command

if ((m.id.startsWith('NJX-') || (m.id.startsWith('BAE5') && m.id.length === 16) || (m.id.startsWith('B24E') && m.id.length === 20))) return

if (!isAccept) {
continue
}
m.plugin = name
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
if (!['grupo-unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) return
if (name != 'grupo-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'grupo-delete.js' && chat?.isBanned && !isROwner) return
if (m.text && user.banned && !isROwner) {
m.reply(`《✦》Estas baneado/a, no puedes usar comandos en este bot!\n\n${user.bannedReason ? `✰ *Motivo:* ${user.bannedReason}` : '✰ *Motivo:* Sin Especificar'}\n\n> ✧ Si este Bot es cuenta oficial y tiene evidencia que respalde que este mensaje es un error, puedes exponer tu caso con un moderador.`)
return
}

if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let setting = global.db.data.settings[this.user.jid]
if (name != 'grupo-unbanchat.js' && chat?.isBanned)
return 
if (name != 'owner-unbanuser.js' && user?.banned)
return
}}

let hl = _prefix 
let adminMode = global.db.data.chats[m.chat].modoadmin
let mini = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugins.command}`
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mini) return   
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { 
fail('owner', m, this)
continue
}
if (plugin.rowner && !isROwner) { 
fail('rowner', m, this)
continue
}
if (plugin.owner && !isOwner) { 
fail('owner', m, this)
continue
}
if (plugin.mods && !isMods) { 
fail('mods', m, this)
continue
}
if (plugin.premium && !isPrems) { 
fail('premium', m, this)
continue
}
if (plugin.group && !m.isGroup) { 
fail('group', m, this)
continue
} else if (plugin.botAdmin && !isBotAdmin) { 
fail('botAdmin', m, this)
continue
} else if (plugin.admin && !isAdmin) { 
fail('admin', m, this)
continue
}
if (plugin.private && m.isGroup) {
fail('private', m, this)
continue
}
if (plugin.register == true && _user.registered == false) { 
fail('unreg', m, this)
continue
}
m.isCommand = true
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10
m.exp += xp
if (!isPrems && plugin.coin && global.db.data.users[m.sender].coin < plugin.coin * 1) {
conn.reply(m.chat, `❮✦❯ Se agotaron tus ${moneda}`, m)
continue
}
if (plugin.level > _user.level) {
conn.reply(m.chat, `❮✦❯ Se requiere el nivel: *${plugin.level}*\n\n• Tu nivel actual es: *${_user.level}*\n\n• Usa este comando para subir de nivel:\n*${usedPrefix}levelup*`, m)
continue
}
let extra = {
match,
usedPrefix,
noPrefix,
_args,
args,
command,
text,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}
try {
await plugin.call(this, m, extra)
if (!isPrems)
m.coin = m.coin || plugin.coin || false
} catch (e) {
m.error = e
console.error(e)
if (e) {
let text = format(e)
for (let key of Object.values(global.APIKeys))
text = text.replace(new RegExp(key, 'g'), 'Administrador')
m.reply(text)
}
} finally {
if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, extra)
} catch (e) {
console.error(e)
}}
if (m.coin)
conn.reply(m.chat, `❮✦❯ Utilizaste ${+m.coin} ${moneda}`, m)
}
break
}}
} catch (e) {
console.error(e)
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
if (quequeIndex !== -1)
this.msgqueque.splice(quequeIndex, 1)
}
let user, stats = global.db.data.stats
if (m) { let utente = global.db.data.users[m.sender]
if (utente.muto == true) {
let bang = m.key.id
let cancellazzione = m.key.participant
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: cancellazzione }})
}
if (m.sender && (user = global.db.data.users[m.sender])) {
user.exp += m.exp
user.coin -= m.coin * 1
}

let stat
if (m.plugin) {
let now = +new Date
if (m.plugin in stats) {
stat = stats[m.plugin]
if (!isNumber(stat.total))
stat.total = 1
if (!isNumber(stat.success))
stat.success = m.error != null ? 0 : 1
if (!isNumber(stat.last))
stat.last = now
if (!isNumber(stat.lastSuccess))
stat.lastSuccess = m.error != null ? 0 : now
} else
stat = stats[m.plugin] = {
total: 1,
success: m.error != null ? 0 : 1,
last: now,
lastSuccess: m.error != null ? 0 : now
}
stat.total += 1
stat.last = now
if (m.error == null) {
stat.success += 1
stat.lastSuccess = now
}}}

try {
if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
} catch (e) {
console.log(m, m.quoted, e)}
let settingsREAD = global.db.data.settings[this.user.jid] || {}  
if (opts['autoread']) await this.readMessages([m.key])
}}


  global.dfail = (type, m, usedPrefix, command, conn) => {
     const msg = {
  rowner: `🚫 *𝖠𝖢𝖢𝖤𝖲𝖮 𝖱𝖤𝖲𝖳𝖱𝖨𝖭𝖦𝖨𝖣𝖮*\n\n> 𝖲𝗈𝗅𝗈 𝖾𝗅 *𝖢𝗋𝖾𝖺𝖽𝗈𝗋 𝖲𝗎𝗉𝗋𝖾𝗆𝗈* 𝗉𝗎𝖾𝖽𝖾 𝖾𝗃𝖾𝖼𝗎𝗍𝖺𝗋 𝖾𝗌𝗍𝖾 𝗉𝗋𝗈𝗍𝗈𝖼𝗈𝗅𝗈.\n\n🧠 𝖴𝗌𝗎𝖺𝗋𝗂𝗈 𝖠𝗎𝗍𝗈𝗋𝗂𝗓𝖺𝖽𝗈: 👑 𝖣𝖤𝖵‐𝖥𝖤𝖣𝖤𝖷𝖸𝖹𝟣𝟥\n🔗 𝖲𝗂𝗌𝗍𝖾𝗆𝖺: root@𝖲𝗎𝗄𝗂Bot_MD://omega/core`,

  owner: `🔐 *𝖬Ó𝖣𝖴𝖫𝖮 𝖣𝖤𝖵 𝖡𝖫𝖮𝖰𝖴𝖤𝖠𝖣𝖮*\n\n> 𝖤𝗌𝗍𝖺 𝖿𝗎𝗇𝖼𝗂𝗈́𝗇 𝖾𝗌𝗍𝖺́ 𝗋𝖾𝗌𝗍𝗋𝗂𝗇𝗀𝗂𝖽𝖺 𝖺 𝗉𝖾𝗋𝗆𝗂𝗌𝗈𝗌 𝖽𝖾 *𝖣𝖤𝖲𝖠𝖱𝖱𝖮𝖫𝖫𝖠𝖣𝖮𝖱*.\n\n🧬 𝖢𝗈𝗇𝗌𝗈𝗅𝖺: dev@𝖲𝗎𝗄𝗂.ai/core.sh`,

  premium: `💎 *𝖢𝖴𝖤𝖭𝖳𝖠 𝖯𝖱𝖤𝖬𝖨𝖴𝖬 𝖱𝖤𝖰𝖴𝖤𝖱𝖨𝖣𝖠*\n\n> 𝖬𝗈́𝖽𝗎𝗅𝗈 𝖾𝗑𝖼𝗅𝗎𝗌𝗂𝗏𝗈 𝗉𝖺𝗋𝖺 𝗎𝗌𝗎𝖺𝗋𝗂𝗈𝗌 *𝖵𝖨𝖯 - 𝖯𝖱𝖤𝖬𝖨𝖴𝖬*.\n\n📡 𝖠𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺 𝗍𝗎 𝗉𝗅𝖺𝗇 𝖼𝗈𝗇: */vip*\n⚙️ 𝖤𝗌𝗍𝖺𝖽𝗈: 𝖽𝖾𝗇𝖾𝗀𝖺𝖽𝗈`,

  private: `📱 *𝖲𝖮𝖫𝖮 𝖢𝖧𝖠𝖳 𝖯𝖱𝖨𝖵𝖠𝖣𝖮*\n\n> 𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗇𝗈 𝖾𝗌𝗍𝖺́ 𝖽𝗂𝗌𝗉𝗈𝗇𝗂𝖻𝗅𝖾 𝖾𝗇 𝗀𝗋𝗎𝗉𝗈𝗌.\n\n🔒 𝖤𝗃𝖾𝖼𝗎𝗍𝖺𝗅𝗈 𝖾𝗇 𝗉𝗋𝗂𝗏𝖺𝖽𝗈.`,

  admin: `🛡️ *𝖥𝖴𝖭𝖢𝖨Ó𝖭 𝖱𝖤𝖲𝖳𝖱𝖨𝖭𝖦𝖨𝖣𝖠 𝖠 𝖠𝖣𝖬𝖨𝖭𝖲*\n\n> 𝖲𝗈𝗅𝗈 𝗅𝗈𝗌 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝖽𝗈𝗋𝖾𝗌 𝗉𝗎𝖾𝖽𝖾𝗇 𝗎𝗌𝖺𝗋 𝖾𝗌𝗍𝖾 𝗆𝗈́𝖽𝗎𝗅𝗈.\n\n⚠️ 𝖠𝖼𝖼𝖾𝗌𝗈 𝗇𝗈 𝖺𝗎𝗍𝗈𝗋𝗂𝗓𝖺𝖽𝗈.`,

  botAdmin: `🤖 *𝖲𝗎𝗄𝗂 𝗇𝗈 𝗍𝗂𝖾𝗇𝖾 𝗉𝖾𝗋𝗆𝗂𝗌𝗈𝗌*\n\n> 𝖭𝖾𝖼𝖾𝗌𝗂𝗍𝗈 𝗌𝖾𝗋 𝖠𝖽𝗆𝗂𝗇 𝗉𝖺𝗋𝖺 𝖾𝗃𝖾𝖼𝗎𝗍𝖺𝗋 𝖾𝗌𝗍𝖾 𝗉𝗋𝗈𝗍𝗈𝖼𝗈𝗅𝗈.\n\n🔧 𝖣𝖺𝗆𝖾 𝗉𝖾𝗋𝗆𝗂𝗌𝗈𝗌 𝖼𝗈𝗇: *dar al bot admin*\n🔒 𝖤𝗌𝗍𝖺𝖽𝗈: *no admin XD*`,

  unreg: `📄 *𝖴𝖲𝖴𝖠𝖱𝖨𝖮 𝖭𝖮 𝖱𝖤𝖦𝖨𝖲𝖳𝖱𝖠𝖣𝖮*\n\n> 🚫 𝖭𝗈 𝗉𝗎𝖾𝖽𝖾𝗌 𝗎𝗌𝖺𝗋 𝖾𝗅 𝖻𝗈𝗍 𝗌𝗂𝗇 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝗋𝗍𝖾.\n\n🔐 𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝗍𝖾 𝖼𝗈𝗇: */reg nombre.edad*\n📍 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: */reg 𝖲𝗎𝗄𝗂.18*\n\n📡 𝖢𝖺𝗇𝖺𝗅 𝗈𝖿𝗂𝖼𝗂𝖺𝗅:\nhttps://whatsapp.com/channel/0029Vai28FR7dmea9gytQm3w\n📂 𝖢𝗋𝖾𝖺𝖽𝗈𝗋: 𝖣𝖤𝖵‐𝖥𝖤𝖣𝖤𝖷𝖸𝖹𝟣𝟥`,

  restrict: `🚷 *𝖬Ó𝖣𝖴𝖫𝖮 𝖡𝖫𝖮𝖰𝖴𝖤𝖠𝖣𝖮 𝖦𝖫𝖮𝖡𝖠𝖫𝖬𝖤𝖭𝖳𝖤*\n\n> 𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝖿𝗎𝖾 𝖽𝖾𝗌𝖺𝖼𝗍𝗂𝗏𝖺𝖽𝗈 𝗉𝗈𝗋 𝖾𝗅 *𝖮𝗉𝖾𝗋𝖺𝖽𝗈𝗋 𝖦𝗅𝗈𝖻𝖺𝗅* 𝗉𝗈𝗋 𝗋𝖺𝗓𝗈𝗇𝖾𝗌 𝖽𝖾 𝗌𝖾𝗀𝗎𝗋𝗂𝖽𝖺𝖽.\n\n🧩 𝖬Ó𝖣𝖴𝖫𝖮: */xvideos*`,
        }[type];
if (msg) return m.reply(msg).then(_ => m.react('✖️'))}

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
unwatchFile(file)
console.log(chalk.magenta("Se actualizo 'handler.js'"))

if (global.conns && global.conns.length > 0 ) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
for (const userr of users) {
userr.subreloadHandler(false)
}}})

import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

// BETA: Si quiere evitar escribir el número que será bot en la consola
global.botNumber = '' // Ejemplo: 525218138672


//*──ׄ✞ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.owner = [
  ['5491156178758', 'creador fede', true],
  ['573001533523', 'Colaborador Brayans', true],
  ['5491176429276', 'SukiBot Oficial', true],
  [''], // poner Su número 
  ['']  // poner su número 
];

global.mods = []
global.suittag = ['5215211111111'] 
global.prems = []

global.Owner.ID = [
  {
    jid: '5491156178758@s.whatsapp.net',
    nombre: '𝖿𝖾𝖽𝖾𝗑𝗒𝗓13',
    rol: 'Creador Principal',
    premium: true
},
  {
    jid: '525544876071@s.whatsapp.net',
    nombre: 'DevBrayan',
    rol: 'Colaborador Oficial',
    premium: true
},
  {
    jid: '5491176429276@s.whatsapp.net',
    nombre: 'sukiBot',
    rol: 'número Oficial de Suki',
    premium: true
}
];

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.9' 
global.languaje = 'Español'
global.vs = '2.2.0'
global.vsJB = '5.0'
global.nameqr = 'SukiBot'
global.sessions = 'SukiSession'
global.jadi = 'SukiJadiBot'
global.blackJadibts = true

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.packsticker = `
┃ ✞ 𝙱𝙾𝚃: 𝙱𝚕𝚊𝚌𝚔 𝙲𝚕𝚘𝚟𝚎𝚛 ☘
┃ ✞ 𝙰𝚄𝚃𝙾𝚁: 👑 𝚃𝙷𝙴 𝙲𝙰𝚁𝙻𝙾𝚂 ᚲ`;

global.packname = `🎄 Sᴜᴋɪ𝐁𝐨𝐭_MD 🎋`;
global.author = `
⇝ 📆 ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}
⇝ ⏰ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}
♾━━━━━━━━━━━━━━━♾`;

global.wm = '🎄 Sᴜᴋɪ𝐁𝐨𝐭_MD 🎋';
global.titulowm = '🎄 Sᴜᴋɪ𝐁𝐨𝐭_MD 🎋';
global.igfg = '୧ ꜰᴇᴅᴇxʏᴢㅤ🎋'
global.botname = '𝕭𝖑𝖆𝖈𝖐 𝕮𝖑𝖔𝖛𝖊𝖗 ☘'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ꜰᴇᴅᴇxʏᴢㅤ🍁'
global.textbot = '🎄 Sᴜᴋɪ𝐁𝐨𝐭_MD  𝐁ᥡ ꜰᴇᴅᴇxʏᴢ'
global.gt = '🎄 Sᴜᴋɪ𝐁𝐨𝐭_MD 🎋';
global.namechannel = '🎄 Sᴜᴋɪ𝐁𝐨𝐭_MD  𝐁ᥡ ꜰᴇᴅᴇxʏᴢ'

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.monedas = 'monedas'

// LINKS PRINCIPALES
global.gp1 = 'https://chat.whatsapp.com/IbADO35sBSC4G1FBTGbHIE?mode=ac_t'
global.gp2 = 'https://chat.whatsapp.com/FiBcPMYEO7mG4m16gBbwpP?mode=ac_t'
global.comunidad1 = 'https://chat.whatsapp.com/FgQ4q11AjaO8ddyc1LvK4r?mode=ac_t'
global.channel = 'https://whatsapp.com/channel/0029Vai28FR7dmea9gytQm3w'
global.channel2 = 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W'
global.cn = 'https://whatsapp.com/channel/0029Vai28FR7dmea9gytQm3w'
global.yt = 'https://www.youtube.com/@ElCarlos.87'
global.md = 'https://github.com/thecarlos19/black-clover-MD'
global.correo = ''

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.photoSity = [global.catalogo]

global.estilo = { 
  key: {  
    fromMe: false, 
    participant: `0@s.whatsapp.net`, 
    ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) 
  }, 
  message: { 
    orderMessage: { 
      itemCount : -999999, 
      status: 1, 
      surface : 1, 
      message: global.packname, 
      orderTitle: 'Bang', 
      thumbnail: global.catalogo, 
      sellerJid: '0@s.whatsapp.net'
    }
  }
}

global.ch = {
  ch1: "120363307694217288@newsletter"
}
global.rcanal = global.ch.ch1

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.MyApiRestBaseUrl = 'https://api.cafirexos.com';
global.MyApiRestApikey = 'BrunoSobrino';
global.fgkeysapi = "elrebelde21";
global.openai_org_id = 'org-3';
global.openai_key = 'sk-0';

global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = global.keysZens[Math.floor(global.keysZens.length * Math.random())];

global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = global.keysxteammm[Math.floor(global.keysxteammm.length * Math.random())];

global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = global.keysneoxrrr[Math.floor(global.keysneoxrrr.length * Math.random())];

global.lolkeysapi = ['kurumi']; 
global.itsrose = ['4b146102c4d500809da9d1ff'];

global.apis = 'https://delirius-apiofc.vercel.app'

global.APIs = {
  ryzen: 'https://api.ryzendesu.vip',
  ApiEmpire: 'https://api-brunosobrino.zipponodes.xyz',
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  neoxr: 'https://api.neoxr.my.id',
  delirius: 'https://delirius-apiofc.vercel.app',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz',
  xcoders: 'https://api-xcoders.site',
  vihangayt: 'https://vihangayt.me',
  erdwpe: 'https://api.erdwpe.com',
  xyroinee: 'https://api.xyroinee.xyz',
  nekobot: 'https://nekobot.xyz'
}

global.APIKeys = {
  'https://api.xteam.xyz': `${global.keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${global.keysneoxr}`,
  'https://api.zahwazein.xyz': `${global.keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.fgmods.xyz': `${global.fgkeysapi}`,
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren',
  'https://api.xyroinee.xyz': 'uwgflzFEh6'
};

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

global.multiplier = 69
global.maxwarn = '3'

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})

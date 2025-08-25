import { totalmem, freemem} from 'os';
import speed from 'performance-now';
import { sizeFormatter} from 'human-readable';

const format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`
});

let handler = async (m, { conn}) => {
  const timestamp = speed();
  const latencia = speed() - timestamp;

  const _muptime = process.uptime() * 1000;
  const muptime = clockString(_muptime);

  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groups = chats.filter(([jid, chat]) => jid.endsWith('@g.us') &&!chat.metadata?.read_only &&!chat.metadata?.announce);

  const texto = `
𓆩𖥧𖥣𖥧𓆪 ꒰ 𝖲𝗉𝖾𝖾𝖽 𝖽𝖾 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣 ꒱ 𖥔˚₊

✈️ 𝖵𝖾𝗅𝗈𝖼𝗂𝖽𝖺𝖽:
→ *${latencia.toFixed(4)} ms*

🕒 𝖳𝗂𝖾𝗆𝗉𝗈 𝖠𝖼𝗍𝗂𝗏𝗈:
→ *${muptime}*

💫 𝖢𝗁𝖺𝗍𝗌:
→ *${chats.length}* privados
→ *${groups.length}* grupos

🧁 𝖱𝖠𝖬 𝖤𝗇 𝗎𝗌𝗈:
→ *${format(totalmem() - freemem())}* / *${format(totalmem())}*

⧉ 𝖲𝗎𝗄𝗂 𝖿𝗎𝗇𝖼𝗂𝗈𝗇𝖺 𝖼𝗈𝗇 𝖾𝗇𝖾𝗋𝗀𝗂́𝖺 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈𝗋𝖺 🌸
`.trim();

  await m.react('🌸');
  await conn.reply(m.chat, texto, m);
};

handler.help = ['speed'];
handler.tags = ['info'];
handler.command = ['speed'];
handler.register = true;

export default handler;

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

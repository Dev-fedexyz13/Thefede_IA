import os from 'os';
import { execSync} from 'child_process';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0? 0: decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getDiskSpace = () => {
  try {
    const stdout = execSync('df -h | grep -E "^/dev/root|^/dev/sda1"').toString();
    const [, size, used, available, usePercent] = stdout.split(/\s+/);
    return { size, used, available, usePercent};
} catch (error) {
    console.error('✧ Error al obtener el espacio en disco:', error);
    return null;
}
};

const handler = async (m, { conn}) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const _muptime = process.uptime() * 1000;
  const muptime = clockString(_muptime);
  const hostname = os.hostname();
  const platform = os.platform();
  const arch = os.arch();
  const nodeUsage = process.memoryUsage();
  const diskSpace = getDiskSpace();

  const texto = `
𓆩𖥧𖥣𖥧𓆪 ꒰ 𝖲𝗂𝗌𝗍𝖾𝗆𝖺 𝖽𝖾 𝖲𝗎𝗄𝗂𝖡𝗈𝗍_𝖬𝖣 ꒱ 𖥔˚₊

🧁 𝖧𝗈𝗌𝗍: *${hostname}*
📦 𝖲𝗈: *${platform}*
🎀 𝖠𝗋𝗊𝗎𝗂𝗍𝖾𝖼𝗍𝗎𝗋𝖺: *${arch}*
🪄 𝖱𝖠𝖬 𝖳𝗈𝗍𝖺𝗅: *${formatBytes(totalMem)}*
🌸 𝖱𝖠𝖬 𝖫𝗂𝖻𝗋𝖾: *${formatBytes(freeMem)}*
🍓 𝖱𝖠𝖬 𝖴𝗌𝖺𝖽𝖺: *${formatBytes(usedMem)}*
🕒 𝖳𝗂𝖾𝗆𝗉𝗈 𝖠𝖼𝗍𝗂𝗏𝗈: *${muptime}*

📊 𝖴𝗌𝗈 𝖽𝖾 𝖬𝖾𝗆𝗈𝗋𝗂𝖺 𝖭𝗈𝖽𝖾:
→ RSS: *${formatBytes(nodeUsage.rss)}*
→ Heap Total: *${formatBytes(nodeUsage.heapTotal)}*
→ Heap Usado: *${formatBytes(nodeUsage.heapUsed)}*
→ Externa: *${formatBytes(nodeUsage.external)}*
→ Arreglos: *${formatBytes(nodeUsage.arrayBuffers)}*

${diskSpace? `
☁️ 𝖤𝗌𝗉𝖺𝖼𝗂𝗈 𝖾𝗇 𝖣𝗂𝗌𝖼𝗈:
→ 𝖳𝗈𝗍𝖺𝗅: *${diskSpace.size}*
→ 𝖴𝗌𝖺𝖽𝗈: *${diskSpace.used}*
→ 𝖣𝗂𝗌𝗉𝗈𝗇𝗂𝖻𝗅𝖾: *${diskSpace.available}*
→ 𝖴𝗌𝗈: *${diskSpace.usePercent}*`: '⚠️ No se pudo obtener el espacio en disco.'}

⧉ 𝖲𝗎𝗄𝗂 𝖿𝗎𝗇𝖼𝗂𝗈𝗇𝖺 𝖼𝗈𝗇 𝖾𝗇𝖾𝗋𝗀𝗂́𝖺 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈𝗋𝖺 ✨
`.trim();

  await conn.reply(m.chat, texto, m);
};

handler.help = ['sistema'];
handler.tags = ['info'];
handler.command = ['system', 'sistema'];
handler.register = true;

export default handler;

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

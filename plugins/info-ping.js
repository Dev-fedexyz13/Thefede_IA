import speed from 'performance-now';
import { exec} from 'child_process';

let handler = async (m, { conn}) => {
  let timestamp = speed();
  let latencia = speed() - timestamp;

  const now = new Date();
  const fecha = now.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});
  const hora = now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
});

  exec(`neofetch --stdout`, async (error, stdout, stderr) => {
    let info = stdout.toString("utf-8").replace(/Memory:/, "Ram:");

    const respuesta = `
╭─❀ *𝖲𝗎𝗄𝗂Bot_MD* ❀─╮
┃ ✨ 𝖯𝗂𝗇𝗀 𝖾𝗇𝖼𝖺𝗇𝖼𝖺𝖽𝗈
┃ 🕐 𝖳𝗂𝖾𝗆𝗉𝗈 𝖽𝖾 𝗋𝖾𝗌𝗉𝗎𝖾𝗌𝗍𝖺: *${latencia.toFixed(4)} ms*
┃ 📅 𝖥𝖾𝖼𝗁𝖺: *${fecha}*
┃ ⏰ 𝖧𝗈𝗋𝖺: *${hora}*
┃ 📊 𝖨𝗇𝖿𝗈 𝗌𝗂𝗌𝗍𝖾𝗆𝖺:
╰───────────────╯

${info}
`.trim();

    await conn.sendMessage(m.chat, {
      text: respuesta,
      footer: '🍁 𝖲𝗎𝗄𝗂Bot_MD 𝗈𝗳𝗂𝗰𝗂𝗮𝗅',
      buttons: [
        {
          buttonId: '.menu',
          buttonText: { displayText: '🍂 Menú'},
          type: 1
}
      ],
      contextInfo: {
        externalAdReply: {
          title: '𝖲𝗎𝗄𝗂Bot_MD',
          body: '🕹 Canal de soporte y novedades',
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/rgelVn5i.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
}
}
}, { quoted: m});
});
};

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping', 'p'];
handler.register = true;

export default handler;

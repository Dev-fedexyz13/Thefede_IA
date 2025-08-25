import axios from 'axios';

const sukiIcon = 'https://files.catbox.moe/rkvuzb.jpg';
const channelRD = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

const handler = async (m, { text, conn, args}) => {
  const name = conn.getName(m.sender);

  const contextInfo = {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
    externalAdReply: {
      title: '✨ Suki nako ga | Descarga desde Facebook',
      body: `🎀 Descargando video para preciosura ${name}`,
      thumbnailUrl: sukiIcon,
      sourceUrl: channelRD,
      mediaType: 1,
      renderLargerThumbnail: true
}
};

  if (!args[0]) {
    return conn.reply(
      m.chat,
      `🌸 *Oh no, preciosura ${name}~!* Necesito que me des el enlace de Facebook para ayudarte.\n\n✨ Ejemplo:\nfacebook https://fb.watch/xxx`,
      m,
      { contextInfo, quoted: m}
);
}

  const fbUrl = args[0];
  let result;

  try {
    await m.react('🔎');
    const res = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/facebook?url=${encodeURIComponent(fbUrl)}`);
    result = res.data;
} catch (e) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `😭 *Upss ${name}, hubo un problemita mágico al intentar descargar.*\nVerifica que el enlace sea válido 🌐`,
      m,
      { contextInfo, quoted: m}
);
}

  if (!result || result.length === 0) {
    return conn.reply(
      m.chat,
      `💔 *No encontré ningún video en ese enlace, preciosura.*\n¿Puedes darme otro que esté más clarito? 🌺`,
      m,
      { contextInfo, quoted: m}
);
}

  const videoHD = result.find(v => v.quality === '720p (HD)');
  const videoSD = result.find(v => v.quality === '360p (SD)');
  const videoUrl = videoHD?.link_hd || videoSD?.link_sd;

  if (!videoUrl) {
    return conn.reply(
      m.chat,
      `😢 *No encontré resolución adecuada para enviarte el video, preciosura.*`,
      m,
      { contextInfo, quoted: m}
);
}

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: videoUrl},
          caption: `🍓 *Tu video ha llegado con mucho amor, preciosura ${name}~*`,
          fileName: 'suki-fb.mp4',
          mimetype: 'video/mp4',
},
        { quoted: m}
);
      await m.react('✅');
      break;
} catch (e) {
      if (attempt === maxRetries) {
        await m.react('❌');
        return conn.reply(
          m.chat,
          `💔 *No pude enviarte el video después de varios intentos, preciosura...*`,
          m,
          { contextInfo, quoted: m}
);
}
      await new Promise(resolve => setTimeout(resolve, 1000));
}
}
};

handler.help = ['facebook', 'fb'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb'];
handler.register = true;

export default handler;

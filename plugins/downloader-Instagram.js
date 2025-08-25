// Código mejorado por fedexyz 🍁
// no quites los créditos 💳

import axios from 'axios';

const handler = async (m, { text, conn, args}) => {
  const instagramUrl = args[0];

  if (!instagramUrl) {
    await m.react('🪼');
    return conn.reply(
      m.chat,
      '🐬 *𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝗂𝗇𝗀𝗋𝖾𝗌𝖺 𝗎𝗇 𝖾𝗇𝗅𝖺𝖼𝖾 𝖽𝖾 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆.*\n📎 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: https://www.instagram.com/reel/xyz/',
      m,
      rcanal
);
}

  try {
    await m.react('🐬');
    const res = await axios.get(
      `https://apis-starlights-team.koyeb.app/starlight/instagram-dl?url=${encodeURIComponent(instagramUrl)}`
);

    const result = res.data;
    const videoData = result?.data?.[0];
    const videoUrl = videoData?.dl_url;

    if (!videoUrl) {
      await m.react('🫧');
      return conn.reply(
        m.chat,
        '🪼 *𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝗈́ 𝗎𝗇 𝖾𝗇𝗅𝖺𝖼𝖾 𝗏𝖺́𝗅𝗂𝖽𝗈 𝖽𝖾 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺.*',
        m,
        rcanal
);
}

    const maxRetries = 3;
    let success = false;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await conn.sendMessage(
          m.chat,
          {
            video: { url: videoUrl},
            caption: '🐬 *𝖠𝗊𝗎𝗂 𝗍𝗂𝖾𝗇𝖾𝗌 𝗍𝗎 𝗏𝗂𝖽𝖾𝗈 𝖽𝖾 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆.*',
            fileName: 'instagram.mp4',
            mimetype: 'video/mp4'
},
          { quoted: m}
);
        await m.react('✅');
        success = true;
        break;
} catch (e) {
        if (attempt === maxRetries) {
          await m.react('❌');
          return conn.reply(
            m.chat,
            '🐬 *𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝖾𝗇𝗏𝗂𝖺𝗋 𝖾𝗅 𝗏𝗂𝖽𝖾𝗈 𝗅𝗎𝖾𝗀𝗈 𝖽𝖾 𝗏𝖺𝗋𝗂𝗈𝗌 𝗂𝗇𝗍𝖾𝗇𝗍𝗈𝗌.*',
            m
);
}
        await new Promise(resolve => setTimeout(resolve, 1000));
}
}

    if (!success) {
      await m.react('💥');
      return conn.reply(
        m.chat,
        '🐬 *𝖭𝗈 𝗌𝖾 𝗉𝗎𝖽𝗈 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝖺𝗋 𝗅𝖺 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺.*',
        m
);
}
} catch (e) {
    await m.react('💔');
    return conn.reply(
      m.chat,
      '🐬 *𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝗅𝗈𝗌 𝖽𝖺𝗍𝗈𝗌. 𝖵𝖾𝗋𝗂𝖿𝗂𝖼𝖺 𝖾𝗅 𝖾𝗇𝗅𝖺𝖼𝖾.*',
      m,
      rcanal
);
}
};

handler.help =  ['ig', 'instagram', 'igdl'];
handler.tags = ['descargas'];
handler.command = ['ig', 'instagram', 'igdl']
handler.register = true;

export default handler;

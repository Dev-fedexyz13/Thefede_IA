import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  generateWAMessageContent
} = (await import("@whiskeysockets/baileys")).default;

// Configuración
const API_URL = "https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=";
const MAX_RESULTS = 7;

const handler = async (message, { conn, text}) => {
  if (!text) {
    return conn.reply(
      message.chat,
      "🍁 𝑷𝒐𝒓 𝒇𝒂𝒗𝒐𝒓, 𝒏𝒐 𝒎𝒆 𝒅𝒆𝒋𝒆𝒔 𝒆𝒏 𝒃𝒍𝒂𝒏𝒄𝒐... 𝒆𝒔𝒄𝒓𝒊𝒃𝒆 𝒂𝒍𝒈𝒐 ✨.",
      message
);
}

  // Función para crear mensaje de video
  const createVideoMessage = async (url) => {
    const { videoMessage} = await generateWAMessageContent(
      { video: { url}},
      { upload: conn.waUploadToServer}
);
    return videoMessage;
};

  // Función para mezclar resultados
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i> 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
}
};

  try {
    // Mensaje de carga
    await conn.reply(message.chat, '*♡⃛ 𝑬𝒏𝒗𝒊𝒂𝒏𝒅𝒐 𝒍𝒐 𝒒𝒖𝒆 𝒉𝒂𝒔 𝒃𝒖𝒔𝒄𝒂𝒅𝒐...*', message, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: '♡ ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ',
          body: global.dev,
          previewType: 0,
          thumbnail: global.avatar,
          sourceUrl: global.redes
}
}
});

    // Obtener resultados desde la API
    const { data} = await axios.get(API_URL + encodeURIComponent(text));
    const searchResults = data.data || [];

    if (searchResults.length === 0) {
      return conn.reply(message.chat, "⚠︎ No se encontraron resultados para tu búsqueda.", message);
}

    shuffleArray(searchResults);
    const topResults = searchResults.slice(0, MAX_RESULTS);

    // Construir tarjetas de video
    const cards = [];
    for (const result of topResults) {
      const videoMsg = await createVideoMessage(result.nowm);
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null}),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: global.dev}),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: result.title,
          hasMediaAttachment: true,
          videoMessage: videoMsg
}),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: []})
});
}

    // Construir mensaje interactivo tipo carrusel
    const interactiveContent = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
},
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `✧ RESULTADO DE: ${text}`
}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: global.dev
}),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
}),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards})
})
}
}
}, { quoted: message});

    // Enviar mensaje
    await conn.relayMessage(message.chat, interactiveContent.message, {
      messageId: interactiveContent.key.id
});

} catch (error) {
    console.error("Error en tiktoksearch:", error);
    conn.reply(message.chat, `⚠︎ *OCURRIÓ UN ERROR:* ${error.message}`, message);
}
};

// Metadatos del comando
handler.help = ["tiktoksearch <texto>"];
handler.tags = ["buscador"];
handler.command = ["tiktoksearch", "ttss", "tiktoks"];
handler.register = true;
handler.group = true;

export default handler;

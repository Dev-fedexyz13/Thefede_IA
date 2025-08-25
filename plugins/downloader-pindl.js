// código creado por fedexyz 🍂
// no quites los créditos ✨

import axios from 'axios'

const handler = async (m, { conn, text, command}) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `📌 𝖲𝗎𝗄𝗂 necesita un enlace para trabajar su magia, maestro.\n\n✨ Ejemplo:\n.${command} https://id.pinterest.com/pin/16044142417873989/`
}, { quoted: m})
}

  await conn.sendMessage(m.chat, {
    react: { text: '🔮', key: m.key}
})

  try {
    const isYouTube = /youtu\.be|youtube\.com/.test(text)

    if (isYouTube) {
      const res = await axios.get(`https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(text)}`)
      const { title, result} = res.data

      if (!result?.url) throw new Error('𝖲𝗎𝗄𝗂 no pudo encontrar el audio. ¿Seguro que el enlace es válido?')

      await conn.sendMessage(m.chat, {
        text: `🎧 *𝖲𝗎𝗄𝗂Bot_MD ha preparado tu audio:*\n\n📌 *Título:* ${title}\n📥 *Formato:* MP3\n\nToca el botón para descargarlo~`,
        footer: '✨ Descarga mágica cortesía de 𝖲𝗎𝗄𝗂',
        templateButtons: [
          {
            index: 1,
            urlButton: {
              displayText: '🔊 Descargar Audio',
              url: result.url
}
}
        ]
}, { quoted: m})

      await conn.sendMessage(m.chat, {
        react: { text: '✅', key: m.key}
})
      return
}

    const res = await pinterestDL(text)
    if (!res.success ||!res.media.length) {
      await conn.sendMessage(m.chat, {
        react: { text: '❌', key: m.key}
})
      return conn.sendMessage(m.chat, {
        text: '😿 𝖲𝗎𝗄𝗂 no pudo encontrar la imagen. ¿Seguro que el enlace es válido?'
}, { quoted: m})
}

    const best = res.media[0]
    if (!best.url) throw new Error('¡Oh no! La imagen se desvaneció como polvo de estrellas.')

    const type = best.extension === 'jpg'? 'image': 'video'

    await conn.sendMessage(m.chat, {
      [type]: { url: best.url},
      caption: `🌸 *𝖲𝗎𝗄𝗂Bot_MD ha encontrado esto para ti:*\n\n🎞️ *Tipo:* ${best.extension.toUpperCase()}\n📁 *Calidad:* ${best.quality || 'Estándar'}\n📦 *Tamaño:* ${best.size? (best.size / 1024).toFixed(2) + ' KB': 'Desconocido'}`
}, { quoted: m})

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key}
})
} catch (err) {
    console.error(err)
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key}
})
    await conn.sendMessage(m.chat, {
      text: '😤 𝖲𝗎𝗄𝗂 se ha tropezado con un error. Intenta de nuevo más tarde, maestro.'
}, { quoted: m})
}
}

handler.help = ['pindl <url>']
handler.tags = ['descargas']
handler.command = ['pindl', 'pinterestdl', 'píndl']

export default handler

// 🌌 Función para descargar desde Pinterest
async function pinterestDL(url) {
  try {
    if (!url) throw new Error('𝖲𝗎𝗄𝗂 necesita un enlace para comenzar su hechizo.')

    const res = await axios.get(`https://pinterestdownloader.io/frontendService/DownloaderService?url=${url}`, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Origin': 'https://pinterestdownloader.io',
        'Referer': 'https://pinterestdownloader.io/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/130.0.0.0 Safari/537.36'
}
})

    const data = res.data
    if (!data?.medias) throw new Error('No se encontró ningún medio. ¿Será un hechizo roto?')

    const originalsSet = new Set()
    const mediaList = []

    for (const media of data.medias) {
      mediaList.push(media)

      if (media.extension === 'jpg' && media.url.includes('i.pinimg.com/')) {
        
        const originalUrl = media.url.replace(/\/\d+x\//, '/originals/')
        if (!originalsSet.has(originalUrl)) {
          originalsSet.add(originalUrl)
          mediaList.push({...media, url: originalUrl, quality: 'original'})
}
}
}

    const sorted = mediaList.sort((a, b) => (b.size || 0) - (a.size || 0))

    return {
      success: true,
      media: sorted
}
} catch (e) {
    return { success: false, error: e.message}
}
}

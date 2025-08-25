import axios from 'axios'

const handler = async (m, { conn, text}) => {
  if (!text) {
    return m.reply('📎 *Por favor ingresa un enlace de Mediafire para continuar.*\nEjemplo: https://www.mediafire.com/file/...')
}

  if (!/^https?:\/\/(www\.)?mediafire\.com\/file\/.+/.test(text)) {
    return m.reply('❗ *Enlace inválido.* Asegúrate de que sea un enlace directo de Mediafire.\nEjemplo válido:\nhttps://www.mediafire.com/file/abc123/archivo.zip')
}

  try {
    // ⏳ Reacción de carga
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key}})

    const apiUrl = `https://delirius-apiofc.vercel.app/download/mediafire?url=${encodeURIComponent(text)}`
    const { data} = await axios.get(apiUrl)

    if (!data?.data?.link) throw new Error('No se pudo obtener el archivo.')

    const { filename, size, extension, link} = data.data

    const caption = `
📥 *Descarga completada desde Mediafire*

🧾 *Nombre:* ${filename}
📦 *Tamaño:* ${size}
📄 *Tipo:* ${extension || 'Desconocido'}
🔗 *Enlace directo:* ${link}
`.trim()

    await conn.sendFile(m.chat, link, filename, caption, m)

} catch (err) {
    console.error('❌ Error al descargar desde Mediafire:', err)
    m.reply('🚫 *Error al procesar el enlace.* Puede que el archivo no exista, el enlace esté roto o la API esté temporalmente fuera de servicio.')
}
}

handler.help = ['mediafire <enlace>']
handler.tags = ['downloader']
handler.command = ['mediafire']
handler.register = false
export default handler

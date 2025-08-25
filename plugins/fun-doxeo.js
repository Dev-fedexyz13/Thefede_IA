import { performance} from 'perf_hooks';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

let handler = async (m, { conn, text}) => {
  let who;
  let userName;
  let numero;

  if (m.isGroup) {
    if (m.mentionedJid.length> 0) {
      who = m.mentionedJid[0];
} else if (m.quoted) {
      who = m.quoted.sender;
} else {
      who = m.sender;
}
} else {
    who = m.sender;
}

  userName = global.db?.data?.users?.[who]?.name || text || 'Usuario desconocido';
  numero = who.split('@')[0];

  const pasos = [
    `🧑‍💻 Iniciando doxeo virtual de *${userName}*...`,
    `📲 Rastreo del número +${numero} en curso...`,
    '🔍 Analizando señal y triangulación satelital...',
    '📡 Conectando con torres cercanas...',
    '📂 Accediendo a documentación simulada...',
    '🌐 Rastreo de perfiles sociales...',
    '🛰️ Localizando última ubicación conocida...',
    '📊 Compilando historial de actividad...',
    '✅ Generando informe completo...'
  ];

  for (const paso of pasos) {
    await conn.sendMessage(m.chat, { text: paso}, { quoted: m});
    await delay(1200);
}

  const documentosFalsos = `
📂 *Documentación simulada*

• DNI: 45.982.317
• Pasaporte: XR9203845AR
• Licencia de conducir: B-928374-AZ
• Registro académico: Universidad Pastelcore — Ingeniería en Bots
• Matrícula profesional: BOT-AR-2025-001
• Certificado de vacunación: COVID-19 (3 dosis) + AnimeVirus
• Número de seguridad social: 697-91-9151
• ID de empleado: SukiCorp-8821
• Estado civil: En relación con el código fuente
• Firma digital: ✒️ 0xA7F9B2C1D3E4F5
`;

  const perfilesSociales = `
🌐 *Perfiles digitales simulados*

• Facebook: @${userName.toLowerCase().replace(/\s/g, '')}.official
• Instagram: @${userName.toLowerCase().replace(/\s/g, '')}_md
• TikTok: @${userName.toLowerCase().replace(/\s/g, '')}_core
• Twitter: @${userName.toLowerCase().replace(/\s/g, '')}_suki
• Discord: ${userName}#8821
• Steam: ${userName.toLowerCase().replace(/\s/g, '')}_gamerx
• GitHub: github.com/${userName.toLowerCase().replace(/\s/g, '')}-dev
• LinkedIn: linkedin.com/in/${userName.toLowerCase().replace(/\s/g, '')}
• Última conexión: hace 2 horas
• Estado: Activa en modo pastelcore
`;

  const historialActividad = `
📊 *Historial de actividad reciente*

• WhatsApp Web: conectado hace 3h
• YouTube: viendo "Cómo crear tu propio bot kawaii"
• Spotify: escuchando "Lo-Fi para programar"
• Google Search: "cómo ocultar mi IP"
• Telegram: activo en grupo privado
• TikTok: 12 videos vistos hoy
• Instagram: 3 publicaciones nuevas
`;

  const dispositivo = `
📱 *Dispositivo simulado*

• Modelo: Xiaomi MiBot-X
• Sistema operativo: Android 13 (emulado)
• Batería: 62%
• Modo: Oscuro activado
• VPN: Activa (Japón)
• Red: NAT privada
• MAC: 00:1A:2B:3C:4D:5E
• IP local: 192.168.1.12
• IP pública: 172.31.255.204
• ISP: FiberLink Communications
• Puertos abiertos: TCP 443, UDP 53, TCP 22
`;

  const doxeo = `🛰️ *Informe de rastreo digital*

📅 Fecha: ${new Date().toLocaleDateString()}
⏰ Hora: ${new Date().toLocaleTimeString()}

📞 Número rastreado: +${numero}
👤 Nombre asociado: ${userName}
📡 Tipo de señal: LTE 4G+
📶 Intensidad: 87%
🔐 Estado: Encriptado (modo sigiloso)
🧭 Última ubicación: triangulada por 3 torres activas

${documentosFalsos}
${perfilesSociales}
${historialActividad}
${dispositivo}

🧃 Datos generados por el sistema de simulación pastelcore 🍓`;

  await conn.sendMessage(m.chat, { text: doxeo}, { quoted: m});

  await conn.sendMessage(m.chat, {
    location: {
      degreesLatitude: 40.7128,
      degreesLongitude: -74.0060,
      name: '📍 Posición estimada',
      address: 'Zona urbana - Nodo 4'
}
}, { quoted: m});
};

handler.help = ['doxear'];
handler.tags = ['fun'];
handler.command = ['doxear', 'doxeo', 'doxxeo'];
handler.register = true;
handler.group = true;

export default handler;

/* 𝖢𝗈́𝖽𝗂𝗀𝗈 𝖼𝗋𝖾𝖺𝖽𝗈 𝗉𝗈𝗋 𝖿𝖾𝖽𝖾𝗑𝗒𝗓13 👑
*/

let handler = async (m, { conn, text, usedPrefix, command}) => {
  const emoji = '🌟';
  const alerta = '⚠️';
  const moneda = '𝖬𝗈𝗇𝖾𝖽𝖺𝗌';
  let user = global.db.data.users[m.sender];

  const isOwner = global.owner?.map(v => v + '@s.whatsapp.net').includes(m.sender);
  if (isOwner) {
    user.premium = true;
    user.premiumTime = Infinity;
    return conn.reply(m.chat, `${emoji} *𝖤𝗋𝖾𝗌 𝖾𝗅 𝖲𝗎𝗉𝗋𝖾𝗆𝗈 𝖬𝖺𝗀𝗈 𝖣𝖾𝗅 𝖢𝗈𝗇𝗃𝗎𝗋𝗈*\n🎖️ 𝖳𝗎 𝗆𝖾𝗆𝖻𝗋𝖾𝗌𝗂́𝖺 𝖾𝗌 𝖾𝗍𝖾𝗋𝗇𝖺.`, m);
}

  if (!text) {
    return conn.reply(m.chat, `${alerta} *𝖨𝗇𝖽𝗂𝖼𝖺 𝗅𝖺 𝖽𝗎𝗋𝖺𝖼𝗂𝗈́𝗇 𝖽𝖾 𝗍𝗎 𝗆𝖾𝗆𝖻𝗋𝖾𝗌𝗂́𝖺.*\n\n📜 𝖤𝗃𝖾𝗆𝗉𝗅𝗈:\n${usedPrefix + command} 1 hora`, m);
}

  let [amount, unit] = text.trim().split(' ');
  amount = parseInt(amount);
  unit = unit?.toLowerCase();

  if (isNaN(amount) || amount <= 0) {
    return conn.reply(m.chat, `${alerta} *𝖫𝖺 𝖼𝖺𝗇𝗍𝗂𝖽𝖺𝖽 𝖽𝖾𝖻𝖾 𝗌𝖾𝗋 𝗎𝗇 𝗇𝗎́𝗆𝖾𝗋𝗈 𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝗈.*`, m);
}

  const unidades = {
    minuto: 1,
    minutos: 1,
    hora: 60,
    horas: 60,
    dia: 1440,
    dias: 1440
};

  if (!unit ||!(unit in unidades)) {
    return conn.reply(m.chat, `${alerta} *𝖴𝗇𝗂𝖽𝖺𝖽 𝗇𝗈 𝗏𝖺́𝗅𝗂𝖽𝖺.* 𝖴𝗌𝖺: minutos, horas o días.`, m);
}

  let minutos = amount * unidades[unit];
  if (minutos> 72000) {
    return conn.reply(m.chat, `${alerta} *𝖭𝗈 𝗉𝗎𝖾𝖽𝖾𝗌 𝖼𝗈𝗆𝗉𝗋𝖺𝗋 𝗆𝖺́𝗌 𝖽𝖾 50 𝖽𝗂́𝖺𝗌 𝗉𝗈𝗋 𝗏𝖾𝗓.*`, m);
}

  let costo;
  if (unit.includes('hora') || unit.includes('minuto')) {
    costo = Math.ceil(minutos * (50000 / 60));
} else if (unit.includes('dia')) {
    costo = Math.ceil(minutos / 1440) * 240000;
}

  if ((user.cookies || 0) < costo) {
    return conn.reply(m.chat, `${alerta} *𝖬𝗈𝗇𝖾𝖽𝖺𝗌 𝗂𝗇𝗌𝗎𝖿𝗂𝖼𝗂𝖾𝗇𝗍𝖾𝗌.*\n💰 𝖭𝖾𝖼𝖾𝗌𝗂𝗍𝖺𝗌 *${costo.toLocaleString()}* y tienes *${(user.cookies || 0).toLocaleString()}*.`, m);
}

  user.cookies -= costo;
  user.premium = true;
  user.premiumTime = Date.now() + minutos * 60 * 1000;

  return conn.reply(m.chat, `${emoji} *𝖢𝗈𝗆𝗉𝗋𝖺 𝖾𝗑𝗂𝗍𝗈𝗌𝖺*\n🎖️ 𝖤𝗋𝖾𝗌 𝖯𝗋𝖾𝗆𝗂𝗎𝗆 𝗉𝗈𝗋 *${amount} ${unit}*\n💰 𝖦𝖺𝗌𝗍𝖺𝗌𝗍𝖾 *${costo.toLocaleString()} ${moneda}*\n🧙‍♂️ 𝖫𝖺 𝗆𝖺𝗀𝗂𝖺 𝖽𝖾 𝖲𝗎𝗄𝗂 𝗍𝖾 𝖺𝖼𝗈𝗆𝗉𝖺𝗇𝖺`, m);
};

handler.help = ['comprarpremium <cantidad> <unidad>'];
handler.tags = ['premium'];
handler.command = ['comprarpremium', 'premium', 'comprar'];
handler.register = true;

handler.before = async (m, { isOwner}) => {
  let user = global.db.data.users[m.sender];
  const ownerCheck = global.owner?.map(v => v + '@s.whatsapp.net').includes(m.sender);

  if (ownerCheck) {
    user.premium = true;
    user.premiumTime = Infinity;
    return;
}

  if (user.premium && user.premiumTime && Date.now()> user.premiumTime) {
    user.premium = false;
    user.premiumTime = 0;
    await m.reply('⚠️ 𝖳𝗎 𝗆𝖾𝗆𝖻𝗋𝖾𝗌𝗂́𝖺 𝖯𝗋𝖾𝗆𝗂𝗎𝗆 𝗁𝖺 𝖿𝗂𝗇𝖺𝗅𝗂𝗓𝖺𝖽𝗈. 𝖢𝗈𝗆𝗉𝗋𝖺 𝗈𝗍𝗋𝖺 𝗉𝖺𝗋𝖺 𝗌𝗂𝗀𝗎𝗂𝗋 𝖽𝗂𝗌𝖿𝗋𝗎𝗍𝖺𝗇𝖽𝗈 𝗅𝗈𝗌 𝖻𝖾𝗇𝖾𝖿𝗂𝖼𝗂𝗈𝗌 VIP.');
}
};

export default handler;

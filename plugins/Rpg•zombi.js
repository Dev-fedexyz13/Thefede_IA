let zombiesTotales = 2000
global.zombiesActuales = global.zombiesActuales ?? zombiesTotales
global.zombiesJefesInvocados = global.zombiesJefesInvocados ?? 0
global.zombiesJefesEliminados = global.zombiesJefesEliminados ?? 0

const handler = async (m, { conn, usedPrefix }) => {
  const user = global.db.data.users[m.sender]
  if (!user.personajes || user.personajes.length === 0) {
    return conn.reply(m.chat, `🚫 No tienes personajes comprados.\nUsa *${usedPrefix}listarpersonajes* para ver la lista disponible.`, m)
  }

  let zombies = global.zombiesActuales
  const frasesMuerte = [
    '☠️ fue devorado por una horda imparable...',
    '☠️ gritó mientras era alcanzado por los zombies...',
    '☠️ cayó tras una valiente batalla...',
    '☠️ fue traicionado por su propio valor...',
    '☠️ no pudo esquivar el ataque del jefe...',
    '☠️ fue absorbido por la oscuridad...',
    '☠️ no tuvo escapatoria esta vez...',
    '☠️ fue vencido por el destino...',
    '☠️ luchó hasta el final, pero perdió...',
    '☠️ cayó en la última línea de defensa...',
    '☠️ fue mordido y convertido en zombie...',
    '☠️ dejó un legado... y un grito final...',
    '☠️ fue rodeado y no sobrevivió...',
    '☠️ fue aplastado bajo el peso del caos...',
    '☠️ desapareció entre gritos y sangre...'
  ]

  const frasesPersonajes = [
    '🔥 ¡Jamás retrocederé!',
    '🛡️ ¡Por la justicia!',
    '⚔️ ¡Mi espada es tu fin!',
    '💥 ¡No le temo a la muerte!',
    '🌪️ ¡Sientan mi poder!',
    '💫 ¡Vamos con todo!',
    '☄️ ¡Uno menos!',
    '👊 ¡A por ellos!',
    '🚀 ¡Que ardan!',
    '🎯 ¡Cada golpe cuenta!',
    '🔮 ¡Esto apenas comienza!',
    '🔪 ¡A cortar cabezas!',
    '🌀 ¡Mi habilidad suprema!',
    '🧿 ¡Los borraré del mapa!',
    '💣 ¡BOOM!',
    '🏹 ¡Directo al cráneo!',
    '🔥 ¡Inquebrantables!',
    '⚡ ¡Soy más rápido!',
    '🌈 ¡Brillando hasta el final!',
    '🕶️ ¡Sin miedo!',
    '☠️ ¡Muerte al enemigo!',
    '🥷 ¡Silencioso pero mortal!',
    '🔊 ¡GRITAAN!',
    '👽 ¡No soy de este mundo!',
    '🎮 ¡Nivel desbloqueado!',
    '📿 ¡Protegido por los dioses!',
    '🌋 ¡Erupción letal!',
    '🦾 ¡Cuerpo imparable!',
    '🧠 ¡Estrategia perfecta!',
    '🎩 ¡Con estilo!'
  ]

  const frasesJefe = [
    '🧟‍♂️ *¡He venido a vengar a mis súbditos!*',
    '🧟‍♂️ *¡Nadie saldrá vivo de aquí!*',
    '🧟‍♂️ *¡Soy el terror de los vivos!*',
    '🧟‍♂️ *¡Prepárense para morir!*',
    '🧟‍♂️ *¡Mi ira será su condena!*',
    '🧟‍♂️ *¡Soy la plaga eterna!*',
    '🧟‍♂️ *¡Ustedes serán devorados!*',
    '🧟‍♂️ *¡El fin está cerca!*',
    '🧟‍♂️ *¡Su valentía no servirá de nada!*',
    '🧟‍♂️ *¡Este mundo me pertenece!*'
  ]

  const personajesTop = [
    'Cristo rey 👑', 'Arcangel Supremo 😇', 'The Carlos 🧠',
    'Dios del Tiempo ⏳', 'Dragón Ancestral 🐉', 'Samurai de la Sombra ⚔️',
    'Dios Guerrero 🪖', 'Hechicero Supremo 🧙‍♂️', 'Titán del Infinito 👹', 'Alma del Vacío 👻'
  ]

  let resultado = `🧟‍♂️ *¡La invasión zombie continúa!* 🧟‍♂️\n\n`
  let personajes = user.personajes.slice()
  let personaje = personajes[Math.floor(Math.random() * personajes.length)]
  let esTop = personajesTop.includes(personaje)
  let zombiesMatados = esTop ? randomInt(20, 30) : randomInt(10, 16)
  let probabilidadMuerte = personaje === 'Cristo rey 👑' ? 0 : esTop ? 15 : 50
  let muere = Math.random() * 100 < probabilidadMuerte

  zombies -= zombiesMatados
  if (zombies < 0) zombies = 0
  global.zombiesActuales = zombies

  resultado += `🎖️ *${personaje}* entró en combate...\n🗯️ ${frasesPersonajes[randomIndex(frasesPersonajes)]}\n`
  resultado += `☠️ Eliminó a *${zombiesMatados} zombies*.\n`
  resultado += `🧟 Zombies restantes: *${zombies}*\n\n`

  if (muere) {
    user.personajes = user.personajes.filter(p => p !== personaje)
    resultado += `💀 *${personaje}* ${frasesMuerte[randomIndex(frasesMuerte)]}\n\n`
  } else {
    resultado += `🛡️ *${personaje} sobrevivió esta ronda.*\n\n`
  }

  const umbralParaJefe = 150
  const totalZombiesMatados = zombiesTotales - zombies
  const jefesEsperados = Math.floor(totalZombiesMatados / umbralParaJefe)

  if (global.zombiesJefesInvocados < jefesEsperados) {
    global.zombiesJefesInvocados++

    // sexo
    resultado += `🌀⚠️⚠️⚠️ *¡SE DETIENE EL TIEMPO!* ⚠️⚠️⚠️🌀\n`
    resultado += `🌩️💀 *¡UN ZOMBIE JEFE EMERGE DEL INFIERNO!* 💀🌩️\n`
    resultado += `👹 *¡ZOMBIE JEFE APARECE!* 👹\n💬 ${frasesJefe[randomIndex(frasesJefe)]}\n`
    
    // Eliminación automática del jefe
    global.zombiesJefesEliminados++
    resultado += `✅ *¡Zombie jefe derrotado!* ☠️\n\n`
  }

  if (zombies <= 0 && global.zombiesActuales === 0) {
    global.zombiesJefesEliminados = global.zombiesJefesInvocados
    user.cookies = (user.cookies || 0) + 5000000

    // Animación final 
    resultado += `\n🎬🔥 *¡ESCENA FINAL!* 🔥🎬\n`
    resultado += `💀👑 *¡ZOMBIE FINAL DERROTADO!* 👑💀\n`
    resultado += `🎉 *¡Has derrotado a todos los zombies!* 🎉\n🎁 Recompensa: *5,000,000 monedas*\n`
    resultado += `👑 Jefes eliminados: *${global.zombiesJefesEliminados}*\n`

    global.zombiesActuales = zombiesTotales
    global.zombiesJefesInvocados = 0
    global.zombiesJefesEliminados = 0
  }

  resultado += `🧟‍♂️ Jefes invocados: *${global.zombiesJefesInvocados}*\n`
  resultado += `☠️ Jefes eliminados: *${global.zombiesJefesEliminados}*\n`

  await conn.reply(m.chat, resultado.trim(), m)
}

handler.help = ['invasionzombie']
handler.tags = ['rpg']
handler.command = ['invasionzombie']
handler.register = true

export default handler

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomIndex(array) {
  return Math.floor(Math.random() * array.length)
}
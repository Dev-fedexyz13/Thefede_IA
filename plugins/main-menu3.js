const texto = `
╔══❖•ೋೋ•❖══╗
🧙‍♂️ 𝖬𝖤𝖭𝖴́ 𝖱𝖯𝖦 𝖬𝖠́𝖦𝖨𝖢𝖮
╚══❖•ೋೋ•❖══╝

🎮 *Comandos del Juego:*
• 🪙.minar → Consigue minerales y monedas
• 🎁.daily → Reclama tu recompensa diaria
• ❓.preguntas → Trivia mágica por monedas
• 👊.robar2 @user → Roba a otro mago
• 📦.comprar <nombre> → Adquiere personajes
• 🧾.mispersonajes → Ver tus adquisiciones
• 📜.pjs → Lista de personajes a la venta
• 🧙.banco → Tu grimorio financiero
• 💸.enviar @user <cantidad> → Transfiere monedas
• ⚔️.duelo → Reta a otro jugador
• ☠️.sacrificar → Sacrifica por poder oscuro
• 🤑.cajamisteriosa → Prueba tu suerte
• 👑.toppersonajes → Ranking de coleccionistas
• 🧟‍♂️.invasionzombie → Defensa mágica
• 🏹.cazar → Caza bestias mágicas
• 👑.reinado → Competencia de poder
• ⚡.cambiarexp → Cambia exp por monedas
• 💰.mismonedas → Ver tus monedas
• 🪖.trabajar → Trabaja como burro mágico
• 💀.invocacion → Invoca un personaje

╔══❖•ೋೋ•❖══╗
📈 𝖳𝖴 𝖤𝖲𝖳𝖠𝖣𝖮
╚══❖•ೋೋ•❖══╝

• 🧪 Nivel de Magia: *${user.level || 0}*
• ✨ Experiencia: *${user.exp || 0}*
• 💰 Monedas: *${(user.cookies || 0).toLocaleString()} 🪙*

${tituloEspecial}
🌟 *Sigue tu camino hacia el trono mágico.*
💡 Usa los comandos con sabiduría... ¡el destino te observa!
`.trim()

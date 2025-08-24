#!/data/data/com.termux/files/usr/bin/bash
# Script creado por @gata_dios - Modificado por 𝖿𝖾𝖽𝖾𝗑𝗒𝗓13

# Comandos sugeridos
COMANDOS="pkg install git -y\npkg install nodejs -y\npkg install ffmpeg -y\npkg install imagemagick -y\npkg install yarn -y\ngit clone https://github.com/Dev-fedexyz13/Regna_Bot\ncd Regna_Bot\nyarn install\nnpm install\nnpm start"

# Verificar conexión
ping -c 1 google.com &>/dev/null || {
  echo -e "\033[0;31m🚫 Sin conexión a Internet. Verifica tu red.\033[0m"
  exit 1
}

# Arte inicial
echo -e "\e[35m
░▒▓█ 𝖲𝗎𝗄𝗂-𝖡𝗈𝗍 𝗠𝖣 ▓▒░
⟦ Powered by 𝖿𝖾𝖽𝖾𝗑𝗒𝗓 ⟧
\e[0m"

echo -e "\033[01;93m🔧 Preparando instalación...\033[0m"
echo -e "\033[01;32m📦 Instalando dependencias...\033[0m"

# Función de instalación
instalar_dependencia() {
  local paquete=$1
  local comando_check=$2

  if command -v $comando_check>/dev/null 2>&1; then
    echo -e "\033[01;33m✅ $paquete ya está instalado.\033[0m"
  else
    salida=$(pkg install $paquete -y 2>&1)
    if echo "$salida" | grep -Ei '(command not found|unable to locate|Failed|404|503|Timeout)'; then
      echo -e "\033[0;31m❌ Error al instalar $paquete:\n$salida\033[0m"
      echo -e "\033[0;34m💡 Intenta manualmente:\n$COMANDOS\033[0m"
      exit 1
    else
      echo -e "\033[01;32m✅ $paquete instalado correctamente.\033[0m"
    fi
  fi
}

# Instalar dependencias
instalar_dependencia git git
instalar_dependencia nodejs node
instalar_dependencia ffmpeg ffmpeg
instalar_dependencia imagemagick convert

# Yarn
command -v yarn>/dev/null 2>&1 || {
  echo -e "\033[0;34m📥 Instalando Yarn...\033[0m"
  npm install -g yarn || {
    echo -e "\033[0;31m❌ Error al instalar Yarn.\033[0m"
    echo -e "\033[0;34m💡 Usa:\n$COMANDOS\033[0m"
    exit 1
}
}

# Clonar repositorio
echo -e "\033[1;35m📁 Clonando SukiBot_MD...\033[0m"
git clone https://github.com/Dev-fedexyz13/Regna_Bot.git
cd Regna_Bot || {
  echo -e "\033[0;31m❌ No se pudo acceder al directorio.\033[0m"
  exit 1
}

# Instalar dependencias del proyecto
echo -e "\033[0;34m📦 Instalando dependencias del proyecto...\033[0m"
yarn install && npm install || {
  echo -e "\033[0;31m❌ Error en instalación de dependencias.\033[0m"
  exit 1
}

# Mensaje final
clear
echo -e "\e[36m
┏━━━━━━━━━━━━┓
┃ 𝖲𝗎𝗄𝗂-𝖡𝗈𝗍 𝗠𝖣 v5.2.0 ┃
┗━━━━━━━━━━━━┛

✨ Creador: 𝖿𝖾𝖽𝖾𝗑𝗒𝗓
📡 Canal oficial: https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
📞 Contacto: +5491156178758
🧠 GitHub: https://github.com/Dev-fedexyz13 

💖 ¡Gracias por elegirnos!
\e[0m"

# Iniciar bot
echo -e "\033[01;32m🚀 Iniciando SukiBot_MD...\033[0m"
npm start

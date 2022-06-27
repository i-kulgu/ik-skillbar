name "ik-skillbar"
author "Proportions#8460"
version "1.0.0"
description "Skillbar system"
fx_version "cerulean"
game "gta5"

ui_page 'html/index.html'

files {
  "html/index.html",
  "html/*.js",
  "html/*.css"
}

client_scripts {
  "client/*.lua",
}

export "StartBar"
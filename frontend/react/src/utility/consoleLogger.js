// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

const art = `
%c--------------------------------------------------------------------------------------------
%c::::::       ::::::::  ::::::::::: :::     ::: ::::::::::: :::::::::: :::::::::       ::::::
%c:+:         :+:    :+: :+:     :+: :+:     :+:     :+:     :+:        :+:    :+:         :+:
%c+:+               +:+         +:+  +:+     +:+     +:+     +:+        +:+    +:+         +:+
%c+#+             +#+          +#+   +#+     +:+     +#+     +#++:++#   +#++:++#:          +#+
%c+#+           +#+           +#+     +#+   +#+      +#+     +#+        +#+    +#+         +#+
%c#+#          #+#           #+#       #+#+#+#       #+#     #+#        #+#    #+#         #+#
%c######      ##########     ###         ###     ########### ########## ###    ###      ######
%c--------------------------------------------------------------------------------------------
%c [ https://27vier.com/ ]
`

export function consoleAsciiArt() {

    console.log(
        art,
        'color: #38bdf8; font-family: monospace',
        'color: #38bdf8; font-family: monospace',
        'color: #22d3ee; font-family: monospace',
        'color: #22d3ee; font-family: monospace',
        'color: #2dd4bf; font-family: monospace',
        'color: #2dd4bf; font-family: monospace',
        'color: #34d399; font-family: monospace',
        'color: #34d399; font-family: monospace',
        'color: #4ade80; font-family: monospace',
        'color: #4ade80; font-family: monospace',
    );
    console.log = function () { };
    console.error = function () { };
    console.warn = function () { };
}
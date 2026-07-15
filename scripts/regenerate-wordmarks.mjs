import fs from "fs";
import path from "path";

const dir = path.join("public", "brands");
const W = 180;
const H = 36;

const wordmarks = {
  hilook: "HiLook",
  imou: "IMOU",
  ezviz: "EZVIZ",
  ajax: "Ajax",
  avigilon: "Avigilon",
  zkteco: "ZKTeco",
  yale: "Yale",
  sprywire: "Sprywire",
  yonusa: "Yonusa",
  tplink: "TP-Link",
  ubiquiti: "Ubiquiti",
  cambium: "Cambium",
  belden: "Belden",
  mimosa: "Mimosa",
  yealink: "Yealink",
  fanvil: "Fanvil",
  sonoff: "SONOFF",
  zebra: "Zebra",
  hp: "HP",
  dell: "DELL",
};

function fontSize(label) {
  const len = label.length;
  if (len <= 4) return 30;
  if (len <= 6) return 24;
  if (len <= 9) return 18;
  if (len <= 12) return 14;
  return 12;
}

for (const [file, label] of Object.entries(wordmarks)) {
  const size = fontSize(label);
  const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <text x="90" y="26" text-anchor="middle" font-family="system-ui, Arial, Helvetica, sans-serif" font-size="${size}" font-weight="700" letter-spacing="0.04em" fill="#FFFFFF">${label}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${file}.svg`), svg);
}

console.log(`Wrote ${Object.keys(wordmarks).length} wordmarks at ${W}x${H}`);

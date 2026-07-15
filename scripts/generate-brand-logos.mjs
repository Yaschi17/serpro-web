import fs from "fs";
import path from "path";
import {
  siDell,
  siImou,
  siTplink,
  siUbiquiti,
  siYale,
  siZebratechnologies,
} from "simple-icons";

const dir = path.join("public", "brands");
fs.mkdirSync(dir, { recursive: true });

const W = 180;
const H = 36;

const wikimedia = {
  hikvision: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Hikvision_logo.svg",
  dahua: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Dahua_Technology_logo.svg",
  honeywell: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Honeywell_logo.svg",
  starlink: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Starlink_Logo.svg",
  vertiv: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Vertiv_logo.svg",
  bosch: "https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg",
  epson: "https://upload.wikimedia.org/wikipedia/commons/5/59/Epson_logo.svg",
  hp: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
  dell: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
  lenovo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
  mikrotik: "https://upload.wikimedia.org/wikipedia/commons/3/37/MikroTik_logo.svg",
  avigilon: "https://upload.wikimedia.org/wikipedia/commons/d/da/Avigilon_logo.svg",
  cambium: "https://upload.wikimedia.org/wikipedia/commons/0/01/Cambium_Networks_logo.svg",
};

function writeWordmark(file, label) {
  const len = label.length;
  const size = len <= 5 ? 13 : len <= 8 ? 11 : len <= 12 ? 9 : 8;
  const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}"><text x="90" y="23" text-anchor="middle" font-family="system-ui, Arial, Helvetica, sans-serif" font-size="${size}" font-weight="600" letter-spacing="0.05em" fill="#FFFFFF">${label}</text></svg>`;
  fs.writeFileSync(path.join(dir, `${file}.svg`), svg);
}

function writeIconCanvas(file, icon) {
  const iconSize = 24;
  const maxW = W * 0.95;
  const maxH = H * 0.95;
  const scale = Math.min(maxW / iconSize, maxH / iconSize);
  const tx = (W - iconSize * scale) / 2;
  const ty = (H - iconSize * scale) / 2;
  const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${icon.title}"><g transform="translate(${tx}, ${ty}) scale(${scale})"><path fill="#FFFFFF" d="${icon.path}"/></g></svg>`;
  fs.writeFileSync(path.join(dir, `${file}.svg`), svg);
}

async function download(file, url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "SerProTechnology/1.0 (local site generator)" },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const text = await res.text();
  fs.writeFileSync(path.join(dir, `${file}.svg`), text);
}

async function main() {
  for (const [file, url] of Object.entries(wikimedia)) {
    try {
      await download(file, url);
      console.log(`OK ${file}`);
    } catch (err) {
      console.warn(`FAIL ${file}:`, err.message);
    }
    await new Promise((r) => setTimeout(r, 1500));
  }

  writeIconCanvas("tplink", siTplink);
  writeIconCanvas("ubiquiti", siUbiquiti);
  writeIconCanvas("imou", siImou);
  writeIconCanvas("yale", siYale);

  writeWordmark("hilook", "HiLook");
  writeWordmark("ezviz", "EZVIZ");
  writeWordmark("ajax", "Ajax");
  writeWordmark("zkteco", "ZKTeco");
  writeWordmark("sprywire", "Sprywire");
  writeWordmark("yonusa", "Yonusa");
  writeWordmark("belden", "Belden");
  writeWordmark("mimosa", "Mimosa");
  writeWordmark("yealink", "Yealink");
  writeWordmark("fanvil", "Fanvil");
  writeWordmark("sonoff", "SONOFF");

  console.log(`Done — ${fs.readdirSync(dir).length} files in ${dir}`);
}

main();

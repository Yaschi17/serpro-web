import fs from "fs";
import path from "path";

const dir = path.join("public", "brands");
const W = 180;
const H = 36;
const PAD = 6;
const INNER_W = W - PAD * 2;
const INNER_H = H - PAD * 2;

const sources = {
  hikvision: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Hikvision_logo.svg",
  dahua: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Dahua_Technology_logo.svg",
  mikrotik: "https://upload.wikimedia.org/wikipedia/commons/3/37/MikroTik_logo.svg",
  honeywell: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Honeywell_logo.svg",
  bosch: "https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg",
  vertiv: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Vertiv_logo.svg",
  epson: "https://upload.wikimedia.org/wikipedia/commons/5/59/Epson_logo.svg",
  lenovo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
};

function clean(raw) {
  return raw
    .replace(/<\?xml[^>]*\?>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
}

function viewBoxFromTag(tag) {
  const m = tag.match(/viewBox=["']([^"']+)["']/i);
  if (m) return m[1];
  const w = tag.match(/\bwidth=["']([\d.]+)/i)?.[1];
  const h = tag.match(/\bheight=["']([\d.]+)/i)?.[1];
  return w && h ? `0 0 ${w} ${h}` : "0 0 100 100";
}

function sanitize(inner) {
  return inner
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<sodipodi:[^>]*\/>/gi, "")
    .replace(/<sodipodi:[\s\S]*?<\/sodipodi:\w+>/gi, "")
    .replace(/<inkscape:[^>]*\/>/gi, "")
    .replace(/<inkscape:[\s\S]*?<\/inkscape:\w+>/gi, "")
    .replace(/\s(inkscape|sodipodi):[^\s=]+="[^"]*"/gi, "")
    .replace(/\sserif:[^\s=]+="[^"]*"/gi, "");
}

function whiteify(inner) {
  return sanitize(inner)
    .replace(/fill:\s*rgb\([^)]+\)/gi, "fill:#FFFFFF")
    .replace(/fill:\s*#[0-9a-fA-F]{3,8}/gi, "fill:#FFFFFF")
    .replace(/\sfill="(?!none)[^"]*"/gi, ' fill="#FFFFFF"')
    .replace(/\sstroke="(?!none)[^"]*"/gi, ' stroke="#FFFFFF"');
}

function wrap(viewBox, inner) {
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
  <svg x="${PAD}" y="${PAD}" width="${INNER_W}" height="${INNER_H}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">
    ${whiteify(inner)}
  </svg>
</svg>`;
}

async function build(file, url, attempt = 1) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (res.status === 429 && attempt < 5) {
    await new Promise((r) => setTimeout(r, 4000 * attempt));
    return build(file, url, attempt + 1);
  }
  if (!res.ok) throw new Error(`${file}: ${res.status}`);
  const raw = clean(await res.text());
  const open = raw.match(/^<svg[^>]*>/i);
  if (!open) throw new Error(`${file}: no svg`);
  const viewBox = viewBoxFromTag(open[0]);
  const inner = raw.replace(/^<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "").trim();
  if (!inner.includes("<path") && !inner.includes("<polygon") && !inner.includes("<g")) {
    throw new Error(`${file}: empty inner`);
  }
  fs.writeFileSync(path.join(dir, `${file}.svg`), wrap(viewBox, inner));
  console.log(`OK ${file} (${inner.length} bytes)`);
}

async function main() {
  const only = process.argv.slice(2);
  const entries = Object.entries(sources).filter(([f]) => !only.length || only.includes(f));
  for (const [file, url] of entries) {
    await build(file, url);
    await new Promise((r) => setTimeout(r, 2500));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

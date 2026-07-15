import fs from "fs";
import path from "path";

const dir = path.join("public", "brands");
const W = 180;
const H = 36;
const PAD_X = 8;
const PAD_Y = 4;
const INNER_W = W - PAD_X * 2;
const INNER_H = H - PAD_Y * 2;

const vectorLogos = [
  "hikvision",
  "dahua",
  "mikrotik",
  "honeywell",
  "bosch",
  "vertiv",
  "epson",
  "lenovo",
];

function cleanSvg(raw) {
  return raw
    .replace(/<\?xml[^>]*\?>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
}

function extractViewBox(svgTag) {
  const match = svgTag.match(/viewBox=["']([^"']+)["']/i);
  if (match) return match[1];
  const width = svgTag.match(/\bwidth=["']([\d.]+)/i)?.[1];
  const height = svgTag.match(/\bheight=["']([\d.]+)/i)?.[1];
  if (width && height) return `0 0 ${width} ${height}`;
  return null;
}

function stripOuterSvg(content) {
  const open = content.match(/^<svg[^>]*>/i);
  if (!open) return { viewBox: null, inner: content };
  return {
    viewBox: extractViewBox(open[0]),
    inner: content.replace(/^<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "").trim(),
  };
}

function fixFills(inner) {
  return inner
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<sodipodi:[^>]*\/>/gi, "")
    .replace(/<sodipodi:[^>]*>[\s\S]*?<\/sodipodi:[^>]*>/gi, "")
    .replace(/<inkscape:[^>]*\/>/gi, "")
    .replace(/<inkscape:[^>]*>[\s\S]*?<\/inkscape:[^>]*>/gi, "")
    .replace(/<\/?(rdf|cc|dc|serif):[^>]*>/gi, "")
    .replace(/\s(inkscape|sodipodi|serif):[a-zA-Z0-9-]+="[^"]*"/gi, "")
    .replace(/fill:\s*#[0-9a-fA-F]{3,8}/gi, "fill:#FFFFFF")
    .replace(/\sfill="(?!none)[^"]*"/gi, ' fill="#FFFFFF"')
    .replace(/\sstroke="(?!none)[^"]*"/gi, ' stroke="#FFFFFF"');
}

async function download(file, url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "SerProTechnology/1.0" },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return cleanSvg(await res.text());
}

const wikimedia = {
  hikvision: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Hikvision_logo.svg",
  dahua: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Dahua_Technology_logo.svg",
  honeywell: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Honeywell_logo.svg",
  vertiv: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Vertiv_logo.svg",
  bosch: "https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg",
  epson: "https://upload.wikimedia.org/wikipedia/commons/5/59/Epson_logo.svg",
  lenovo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
  mikrotik: "https://upload.wikimedia.org/wikipedia/commons/3/37/MikroTik_logo.svg",
};

function wrapVector(inner, viewBox) {
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
  <svg x="${PAD_X}" y="${PAD_Y}" width="${INNER_W}" height="${INNER_H}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">
    ${fixFills(inner)}
  </svg>
</svg>`;
}

function unwrapToSource(raw) {
  let current = cleanSvg(raw);
  for (let i = 0; i < 5; i++) {
    const { viewBox, inner } = stripOuterSvg(current);
    const nested = inner.match(/^<svg\s+[\s\S]*?viewBox="([^"]+)"[\s\S]*>([\s\S]*)<\/svg>\s*$/i);
    if (nested) {
      return { viewBox: nested[1], inner: nested[2] };
    }
    if (viewBox && !/^<svg/i.test(inner.trim())) {
      return { viewBox, inner };
    }
    if (inner.trim().startsWith("<svg")) {
      current = inner.trim();
      continue;
    }
    return { viewBox, inner };
  }
  const { viewBox, inner } = stripOuterSvg(current);
  return { viewBox, inner };
}

async function rebuildVector(file) {
  let raw;
  try {
    raw = await download(file, wikimedia[file]);
  } catch {
    raw = fs.readFileSync(path.join(dir, `${file}.svg`), "utf8");
  }

  const { viewBox, inner } = unwrapToSource(raw);
  if (!viewBox) throw new Error(`No viewBox for ${file}`);

  fs.writeFileSync(path.join(dir, `${file}.svg`), wrapVector(inner, viewBox));
}

async function main() {
  for (const file of vectorLogos) {
    await rebuildVector(file);
    console.log(`OK ${file}`);
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log("Done");
}

main();

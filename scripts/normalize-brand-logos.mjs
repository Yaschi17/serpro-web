import fs from "fs";
import path from "path";

const dir = path.join("public", "brands");
const W = 180;
const H = 36;
const ICON_COVERAGE = 0.78;
const LOGO_COVERAGE = 0.84;

const MAIN_LOGOS = [
  "hikvision",
  "dahua",
  "mikrotik",
  "honeywell",
  "bosch",
  "vertiv",
  "epson",
  "hp",
  "dell",
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
  return "0 0 24 24";
}

function stripOuterSvg(content) {
  const open = content.match(/^<svg[^>]*>/i);
  if (!open) return { viewBox: "0 0 24 24", inner: content };

  return {
    viewBox: extractViewBox(open[0]),
    inner: content.replace(/^<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "").trim(),
  };
}

function stripNamespaces(inner) {
  return inner
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<sodipodi:[^>]*\/>/gi, "")
    .replace(/<sodipodi:[^>]*>[\s\S]*?<\/sodipodi:[^>]*>/gi, "")
    .replace(/<inkscape:[^>]*\/>/gi, "")
    .replace(/<inkscape:[^>]*>[\s\S]*?<\/inkscape:[^>]*>/gi, "")
    .replace(/<\/?(rdf|cc|dc|serif):[^>]*>/gi, "")
    .replace(/\s(inkscape|sodipodi|serif):[a-zA-Z0-9-]+="[^"]*"/gi, "")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sid="[^"]*"/gi, "");
}

function fixFills(inner) {
  return stripNamespaces(inner)
    .replace(/fill:\s*#[0-9a-fA-F]{3,8}/gi, "fill:#FFFFFF")
    .replace(/fill:\s*rgb\([^)]+\)/gi, "fill:#FFFFFF")
    .replace(/stroke:\s*#[0-9a-fA-F]{3,8}/gi, "stroke:#FFFFFF")
    .replace(/\sfill="(?!none)[^"]*"/gi, ' fill="#FFFFFF"')
    .replace(/\sstroke="(?!none)[^"]*"/gi, ' stroke="#FFFFFF"');
}

function parseViewBox(viewBox) {
  const [x = 0, y = 0, w = 24, h = 24] = viewBox.split(/[\s,]+/).map(Number);
  return { x, y, w, h };
}

function writeIcon(pathD) {
  const iconSize = 24;
  const maxW = W * ICON_COVERAGE;
  const maxH = H * ICON_COVERAGE;
  const scale = Math.min(maxW / iconSize, maxH / iconSize);
  const tx = (W - iconSize * scale) / 2;
  const ty = (H - iconSize * scale) / 2;

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
  <g transform="translate(${tx}, ${ty}) scale(${scale})">
    <path fill="#FFFFFF" d="${pathD}"/>
  </g>
</svg>`;
}

function writeWrapped(viewBox, inner, coverage) {
  const vb = parseViewBox(viewBox);
  const boxW = W * coverage;
  const boxH = H * coverage;
  const boxX = (W - boxW) / 2;
  const boxY = (H - boxH) / 2;
  const scale = Math.min(boxW / vb.w, boxH / vb.h);
  const scaledW = vb.w * scale;
  const scaledH = vb.h * scale;
  const tx = boxX + (boxW - scaledW) / 2 - vb.x * scale;
  const ty = boxY + (boxH - scaledH) / 2 - vb.y * scale;

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
  <g transform="translate(${tx}, ${ty}) scale(${scale})">
    ${fixFills(inner)}
  </g>
</svg>`;
}

function unwrapNestedSvg(inner) {
  const match = inner.match(/^<svg\s+([\s\S]*?)>([\s\S]*)<\/svg>\s*$/i);
  if (!match) return null;

  const attrs = match[1];
  const nestedInner = match[2];
  const x = Number(attrs.match(/\bx="([^"]+)"/i)?.[1] ?? 0);
  const y = Number(attrs.match(/\by="([^"]+)"/i)?.[1] ?? 0);
  const width = Number(attrs.match(/\bwidth="([^"]+)"/i)?.[1] ?? 0);
  const height = Number(attrs.match(/\bheight="([^"]+)"/i)?.[1] ?? 0);
  const nestedViewBox = attrs.match(/viewBox="([^"]+)"/i)?.[1] ?? "0 0 24 24";
  const innerVb = parseViewBox(nestedViewBox);
  const sx = width / innerVb.w;
  const sy = height / innerVb.h;
  const s = Math.min(sx, sy);
  const scaledW = innerVb.w * s;
  const scaledH = innerVb.h * s;
  const ntx = x + (width - scaledW) / 2 - innerVb.x * s;
  const nty = y + (height - scaledH) / 2 - innerVb.y * s;

  return {
    kind: "flat",
    inner: `<g transform="translate(${ntx}, ${nty}) scale(${s})">${fixFills(nestedInner)}</g>`,
  };
}

function parseSvg(raw) {
  let current = cleanSvg(raw);

  for (let depth = 0; depth < 6; depth++) {
    const { viewBox, inner } = stripOuterSvg(current);

    if (viewBox === `0 0 ${W} ${H}` && /<g\s+transform=/i.test(inner) && !/^<svg/i.test(inner.trim())) {
      return { kind: "flat", inner: fixFills(inner) };
    }

    const unwrapped = unwrapNestedSvg(inner.trim());
    if (unwrapped) return unwrapped;

    const iconMatch = inner.match(
      /<g\s+transform="translate\([^)]+\)\s+scale\([^)]+\)">\s*<path[^>]*\sd="([^"]+)"[^>]*\/?>\s*<\/g>/i,
    );
    if (iconMatch) return { kind: "icon", path: iconMatch[1] };

    const textMatch = inner.match(/<text[^>]*>([^<]+)<\/text>/i);
    if (textMatch && !/<path/i.test(inner)) {
      return { kind: "wordmark", label: textMatch[1].trim() };
    }

    const nestedStart = inner.trim();
    if (nestedStart.startsWith("<svg") && (nestedStart.match(/<svg/gi) || []).length === 1) {
      current = nestedStart;
      continue;
    }

    return { kind: "logo", viewBox, inner: fixFills(inner) };
  }

  const { viewBox, inner } = stripOuterSvg(current);
  return { kind: "logo", viewBox, inner: fixFills(inner) };
}

function normalizeFile(file) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const parsed = parseSvg(raw);

  let output;
  if (parsed.kind === "wordmark") return;
  if (parsed.kind === "icon") {
    output = writeIcon(parsed.path);
  } else if (parsed.kind === "flat") {
    output = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">\n  ${parsed.inner}\n</svg>`;
  } else {
    output = writeWrapped(parsed.viewBox, parsed.inner, LOGO_COVERAGE);
  }

  fs.writeFileSync(path.join(dir, file), output);
}

for (const file of MAIN_LOGOS.map((s) => `${s}.svg`)) {
  if (fs.existsSync(path.join(dir, file))) normalizeFile(file);
}

console.log(`Flattened ${MAIN_LOGOS.length} main logos to ${W}x${H}`);

import { parse } from 'css';

export function parseGlobalCSS(source) {
  const ast = parse(source);
  return fromAST(ast);
}

function fromAST(ast) {
  const colors = [];
  for (const rule of ast.stylesheet?.rules ?? []) {
    if (!('selectors' in rule)) {
      continue;
    }

    if (!rule.selectors?.find((s) => s.endsWith(':root'))) {
      continue;
    }

    for (const decl of rule?.declarations ?? []) {
      const color = fromDecl(decl);
      if (color) {
        colors.push(color);
      }
    }
  }

  return colors.sort((a, b) => a.id.localeCompare(b.id));
}

function fromDecl({ property, value }) {
  if (property === undefined || value === undefined) {
    return null;
  }

  switch (true) {
    case /^\d{1,3}, \d{1,3}, \d{1,3}$/.test(value): {
      const [r, g, b] = value.split(', ').map(Number);
      return {
        id: property,
        hex: rgb2hex(r, g, b),
        rgb: [r, g, b],
      };
    }

    case /^#([0-9a-f]{3}){1,2}$/i.test(value): {
      const [r, g, b] = hex2rgb(value);
      return {
        id: property,
        hex: value,
        rgb: [r, g, b],
      };
    }

    default: {
      return null;
    }
  }
}

function hex2rgb(hex) {
  hex = hex.trim().replace(/^#/, '');
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function rgb2hex(r, g, b) {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;
}

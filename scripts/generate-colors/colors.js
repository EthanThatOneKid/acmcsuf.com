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
      return {
        id: property,
        value: value,
        color: `rgb(${value})`,
      };
    }

    case /^#[0-9a-fA-F]{3,6}$/.test(value):
    case value.startsWith('rgb') && value.endsWith(')'):
    case value.startsWith('hsl') && value.endsWith(')'):
    case value.startsWith('linear-gradient') && value.endsWith(')'): {
      return {
        id: property,
        value: value,
      };
    }

    case value.startsWith('var') && value.endsWith(')'): {
      const aliasOf = value.slice(4, -1).trim();
      if (value.endsWith('-rgb)')) {
        const color = value.replace(/-rgb\)$/, ')');
        return {
          id: property,
          value: value,
          color: color,
          aliasOf: aliasOf,
        };
      }

      return {
        id: property,
        value: value,
        aliasOf: aliasOf,
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

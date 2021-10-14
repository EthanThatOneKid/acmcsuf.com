export const styleProps = (node, props) => {
  node.style = Object.entries(props)
    .map(([propName, propValue]) => `--${propName}: ${propValue};`)
    .join(" ");
};

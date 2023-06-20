import React from 'react';
import { ReactSVG, Props } from 'react-svg';

/**
 * 自定义svg组件，传入name自动加载@/assets/svg/对应name的svg图表
 */
interface SvgFiles {
  [name: string]: any;
}
type Size =
  | {
      width?: number;
      height?: number;
    }
  | number;

interface MySVGProps extends Omit<Props, 'src'> {
  name?: string;
  size?: Size;
  color?: string;
}

const importAll = (requireContext: any) =>
  requireContext.keys().reduce((acc: SvgFiles, curr: string) => {
    const key = curr.replace('./', '').replace('.svg', '');
    acc[key] = requireContext(curr);
    return acc;
  }, {});

const svgFiles = importAll(require.context('../../assets/svg', false, /\.svg$/));
const defaultSvg = svgFiles['default'];

const MySVG: React.FC<MySVGProps> = ({ name = 'default', size = 24, color }) => {
  const { width = size, height = size } =
    typeof size === 'number' ? { width: size, height: size } : size;
  const Svg = svgFiles[name] || defaultSvg;

  return (
    <ReactSVG
      src={Svg}
      beforeInjection={(svg) => {
        // svg.classList.add('svg-class-name');
        svg.setAttribute('style', `width: ${width}px; height:${height}px`);
        const pathNode = svg.querySelectorAll('[fill]');
        if (color) {
          pathNode.forEach((node) => {
            node.setAttribute('fill', color);
          });
        }
      }}
    />
  );
};

export default MySVG;

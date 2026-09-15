import { h } from 'preact'

type Icon = {
  height?: number
  width?: number
  color?: string
  ariaLabel?: string
  ariaHidden?: boolean
}

type IconProps = Icon & {
  svgPath: string
  role?: string
}

const iconDefaults: Icon = {
  height: 24,
  width: 24,
  ariaHidden: false,
}

export default function IconWrapper({
  height = iconDefaults.height,
  width = iconDefaults.width,
  ariaHidden = iconDefaults.ariaHidden,
  ariaLabel,
  color,
  svgPath,
  role,
}: IconProps) {
  return h(
    'svg',
    {
      width,
      height,
      fill: 'none',
      role,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden,
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'xMidYMid meet',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    h('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: svgPath,
      fill: color,
    })
  )
}

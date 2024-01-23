import { component$ } from '@builder.io/qwik'

import type { Icon } from '~/common/infrastructure/models/icon'
import IconWrapper from '../icon-wrapper/icon-wrapper'

type GithubIconProps = Icon

export default component$(
  ({ height, width, ariaHidden, ariaLabel, color }: GithubIconProps) => {
    const path =
      'M12.026 2a9.975 9.975 0 00-3.153 19.439c.5.09.679-.217.679-.481 0-.237-.008-.865-.011-1.7-2.775.6-3.361-1.338-3.361-1.338a2.635 2.635 0 00-1.107-1.459c-.9-.619.069-.605.069-.605.64.088 1.205.467 1.527 1.028a2.124 2.124 0 002.9.829c.046-.506.272-.979.635-1.334-2.214-.251-4.542-1.107-4.542-4.93a3.865 3.865 0 011.026-2.671 3.588 3.588 0 01.1-2.64s.837-.269 2.742 1.021a9.439 9.439 0 014.992 0c1.906-1.291 2.742-1.021 2.742-1.021.37.835.405 1.78.1 2.64a3.84 3.84 0 011.024 2.675c0 3.833-2.33 4.675-4.552 4.922.48.49.725 1.162.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479A9.975 9.975 0 0012.026 2z'

    return (
      <IconWrapper
        height={height}
        width={width}
        ariaHidden={ariaHidden}
        ariaLabel={ariaLabel}
        color={color}
        svgPath={path}
      />
    )
  }
)

import { component$ } from '@builder.io/qwik'

import type { Icon } from '~/common/infrastructure/models/icon'
import IconWrapper from '../icon-wrapper/icon-wrapper'

type SunIconProps = Icon

export default component$(
  ({ height, width, ariaHidden, ariaLabel, color }: SunIconProps) => {
    const path =
      'M12.998 22H10.998V19H12.998V22ZM18.362 19.778L16.241 17.657L17.655 16.243L19.777 18.365L18.364 19.778H18.362ZM5.63405 19.778L4.21905 18.364L6.33905 16.242L7.75405 17.656L5.63405 19.777V19.778ZM11.998 17.007C9.23302 17.0059 6.99231 14.7637 6.99305 11.9987C6.99378 9.23364 9.23568 6.99263 12.0007 6.993C14.7657 6.99337 17.007 9.23497 17.007 12C17.0043 14.7649 14.763 17.0053 11.998 17.007ZM11.998 8.993C10.3376 8.9941 8.99231 10.3409 8.99305 12.0013C8.99378 13.6618 10.3403 15.0074 12.0007 15.007C13.6612 15.0066 15.007 13.6605 15.007 12C15.0054 10.3392 13.6589 8.99355 11.998 8.993ZM21.998 13H18.998V11H21.998V13ZM4.99805 13H1.99805V11H4.99805V13ZM17.654 7.758L16.241 6.343L18.362 4.221L19.777 5.636L17.655 7.757L17.654 7.758ZM6.34105 7.758L4.22105 5.637L5.63605 4.223L7.75605 6.345L6.34205 7.757L6.34105 7.758ZM12.998 5H10.998V2H12.998V5Z'

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

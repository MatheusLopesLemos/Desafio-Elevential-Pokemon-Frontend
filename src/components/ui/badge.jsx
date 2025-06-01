import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';

const Badge = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className,
      )}
      {...props}
    />
  );
});
Badge.displayName = 'Badge';

Badge.propTypes = {
  className: PropTypes.string,
};

export { Badge };

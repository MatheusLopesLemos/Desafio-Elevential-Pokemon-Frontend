import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'w-full pl-3 pr-10 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-red-500 bg-white shadow-sm appearance-none',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = 'Select';

Select.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <option
        ref={ref}
        className={cn('text-gray-800 p-2', className)}
        {...props}
      >
        {children}
      </option>
    );
  },
);
SelectItem.displayName = 'SelectItem';

SelectItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Select, SelectItem };

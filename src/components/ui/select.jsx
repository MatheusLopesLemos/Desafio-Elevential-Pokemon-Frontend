import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';

const Select = React.forwardRef(
  ({ className, children, value, onValueChange, ...props }, ref) => {
    const handleChange = (event) => {
      if (onValueChange) {
        onValueChange(event.target.value);
      }
    };

    return (
      <select
        ref={ref}
        className={cn(
          'w-full pl-3 pr-10 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-red-500 bg-white shadow-sm appearance-none cursor-pointer',
          className,
        )}
        value={value}
        onChange={handleChange}
        {...props}
      >
        {children}
      </select>
    );
  },
);
Select.displayName = 'Select';

Select.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
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

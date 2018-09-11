import { Typography } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import * as React from 'react';
import { Unit } from '../../stores';

export interface UnitToggleButtonProps {
  value: Unit;
  onChange(value: Unit): void;
}

export const UnitToggleButton = (props: UnitToggleButtonProps) => {
  const { value, onChange } = props;
  const _onChange = (_event, value) => {
    onChange(value);
  };

  return (
    <div>
      <ToggleButtonGroup value={value} exclusive onChange={_onChange}>
        <ToggleButton value={Unit.Kg}>
          <Typography variant="caption" color={value === Unit.Kg ? 'primary' : 'textSecondary'}>
            Kg
          </Typography>
        </ToggleButton>
        <ToggleButton value={Unit.Lb}>
          <Typography variant="caption" color={value === Unit.Lb ? 'primary' : 'textSecondary'}>
            Lb
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

import InputAdornment from '@material-ui/core/InputAdornment';
import { observer } from 'mobx-react';
import * as React from 'react';
import { WeightStore } from '../../stores';

interface InputUnitAdornmentProps {
  store: WeightStore;
}

export const InputUnitAdornment = observer((props: InputUnitAdornmentProps) => {
  const { isUsingMetric } = props.store;
  return <InputAdornment position="end">{isUsingMetric ? 'Kg' : 'Lb'}</InputAdornment>;
});

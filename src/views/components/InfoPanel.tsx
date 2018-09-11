import { observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../stores';
import { InfoSnackbar } from './InfoSnackbar';
import { Typography } from '@material-ui/core';

export interface InfoPanelProps {
  store: AppStore;
  keyName: string;
  onClose(): void;
}

export const InfoPanel = observer((props: InfoPanelProps) => {
  const { store, keyName, onClose } = props;
  const shouldOpen = store[keyName];
  if (!shouldOpen) {
    return null;
  }
  return (
    <InfoSnackbar onClose={onClose}>
      <Typography variant="body1" color="inherit">
      <ul>
        <li>Enter the weight, this calculator will show the plates you need.</li>
        <li>You can mix two scales together by switching on "Allow mix" in SETTINGS.</li>
        <li>You can convert between Kg and Lb in SETTINGS.</li>
        <li>Go to SETTINGS to select available plates and barbell weight.</li>
      </ul>
      </Typography>
    </InfoSnackbar>
  );
});

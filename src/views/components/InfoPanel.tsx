import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../stores';
import { InfoSnackbar } from './InfoSnackbar';

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
      <ul>
        <li>
          <Typography variant="body1" color="inherit">
            Enter the weight, this calculator will show the plates you need.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" color="inherit">
            You can mix two scales together by switching on "Allow mix" in SETTINGS.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" color="inherit">
            You can convert between Kg and Lb in SETTINGS.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" color="inherit">
            The -/+ icons help you adjust weight based on percentage
          </Typography>
        </li>
        <li>
          <Typography variant="body1" color="inherit">
            Go to SETTINGS to select available plates and barbell weight.
          </Typography>
        </li>
      </ul>
    </InfoSnackbar>
  );
});

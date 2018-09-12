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
        <li>Never underestimate the power of improving 1% every workout!</li>
        <li>Enter the weight, this calculator will show the plates you need.</li>
        <li>The -/+ icons help you adjust weight based on percentage</li>
        <li>You can mix two scales together by switching on "Allow mix" in SETTINGS.</li>
        <li>You can convert between Kg and Lb in SETTINGS.</li>
        <li>Go to SETTINGS to select available plates and barbell weight.</li>
      </ul>
    </InfoSnackbar>
  );
});

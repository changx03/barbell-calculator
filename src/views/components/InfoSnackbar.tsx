import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { styles } from '../../styles';

export interface InfoSnackbarProps extends WithStyles<typeof styles> {
  onClose(): void;
  children?: React.ReactNode;
}

function InfoSnackbarInner(props: InfoSnackbarProps) {
  const { info, icon, message: msgClass, closeIconButton } = props.classes;
  const { onClose, children } = props;
  return (
    <SnackbarContent
      className={info}
      aria-describedby="client-snackbar"
      message={<span className={msgClass}>{children}</span>}
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose} className={closeIconButton}>
          <CloseIcon className={icon} />
        </IconButton>,
      ]}
    />
  );
}

export const InfoSnackbar = withStyles(styles)(InfoSnackbarInner);

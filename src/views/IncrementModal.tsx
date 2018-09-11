import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Stores } from '../App';
import { AppStore, WeightStore } from '../stores';
import { styles } from '../styles';
import { ButtonRow, NumberInputField } from './components';

interface IncrementModalProps extends WithStyles<typeof styles> {
  appStore?: AppStore;
  weightStore?: WeightStore;
}

@inject((stores: Stores) => ({
  appStore: stores.appStore,
  weightStore: stores.store,
}))
@observer
class IncrementModalInner extends React.Component<IncrementModalProps, {}> {
  render() {
    const { classes } = this.props;
    const { isIncrementModalOpen } = this.props.appStore as AppStore;
    return (
      <Modal open={isIncrementModalOpen} onClose={this._onClose}>
        <div className={classes.modal}>
          <Typography variant="title" className={classes.modalTitle}>
            Change increment percentage
          </Typography>
          <NumberInputField
            label="Percentage"
            store={this.props.weightStore as WeightStore}
            editKey="increment"
            onChanged={this._onInputChanged}
            type="number"
            margin="normal"
          />
          <ButtonRow>
            <Button onClick={this._onClose} variant="raised" color="primary">
              Save
            </Button>
          </ButtonRow>
        </div>
      </Modal>
    );
  }

  private _onClose = () => {
    const { setIncrementModal } = this.props.appStore as AppStore;
    setIncrementModal(false);
  };

  private _onInputChanged = value => {
    const { setIncrement } = this.props.weightStore as WeightStore;
    setIncrement(value);
  };
}

export const IncrementModal = withStyles(styles)(IncrementModalInner);

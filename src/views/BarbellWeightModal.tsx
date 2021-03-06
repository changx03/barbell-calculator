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

interface BarbellWeightModalProps extends WithStyles<typeof styles> {
  appStore?: AppStore;
  weightStore?: WeightStore;
}

@inject((stores: Stores) => ({
  appStore: stores.appStore,
  weightStore: stores.store,
}))
@observer
class BarbellWeightModalInner extends React.Component<BarbellWeightModalProps, {}> {
  render() {
    const { classes } = this.props;
    const { isBarbellWeightModalOpen } = this.props.appStore as AppStore;
    return (
      <Modal open={isBarbellWeightModalOpen} onClose={this._onClose}>
        <div className={classes.modal}>
          <Typography variant="title" className={classes.modalTitle}>
            Change barbell weight
          </Typography>
          <NumberInputField
            label="Barbell weight"
            store={this.props.weightStore as WeightStore}
            editKey="barbellWeight"
            onChanged={this._onBarbellInputChange}
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
    const { setBarbellWeightModal } = this.props.appStore as AppStore;
    setBarbellWeightModal(false);
  };

  private _onBarbellInputChange = value => {
    const { setBarbellWeight } = this.props.weightStore as WeightStore;
    setBarbellWeight(value);
  };
}

export const BarbellWeightModal = withStyles(styles)(BarbellWeightModalInner);

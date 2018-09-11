import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import Language from '@material-ui/icons/Language';
import Repeat from '@material-ui/icons/Repeat';
import TrendingUp from '@material-ui/icons/TrendingUp';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Stores } from '../../App';
import { AppStore, WeightStore } from '../../stores';
import { UnitToggleButton } from './UnitToggleButton';

@inject((stores: Stores) => ({
  store: stores.store,
  appStore: stores.appStore,
}))
@observer
export class WeightSetupGeneral extends React.Component<
  {
    store?: WeightStore;
    appStore?: AppStore;
  },
  {}
> {
  render() {
    const { allowMix, toggleAllowMix, toggleUnitSystem, barbellWeight, displayUnit, increment } = this.props
      .store as WeightStore;
    const { setBarbellWeightModal, setIncrementModal } = this.props.appStore as AppStore;

    return (
      <Paper elevation={0}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary="Unit" secondary="Toggle the base unit" />
            <ListItemSecondaryAction>
              <UnitToggleButton value={displayUnit} onChange={() => toggleUnitSystem()} />
              {/* <Switch onChange={() => toggleUnitSystem()} checked={isUsingMetric} color="primary" /> */}
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Repeat />
            </ListItemIcon>
            <ListItemText primary="Allow mix" secondary="Allow Kg and Lb mix together" />
            <ListItemSecondaryAction>
              <Switch onChange={() => toggleAllowMix()} checked={allowMix} color="primary" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setBarbellWeightModal(true);
            }}
          >
            <ListItemIcon>
              <FitnessCenter />
            </ListItemIcon>
            <ListItemText primary="Barbell weight" secondary="Barbell is measured in Kg" />
            <Typography variant="subheading">{barbellWeight}</Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setIncrementModal(true);
            }}
          >
            <ListItemIcon>
              <TrendingUp />
            </ListItemIcon>
            <ListItemText primary="Increment (%)" secondary="Change percentage of weight when click -/+ icons" />
            <Typography variant="subheading">{increment}</Typography>
          </ListItem>
        </List>
      </Paper>
    );
  }
}

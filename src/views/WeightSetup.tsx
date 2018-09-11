import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { inject } from 'mobx-react';
import * as React from 'react';
import { Unit, WeightStore } from '../stores/weight';
import { styles } from '../styles';
import { BarbellWeightModal } from './BarbellWeightModal';
import { ButtonRow, WeightPlateSelectList, WeightSetupGeneral } from './components';

interface WeightSetupPageProps extends WithStyles<typeof styles> {
  store?: WeightStore;
}

@inject('store')
class WeightSetupPageInner extends React.Component<WeightSetupPageProps, {}> {
  render() {
    const { classes } = this.props;
    const store = this.props.store as WeightStore;
    return (
      <>
        <Card className={classes.root}>
          <CardContent>
            <WeightSetupGeneral />
            <Divider />
            <WeightPlateSelectList title="Available KG plates" unit={Unit.Kg} icon={<AddCircle />} />
            <Divider />
            <WeightPlateSelectList title="Available LB plates" unit={Unit.Lb} icon={<AddCircleOutline />} />
            <ButtonRow>
              <Button onClick={() => store.saveSetupToStorage()} variant="raised" color="primary">
                Save
              </Button>
            </ButtonRow>
          </CardContent>
        </Card>
        <BarbellWeightModal />
      </>
    );
  }
}

export const WeightSetup = withStyles(styles)(WeightSetupPageInner);

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { inject, observer,  } from 'mobx-react';
import * as React from 'react';
import { Stores } from '../App';
import { AppStore, WeightStore } from '../stores';
import { styles } from '../styles';
import { InfoPanel, InputField, InputUnitAdornment, PlateList } from './components';

interface WeightRackingCalculatorProps extends WithStyles<typeof styles> {
  store?: WeightStore;
  appStore?: AppStore;
}

@inject((stores: Stores) => ({ store: stores.store, appStore: stores.appStore }))
@observer
class WeightRackingCalculatorInner extends React.Component<WeightRackingCalculatorProps, {}> {
  render() {
    const { classes } = this.props;
    const store = this.props.store as WeightStore;
    const { closeInfo } = this.props.appStore as AppStore;
    const { weight } = store;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography color="textPrimary" variant="title">
            Barbell racking calculator
          </Typography>
          <InfoPanel store={this.props.appStore as AppStore} keyName="showInfo" onClose={closeInfo} />
          <InputField
            label="Total weight"
            value={weight}
            onChanged={this._handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            InputProps={{
              endAdornment: <InputUnitAdornment store={store} />,
            }}
          />
          <Typography color="textPrimary" variant="subheading" className={classes.subTitle}>
            For each side
          </Typography>
          <PlateList />
        </CardContent>
      </Card>
    );
  }

  private _handleChange = value => {
    const { setWeight } = this.props.store as WeightStore;
    const newWeight = parseFloat(value);
    if (!isNaN(newWeight)) {
      setWeight(newWeight);
    } else if (value === '') {
      setWeight(0);
    }
  };
}

export const WeightRackingCalculator = withStyles(styles)(WeightRackingCalculatorInner);

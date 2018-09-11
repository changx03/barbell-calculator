import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Stores } from '../App';
import { AppStore, WeightStore } from '../stores';
import { styles } from '../styles';
import { InfoPanel, InputUnitAdornment, NumberInputField, PlateList } from './components';

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

    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography color="textPrimary" variant="title">
            Barbell racking calculator
          </Typography>
          <InfoPanel store={this.props.appStore as AppStore} keyName="showInfo" onClose={closeInfo} />
          <NumberInputField
            label="Total weight"
            store={store}
            editKey="weight"
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
          <div className={classes.customInputGroup}>
            <Typography color="textSecondary" variant="caption">{`Descrease / Increase by ${
              store.increment
            }%`}</Typography>
            <IconButton key="minus-btn" aria-label="Minus" color="primary" onClick={this._onIncrementBtnClick(false)}>
              <Remove />
            </IconButton>
            <IconButton key="add-btn" aria-label="Add" color="primary" onClick={this._onIncrementBtnClick(true)}>
              <Add />
            </IconButton>
          </div>
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
    setWeight(value);
  };

  private _onIncrementBtnClick = (isAdd: boolean) => () => {
    const { applyIncrement } = this.props.store as WeightStore;
    applyIncrement(isAdd);
  };
}

export const WeightRackingCalculator = withStyles(styles)(WeightRackingCalculatorInner);

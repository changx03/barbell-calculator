import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { PlateAvailableListItem, Unit, WeightStore } from '../../stores/weight';
import { styles } from '../../styles';

export interface WeightPlateSelectListProps extends WithStyles<typeof styles> {
  store?: WeightStore;
  title: string;
  unit: Unit;
  icon: any;
}

@inject('store')
@observer
class WeightPlateSelectListInner extends React.Component<WeightPlateSelectListProps, {}> {
  @observable
  isOpen: boolean = false;

  render() {
    const { title, unit, classes, icon } = this.props;
    const store = this.props.store as WeightStore;
    const list = unit === Unit.Kg ? store['plateListKg'] : store['plateListLb'];

    return (
      <Paper elevation={0}>
        <List>
          <ListItem button onClick={this.toggleExpand}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
            {this.isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.isOpen} timeout="auto">
            <List component="div" disablePadding>
              {list.map((p: PlateAvailableListItem) => (
                <ListItem
                  key={p.weight}
                  button
                  onClick={() => this._handleToggleWeight(p.weight)}
                  className={classes.nested}
                >
                  <ListItemText primary={p.weight} />
                  <Checkbox checked={p.isAvailable} disableRipple tabIndex={-1} color="primary" />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </Paper>
    );
  }

  _handleToggleWeight = (value: number) => {
    const { store, unit } = this.props;
    (store as WeightStore).togglePlate(value, unit);
  };

  @action
  toggleExpand = () => {
    this.isOpen = !this.isOpen;
  };
}

export const WeightPlateSelectList = withStyles(styles)(WeightPlateSelectListInner);

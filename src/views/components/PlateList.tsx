import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Adjust from '@material-ui/icons/Adjust';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WeightStore } from '../../stores';
import { PlateRowDetail } from './PlateRowDetail';

export interface PlateListProps {
  store?: WeightStore;
}

@inject('store')
@observer
export class PlateList extends React.Component<PlateListProps, {}> {
  render() {
    const store = this.props.store as WeightStore;
    const { plateCountList } = store;
    return (
      <List>
        {plateCountList.map(item => (
          <ListItem key={item.weight}>
            <ListItemIcon>
              <Adjust />
            </ListItemIcon>
            <PlateRowDetail {...item} />
          </ListItem>
        ))}
      </List>
    );
  }
}

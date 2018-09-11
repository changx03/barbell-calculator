import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { PlateCountListItem, Unit, weightRounding } from '../../stores';

export interface PlateRowDetailProps extends PlateCountListItem {}

export function PlateRowDetail(props: PlateRowDetailProps) {
  const { count, unit, weight } = props;
  const unitStr = unit === Unit.Kg ? 'Kg' : 'Lb';
  if (count === 0) {
    return <ListItemText primary={`Leftover weights: ${weightRounding(weight, unit === Unit.Kg)} ${unitStr}`} />;
  }
  return (
    <>
      <ListItemText primary={`${weight} ${unitStr}`} />
      <Typography variant="subheading">{count}</Typography>
    </>
  );
}

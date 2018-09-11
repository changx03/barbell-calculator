import { createStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: 'auto',
      maxWidth: 800,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing.unit * 10,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300,
    },
    modal: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      marginTop: theme.spacing.unit * 10,
      marginBottom: theme.spacing.unit * 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 600,
    },
    modalTitle: {
      marginBottom: theme.spacing.unit * 2,
    },
    subTitle: {
      marginTop: theme.spacing.unit * 2,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    icon: {
      fontSize: 20,
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
    },
    closeIconButton: {
      height: 28,
      width: 28,
    },
  });

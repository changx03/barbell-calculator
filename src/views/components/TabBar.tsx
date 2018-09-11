import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Settings from '@material-ui/icons/Settings';
import Star from '@material-ui/icons/Star';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppStore } from '../../stores/appStore';

interface TabBarProps extends RouteComponentProps<TabBarInner> {
  appStore?: AppStore;
}

@inject('appStore')
@observer
class TabBarInner extends React.Component<TabBarProps, {}> {
  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    if (pathname === '/setup') {
      const { setCurrentPage } = this.props.appStore as AppStore;
      setCurrentPage(1);
    }
  }

  render() {
    const { currentPageIndex } = this.props.appStore as AppStore;

    return (
      <Tabs
        value={currentPageIndex}
        onChange={this._onTabChange}
        fullWidth
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<Star />} label="CALCULATE" />
        <Tab icon={<Settings />} label="SETTINGS" />
      </Tabs>
    );
  }

  private _onTabChange = (_e, value) => {
    const { setCurrentPage } = this.props.appStore as AppStore;
    setCurrentPage(value);
    const { history } = this.props;
    switch (value) {
      case 1:
        history.push('/setup');
        break;
      default:
        history.push('/');
    }
  };
}

export const TabBar = withRouter(TabBarInner);

import CssBaseline from '@material-ui/core/CssBaseline';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { AppStore } from './stores/appStore';
import { WeightStore } from './stores/weight';
import { WeightRackingCalculator, WeightSetup } from './views';
import { TabBar, AppFooter } from './views/components';

const weightStore = new WeightStore();
const appStore = new AppStore();
const history = createHistory();

export interface Stores {
  appStore: AppStore;
  store: WeightStore;
}

class App extends React.Component {
  public render() {
    return (
      <>
        <CssBaseline />
        <Provider store={weightStore} appStore={appStore}>
          <Router history={history}>
            <>
              <TabBar />
              <Switch>
                <Route exact path="/setup" component={WeightSetup} />
                <Route exact path="/" component={WeightRackingCalculator} />
                <Redirect to="/" />
              </Switch>
            </>
          </Router>
        </Provider>
        <AppFooter/>
      </>
    );
  }
}

export default App;

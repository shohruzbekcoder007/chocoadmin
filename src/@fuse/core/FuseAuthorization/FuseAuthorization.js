import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import { Component } from 'react';
import { matchRoutes } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import history from '@history';
import {
  getSessionRedirectUrl,
  setSessionRedirectUrl,
  resetSessionRedirectUrl,
} from '@fuse/core/FuseAuthorization/sessionRedirectUrl';

class FuseAuthorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: true,
      routes,
    };
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location, userRole } = props;
    const { pathname } = location;

    const matchedRoutes = matchRoutes(state.routes, pathname);

    const matched = matchedRoutes ? matchedRoutes[0] : false;

    const userHasPermission = FuseUtils.hasPermission(matched.route.auth, userRole);

    const ignoredPaths = ['/', '/callback', '/sign-in', '/sign-out', '/logout', '/404'];

    if (matched && !userHasPermission && !ignoredPaths.includes(pathname)) {
      setSessionRedirectUrl(pathname);
    }

    return {
      accessGranted: matched ? userHasPermission : true,
    };
  }

  redirectRoute() {
    const { userRole } = this.props;
    const redirectUrl = getSessionRedirectUrl() || this.props.loginRedirectUrl;

    /*
        User is guest
        Redirect to Login Page
        */
    if (!userRole || userRole.length === 0) {
      setTimeout(() => history.push('/sign-in'), 0);
    } else {
      /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or loginRedirectUrl
        */
      setTimeout(() => history.push(redirectUrl), 0);

      resetSessionRedirectUrl();
    }
  }

  render() {
    // console.info('Fuse Authorization rendered', this.state.accessGranted);
    return this.state.accessGranted ? this.props.children : null;
  }
}

FuseAuthorization.contextType = AppContext;

export default withRouter(FuseAuthorization);

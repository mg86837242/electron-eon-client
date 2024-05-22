import * as React from 'react';
import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import useAuthStore from '../store/useAuthStore';
import isTokenExpired from '../utils/isTokenExpired';

import Spinner from './Spinner';

export default function RequireAuth({ permittedRoles }) {
  const location = useLocation();
  const outletContext = useOutletContext();
  const token = useAuthStore(state => state.token);
  const authUser = useAuthStore(state => state.authUser);
  const isAuthUserLoading = useAuthStore(state => state.isAuthUserLoading);

  // `token` state is persisted, thus more reliable, whereas `authUser` will be briefly null on mount
  const isAuthenticated = !!token && !isTokenExpired(token);
  const canAccess = permittedRoles?.includes(authUser?.claims?.scope);

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (isAuthUserLoading) {
    return <Spinner />;
  }

  if (canAccess) {
    return outletContext ? <Outlet context={outletContext} /> : <Outlet />;
  } else {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
}

RequireAuth.propTypes = {
  permittedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// References:
// -- alternatively, use a `loadingElapsed` state to delay the evaluation of `canAccess`, and render a spinner while
//    timed out (Effect hook + `setTimeout`); this can also work in conjunction with the curr solution
// -- another alternative is to use TSQ to fetch token and authenticated user, so that I don't need to code
//    `isAuthUserLoading` and even error-related states myself => // TODO debate is needed whether or not to `POST /auth/login` and `GET /auth/me` in store or in custom hook (fetching part will be managed by TSQ); I've also seen ppl putting event handlers in store (but for this approach, a custom hook incl. an Effect hook to sync with the token state and persisted token is still needed); taking it to another extreme, all the global auth states can be managed by TSQ since they're server-side states
//
// -- cond providing router: https://stackoverflow.com/questions/62384395/protected-route-with-react-router-v6/64347082#64347082
//    => not recommended => "I would create a single route with all router, then in the loader of the routes I would
//    check the role of the user and if it doesn’t have access I would either render a 404 (to hide the existence of the
//    route) or redirect (if the user can know that exists but it doesn’t have access)", by Sergio

// References for passing ctx (e.g., role info) to the loader
// -- The official proposal of middleware feature to help passing the ctx to the loader:
//    https://github.com/remix-run/react-router/discussions/9564:

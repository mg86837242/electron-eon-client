import * as React from 'react';

import { Spinner } from '../../components';
import useAuthStore from '../../store/useAuthStore';

import ProductCatalog from './ProductCatalog';
import ProductCatalogForCurrUser from './ProductCatalogForCurrUser';

export default function ProductsPage() {
  const authUser = useAuthStore(state => state.authUser);
  const isAuthUserLoading = useAuthStore(state => state.isAuthUserLoading);

  const role = authUser?.claims?.scope;

  if (isAuthUserLoading) {
    return <Spinner />;
  }

  return role ? <ProductCatalogForCurrUser /> : <ProductCatalog />;
}

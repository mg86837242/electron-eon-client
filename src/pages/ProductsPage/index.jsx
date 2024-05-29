import * as React from 'react';

import { Spinner } from '../../components';
import useAuthUser from '../../hooks/useAuthUser';

import ProductCatalog from './ProductCatalog';
import ProductCatalogForCurrUser from './ProductCatalogForCurrUser';

export default function ProductsPage() {
  const { authUser, isAuthUserPending } = useAuthUser();

  const role = authUser?.claims?.scope;

  if (isAuthUserPending) {
    return <Spinner />;
  }

  return role ? <ProductCatalogForCurrUser /> : <ProductCatalog />;
}

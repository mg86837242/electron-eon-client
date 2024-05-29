import { useQuery } from '@tanstack/react-query';

import { getAuthUser } from '../api';
import useAuthStore from '../store/useAuthStore';
import isTokenExpired from '../utils/isTokenExpired';

export default function useAuthUser() {
  const token = useAuthStore(state => state.token);

  return useQuery({
    queryKey: ['getAuthUser', token],
    queryFn: () => getAuthUser(token),
    enabled: !!token && !isTokenExpired(token),
    staleTime: Infinity,
  });
}

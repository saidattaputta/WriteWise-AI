import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../services/authService'

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}
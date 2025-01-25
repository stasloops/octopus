import { http } from '@/shared/api/instance';
import { useQuery } from 'react-query';

export const useFilterDataQuery = () => {
  const bloggersLocations = useQuery({
    queryKey: ['bloggers-locations'],
    queryFn: async (): Promise<string[]> => {
      const { data } = await http.get('/catalog/bloggers/locations');
      return data;
    }
  });

  const subscribersLocations = useQuery({
    queryKey: ['subscribers-locations'],
    queryFn: async (): Promise<string[]> => {
      const { data } = await http.get('/catalog/subscribers/locations');
      return data;
    }
  });

  const postTags = useQuery({
    queryKey: ['posts-tags'],
    queryFn: async (): Promise<string[]> => {
      const { data } = await http.get('/catalog/posts/tags');
      return data;
    }
  });

  return {
    bloggersLocations,
    subscribersLocations,
    postTags,
    isLoading: bloggersLocations.isLoading || subscribersLocations.isLoading || postTags.isLoading,
    isError: bloggersLocations.isError || subscribersLocations.isError || postTags.isError,
  };
}; 
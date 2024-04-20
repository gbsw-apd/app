import {useQuery} from '@tanstack/react-query';
import {UseQueryCustomOptions} from '../../types';
import {ResponseSinglePost, getPost} from '../../api';
import {queryKeys} from '../../constants';

function useGetPost(
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseSinglePost>,
) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
}

export default useGetPost;

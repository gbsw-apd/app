import {useMutation} from '@tanstack/react-query';
import {UseMutationCustomOptions} from '../../types';
import {updateFavoritePost} from '../../api';
import queryClient from '../../api/queryClient';
import {queryKeys} from '../../constants';

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updateId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updateId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.POST,
          queryKeys.FAVORITE,
          queryKeys.GET_FAVORITE_POSTS,
        ],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateFavoritePost;

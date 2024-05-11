import {useMutation} from '@tanstack/react-query';
import {UseMutationCustomOptions} from '../../types';
import {deletePost} from '../../api';
import queryClient from '../../api/queryClient';
import {queryKeys} from '../../constants';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    // deleteId
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      // queryClient.setQueryData<Marker[]>(
      //   [queryKeys.MARKER, queryKeys.GET_MARKERS],
      //   existingMarkers => {
      //     return existingMarkers?.filter(marker => marker.id !== deleteId);
      //   },
      // );
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;

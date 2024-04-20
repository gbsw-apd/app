import {useQuery} from '@tanstack/react-query';
import {Marker, UseQueryCustomOptions} from '../../types';
import {getMarkers} from '../../api';
import {queryKeys} from '../../constants';

function useGetMarkers(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkers;

import {useEffect, useRef, useState, useCallback} from 'react';
import useLocationStore from '../store/useLocationStore';
import MapView, {LatLng, Region} from 'react-native-maps';
import {numbers} from '../constants';
type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);
  const {moveLocation} = useLocationStore();

  const moveMapView = useCallback(
    (coordinate: LatLng, delta?: Delta) => {
      mapRef.current?.animateToRegion({
        ...coordinate,
        ...(delta ?? regionDelta),
      });
    },
    [regionDelta],
  ); // regionDelta를 의존성 배열에 추가합니다.

  const handleChangeDelta = useCallback((region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  }, []); // 여기에는 의존성이 없습니다.

  useEffect(() => {
    if (moveLocation) {
      moveMapView(moveLocation);
    }
  }, [moveLocation, moveMapView]); // moveMapView를 의존성 배열에 추가합니다.

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;

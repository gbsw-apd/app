import {Marker} from '../types';
import axiosInstance from './axios';

const getMarkers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/markers/my');

  return data;
};

export {getMarkers};

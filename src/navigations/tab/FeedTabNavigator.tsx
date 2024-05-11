/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, feedNavigations, feedTabNavigations} from '../../constants';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import FeedFavoriteScreen from '../../screens/feed/FeedFavoriteScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import FeedHomeHeaderLeft from '../../components/feed/FeedHomeHeaderLeft';

export type FeedTabParamList = {
  [feedTabNavigations.FEED_HOME]: {
    screen: typeof feedNavigations.FEED_DETAIL;
    params: {
      id: number;
    };
    initial: false;
  };
  [feedTabNavigations.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcons(route: RouteProp<FeedTabParamList>, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case feedTabNavigations.FEED_HOME: {
      iconName = focused ? 'reader' : 'reader-outline';
      break;
    }
    case feedTabNavigations.FEED_FAVORITE: {
      iconName = focused ? 'star' : 'star-outline';
      break;
    }
  }

  return (
    <Ionicons
      name={iconName}
      color={focused ? colors.GREEN_700 : colors.GRAY_500}
      size={25}
    />
  );
}

function FeedTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: colors.GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.GREEN_700,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          borderTopColor: colors.GRAY_200,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <Tab.Screen
        name={feedTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: (tabRoute => {
            const routeName =
              getFocusedRouteNameFromRoute(tabRoute) ??
              feedNavigations.FEED_HOME;

            if (
              routeName === feedNavigations.FEED_DETAIL ||
              routeName === feedNavigations.EDIT_POST ||
              routeName === feedNavigations.IMAGE_ZOOM
            ) {
              return {display: 'none'};
            }

            return {
              backgroundColor: colors.WHITE,
              borderTopColor: colors.GRAY_200,
              borderTopWidth: StyleSheet.hairlineWidth,
            };
          })(route),
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={({navigation}) => ({
          headerTitle: '즐겨찾기',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
    </Tab.Navigator>
  );
}

export default FeedTabNavigator;

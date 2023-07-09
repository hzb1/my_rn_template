import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from './views/tabs/home/Home';
import Settings from './views/settings/Settings';
import Profile from './views/profile/Profile';
import Feed from './views/tabs/feed/Feed';
import Notifications from './views/tabs/notifications/Notifications';
import {Text, TouchableOpacity, View} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

export type RootStackParamList = {
  Home: undefined;
  Profile: {userId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
function HomeTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{headerTitleAlign: 'center'}}
      tabBar={props => MyTabBar(props, insets)}>
      <Tab.Screen name="Home" options={{title: '首页'}} component={Home} />
      <Tab.Screen name="Feed" options={{title: 'Feed'}} component={Feed} />
      <Tab.Screen
        name="Notifications"
        options={{title: '通知'}}
        component={Notifications}
      />
    </Tab.Navigator>
  );
}

function MyTabBar(
  {state, descriptors, navigation}: BottomTabBarProps,
  insets: EdgeInsets,
) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingBottom: insets.bottom,
        display: 'flex',
        height: 50 + insets.bottom,
        // borderTopWidth: 1,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = (options.tabBarLabel ||
          options.title ||
          route.name) as string;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // navigation.navigate({name: route.name, merge: true});
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              // backgroundColor: '#999',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: isFocused ? '#ff5900' : '#333',
                fontSize: 16,
                textAlign: 'center',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Home"
          // headerShown: false 隐藏标题
          options={{headerShown: false}}
          component={HomeTabs}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

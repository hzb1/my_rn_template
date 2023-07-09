import {Button, Text, View} from 'react-native';
import type {RootStackParamList} from '../../../Router';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList>;
const Home = ({navigation}: Props) => {
  // const insets = useSafeAreaInsets();
  const goProfile = () => {
    navigation.navigate('Profile', {userId: '1024'});
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#000',
        // Paddings to handle safe area
        // paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        // paddingLeft: insets.left,
        // paddingRight: insets.right,
      }}>
      <Text>Home!</Text>
      {/*<Text>{insets.bottom}</Text>*/}

      <Button title={'Go Profile'} onPress={goProfile} />
    </View>
  );
};

export default Home;

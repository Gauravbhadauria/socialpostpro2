import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello ,Welcome</Text>
      <Text
        style={[
          styles.welcome,
          {marginRight: 20, fontSize: 20, color: '#8e8e8e'},
        ]}>
        For which Platform you want to create post
      </Text>
      <View style={styles.socialView}>
        <FlatList
          data={[
            {name: 'Facebook', icon: require('../images/facebook.png')},
            {name: 'Twitter', icon: require('../images/twitter.png')},
            {name: 'Instagram', icon: require('../images/instagram.png')},
            {name: 'Snapchat', icon: require('../images/snapchat.png')},
            {name: 'Linkedin', icon: require('../images/linkedin.png')},
          ]}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  navigation.navigate('CreatePost', {
                    name: item.name,
                    icon: item.icon,
                  });
                }}>
                <Image source={item.icon} style={styles.itemImage} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginTop: 50,
    marginLeft: 20,
  },
  socialView: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    width: '20%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
});

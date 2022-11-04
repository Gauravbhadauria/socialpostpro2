import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

const CreatePost = () => {
  const route = useRoute();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [caption, setCaption] = useState('');
  const [imageData, setImageData] = useState(null);
  const ref = useRef();
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'SocialPost Pro App Camera Permission',
          message:
            'Socialpost Pro App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'SocialPost Pro App Camera Permission',
          message:
            'Socialpost Pro App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      console.log(result);
      setImageData(result);
    }
  };
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      console.log(result);
      setImageData(result);
    }
  };

  const captureScreenShot = () => {
    ref.current.capture().then(uri => {
      console.log('do something with ', uri);
      Share.open({
        message: caption,
        url: uri,
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post For {route.params.name}</Text>
      <ViewShot
        ref={ref}
        options={{fileName: 'Your-File-Name', format: 'jpg', quality: 0.9}}
        style={styles.postView}>
        <View style={styles.topView}>
          <View style={styles.topLeft}>
            {imageData == null ? (
              <Image
                source={require('../images/user.png')}
                style={styles.userImage}
              />
            ) : (
              <Image
                source={{uri: imageData.assets[0].uri}}
                style={styles.userImage}
              />
            )}

            <View style={styles.nameView}>
              <Text style={styles.name}>{name == '' ? 'Name' : name}</Text>
              <Text style={styles.username}>
                {userName == '' ? '@username' : '@' + userName}
              </Text>
            </View>
          </View>
          <Image source={route.params.icon} style={styles.iconImage} />
        </View>
        <Text style={styles.caption}>
          {caption == '' ? 'Caption here..' : caption}
        </Text>
      </ViewShot>
      <TextInput
        placeholder="Name"
        style={styles.textInput}
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
      />
      <TextInput
        placeholder="Username"
        style={styles.textInput}
        value={userName}
        onChangeText={txt => {
          setUserName(txt);
        }}
      />
      <TextInput
        placeholder="Caption"
        style={styles.textInput}
        multiline={true}
        value={caption}
        onChangeText={txt => {
          setCaption(txt);
        }}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          requestGalleryPermission();
        }}>
        <Text style={styles.btnText}>Pick Image From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          requestCameraPermission();
        }}>
        <Text style={styles.btnText}>Pick Image From Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.share} onPress={()=>{
        captureScreenShot()
      }}>
        <Image
          source={require('../images/share.png')}
          style={styles.iconImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
    marginTop: 100,
  },
  postView: {
    width: '80%',
    borderRadius: 10,
    elevation: 10,
    alignSelf: 'center',

    marginTop: 50,
    backgroundColor: '#fff',
  },
  topView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameView: {
    marginLeft: 10,
  },
  name: {
    fontWeight: '800',
    fontSize: 18,
  },
  username: {
    color: '#8e8e8e',
  },
  caption: {
    fontSize: 16,
    fontWeight: '600',
    margin: 15,
  },
  textInput: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  btn: {
    backgroundColor: 'purple',
    height: 50,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  share: {
    position: 'absolute',
   
    top: 50,
    right: 20,
  },
});

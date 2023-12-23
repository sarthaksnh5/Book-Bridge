import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../components/HeaderComponent';
import TextComponent from '../components/TextComponent';
import {ActivityIndicator, Divider, Modal, Portal, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {deleteSelectedBook, getBookDetails} from '../helpers/bookController';
import {userLogout} from '../store/UserStore';
import ButtonComponent from '../components/ButtonComponent';
import {deleteBook} from '../store/BookStore';
import {initializeChatController} from '../helpers/chatController';

const SingleBookScreen = ({navigation}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const [deleteBookLoading, setDeleteBookLoading] = useState(false);

  const [bookData, setBookData] = useState({});

  const book_id = useSelector(state => state?.book.book);
  const user = useSelector(state => state?.user);

  const [askforBookLoading, setAskforBookLoading] = useState(true);

  const dispatch = useDispatch();

  const getSingleBookDetails = async () => {
    setIsLoading(true);
    try {
      var data = await getBookDetails(book_id, user.token.access);

      if (data['error']) {
        if (data['message'] === 'Unauthorized') {
          Alert.alert('Error', 'Token Expired');
          dispatch(userLogout());
          navigation.replace('Login');
        } else {
          Alert.alert('Error', data['message']);
          navigation.goBack();
        }
      } else {
        var book = data['message'];
        setBookData(book);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSingleBookDetails();

    return () => {};
  }, []);

  const handleDelete = async () => {
    setDeleteBookLoading(true);
    try {
      var response = await deleteSelectedBook(book_id, user['token']['access']);
      if (response['error']) {
        if (response['message'] === 'Unauthorized') {
          Alert.alert('Error', 'Token Expired');
          dispatch(userLogout());
          navigation.replace('Login');
        } else {
          Alert.alert('Error', response['message']);
        }
      } else {
        dispatch(deleteBook(book_id));
        navigation.replace('Home');
      }
    } catch (e) {
      console.log(e);
    }
    setDeleteBookLoading(false);
  };

  const handleInitChat = async () => {
    setAskforBookLoading(true);
    var response = await initializeChatController(
      user['token']['access'],
      user['id'],
      bookData['user']['id'],
      bookData['title'],
      bookData['id'],
    );

    if (response['error']) {
      if (response['message'] === 'Unauthorized') {
        Alert.alert('Error', 'Token Expired');
        dispatch(userLogout());
        navigation.replace('Login');
      } else {
        Alert.alert('Error', response['message']);
      }
    } else {
      navigation.navigate('Chat');
    }
    setAskforBookLoading(false);
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <Divider bold={true} />
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View style={styles.bookContainer}>
          <View style={styles.headingContainer}>
            <TextComponent
              variant={'headlineLarge'}
              textStyles={{color: theme.colors.primary, fontWeight: 'bold'}}
              content={bookData?.title}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailContainer}>
              <TextComponent variant={'titleSmall'} content={'Author: '} />
              <TextComponent
                variant={'titleSmall'}
                textStyles={{fontWeight: 'bold'}}
                content={bookData?.author}
              />
            </View>
            <View style={styles.detailContainer}>
              <TextComponent variant={'titleSmall'} content={'Year: '} />
              <TextComponent
                variant={'titleSmall'}
                textStyles={{fontWeight: 'bold'}}
                content={bookData?.publication_year}
              />
            </View>
            <View style={styles.detailContainer}>
              <TextComponent variant={'titleSmall'} content={'Grade: '} />
              <TextComponent
                variant={'titleSmall'}
                textStyles={{fontWeight: 'bold'}}
                content={bookData?.grade}
              />
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <TextComponent variant={'titleMedium'} content={'Description'} />
            <ScrollView style={styles.descriptionScrollContainer}>
              <TextComponent
                variant={'labelLarge'}
                content={bookData?.description}
              />
            </ScrollView>
          </View>
          <View style={styles.imagesContainer}>
            <TextComponent content={'Images'} variant={'headlineLarge'} />
            {bookData?.images.length > 0 ? (
              <FlatList
                data={bookData?.images}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedImage(item.image);
                        setShowModal(true);
                      }}>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 100, height: 100, marginRight: 10}}
                        resizeMode={'center'}
                      />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item.id}
                horizontal={true}
                // numColumns={2}
                contentContainerStyle={styles.imageFlatListContainer}
              />
            ) : (
              <TextComponent content={'No Images'} />
            )}
          </View>
          <Portal>
            <Modal
              visible={showModal}
              onDismiss={() => {
                setShowModal(false);
              }}
              contentContainerStyle={{padding: 10, backgroundColor: 'white'}}>
              <Image
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: Dimensions.get('window').height - 100,
                  resizeMode: 'contain',
                  borderRadius: 8,
                }}
                source={{uri: selectedImage}}
                loadingIndicatorSource={<ActivityIndicator size={'large'} />}
              />
              <ButtonComponent
                label={'Close'}
                onPress={() => {
                  setShowModal(false);
                }}
              />
            </Modal>
          </Portal>
          {bookData.user.id === user.id ? (
            <>
              <ButtonComponent
                isLoading={deleteBookLoading}
                mode={'contained-tonal'}
                label={'Delete'}
                onPress={handleDelete}
              />
            </>
          ) : (
            <>
              <ButtonComponent
                label={'Ask for Book'}
                onPress={handleInitChat}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default SingleBookScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // alignItems: 'center',
  },
  bookContainer: {
    width: '100%',
    padding: 8,
  },
  headingContainer: {},
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  detailContainer: {
    flexDirection: 'row',
  },
  descriptionContainer: {
    maxHeight: '20%',
  },
  descriptionScrollContainer: {
    width: '100%',
    height: '100%',
  },
  imagesContainer: {
    width: '100%',
  },
  imageContainer: {
    marginRight: 10,
    maxWidth: '30%',
    padding: 10,
  },
  imageFlatListContainer: {
    width: '100%',
    height: '80%',
  },
});

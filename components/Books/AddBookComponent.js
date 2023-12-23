import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Modal, Portal} from 'react-native-paper';
import InputComponent from '../InputComponent';
import TextComponent from '../TextComponent';
import ButtonComponent from '../ButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {userLogout} from '../../store/UserStore';
import {useNavigation} from '@react-navigation/native';
import {addBookController} from '../../helpers/bookController';
import {addBook} from '../../store/BookStore';

const AddBookComponent = ({showModal, setShowModal}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');
  const [bookLoading, setBookLoading] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (
      title.length > 0 &&
      author.length > 0 &&
      publicationYear.length > 0 &&
      description.length > 0 &&
      grade.length > 0
    ) {
      setBookLoading(true);
      try {
        var response = await addBookController(
          user['token']['access'],
          user['id'],
          title,
          author,
          publicationYear,
          grade,
          description,
        );

        if (response['error']) {
          if (response['error'] === 'Unauthorized') {
            setShowModal(false);
            Alert.alert('Error', 'Token Expired! Please login again');
            dispatch(userLogout());
            navigation.navigate('Login');
          } else {
            Alert.alert('Error', response['message']);
          }
        } else {
          var book = response['message'];
          dispatch(addBook(book));
          setShowModal(false);
        }
      } catch (e) {
        console.log(e);
      }
      setBookLoading(false);
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <Portal>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={styles.container}>
        <TextComponent content={'Add a Book'} variant={'headlineLarge'} />
        <InputComponent
          label={'title'}
          value={title}
          setValue={setTitle}
          leftIcon={'book'}
        />
        <InputComponent
          label={'Author'}
          value={author}
          setValue={setAuthor}
          leftIcon={'account'}
        />
        <InputComponent
          label={'Publication Year'}
          value={publicationYear}
          setValue={setPublicationYear}
          leftIcon={'calendar-range'}
        />

        <InputComponent
          label={'Grade'}
          value={grade}
          setValue={setGrade}
          leftIcon={'book-variant'}
        />

        <InputComponent
          label={'Description'}
          value={description}
          setValue={setDescription}
          leftIcon={'semantic-web'}
          numberOfLines={4}
        />

        <ButtonComponent
          label={'Submit'}
          loading={bookLoading}
          onPress={handleSubmit}
        />
        <ButtonComponent
          label={'Close'}
          mode="contained-tonal"
          onPress={() => {
            setShowModal(false);
          }}
        />
      </Modal>
    </Portal>
  );
};

export default AddBookComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 20,
    alignSelf: 'center',
  },
});

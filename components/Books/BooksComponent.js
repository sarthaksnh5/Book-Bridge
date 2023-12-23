import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SingleBookComponent from './SingleBookComponent';
import TextComponent from '../TextComponent';
import {useDispatch, useSelector} from 'react-redux';
import {getBooks} from '../../helpers/bookController';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, FAB} from 'react-native-paper';
import AddBookComponent from './AddBookComponent';
import {filterBooks, setBooks} from '../../store/BookStore';
import {userLogout} from '../../store/UserStore';

const BooksComponent = ({searchText}) => {
  const [getBooksLoading, setGetBooksLoading] = useState(true);
  const books = useSelector(state => state.book.books);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => {
    return state?.user;
  });

  useEffect(() => {
    dispatch(filterBooks(searchText));

    return () => {};
  }, [searchText]);

  const getBooksData = async () => {
    setGetBooksLoading(true);
    try {
      var data = await getBooks(user['token']['access']);
      // console.log(data)
      if (data['error']) {
        if (data['message'] === 'Unauthorized') {
          Alert.alert('Error', 'Token Expired');
          dispatch(userLogout());
          navigation.replace('Login');
        } else {
          Alert.alert('Error', data['message']);
        }
      } else {        
        var books = data['message'];
        dispatch(setBooks(books));
        setGetBooksLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBooksData();

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <AddBookComponent showModal={showModal} setShowModal={setShowModal} />
      {getBooksLoading ? (
        <>
          <ActivityIndicator size={'large'} />
          <TextComponent content={'Getting Knowledge...'} />
        </>
      ) : (
        <ScrollView>
          {books !== null && books.length > 0 ? (
            books.map(item => {
              return (
                <SingleBookComponent
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  author={item.author}
                  year={item.publication_year}
                  grade={item.grade}
                  rating={5}
                />
              );
            })
          ) : (
            <View style={{padding: 8}}>
              <TextComponent variant={''} content={'No Books Yet'} />
            </View>
          )}
        </ScrollView>
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowModal(!showModal)}
      />
    </View>
  );
};

export default BooksComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    height: '70%',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 3,
  },
});

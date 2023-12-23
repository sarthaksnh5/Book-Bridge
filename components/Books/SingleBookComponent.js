import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComponent from '../TextComponent';
import {Divider, useTheme} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSingleBook} from '../../store/BookStore';

const SingleBookComponent = ({id, title, author, year, rating, grade}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setSingleBook(id));
        navigation.navigate('SingleBook');
      }}
      style={styles.mainBookContainer}>
      <View style={styles.bookContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/book_template.png')}
            resizeMode={'contain'}
            style={styles.image}
          />
        </View>
        <View style={styles.rightSide}>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <TextComponent variant={'titleLarge'} content={title} />
            </View>
            <View style={styles.yearAuthorContainer}>
              <TextComponent variant={'titleSmall'} content={year} />
              <TextComponent variant={'titleSmall'} content={', By: '} />
              <TextComponent variant={'titleSmall'} content={author} />
              <TextComponent variant={'titleSmall'} content={', Class: '} />
              <TextComponent variant={'titleSmall'} content={grade} />
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <TextComponent variant={'headlineSmall'} content={rating} />
            <AntDesign name="star" size={18} color={theme.colors.primary} />
          </View>
        </View>
      </View>
      <Divider bold={true} />
    </TouchableOpacity>
  );
};

export default SingleBookComponent;

const styles = StyleSheet.create({
  bookContainer: {
    display: 'flex',
    width: 'auto',
    height: 'auto',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: '15%',
  },
  image: {
    width: 50,
    height: 50,
  },
  rightSide: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    marginLeft: 10,
  },
  titleContainer: {},
  yearAuthorContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratingContainer: {
    padding: 5,
    width: 'auto',
    height: 'auto',
    flexDirection: 'row',
  },
});

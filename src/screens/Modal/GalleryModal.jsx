import React, { useState, useRef } from 'react';
import {
  Modal, View, StyleSheet, TouchableOpacity, Text, Image, Dimensions,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import CustomButton from '../../components/CustomButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const images = [
  { title: '1/11. Нажмите на кнопку с шестиренкой', source: require('../../img/instructions/1.png') },
  { title: '2/11. Нажмите на кнопку с “КОНФИГУРАЦИЯ”', source: require('../../img/instructions/2.png') },
  { title: '3/11. Введите пароль “121”', source: require('../../img/instructions/3.png') },
  { title: '4/11. Нажмите на 7 раздел “СЕРВИС”', source: require('../../img/instructions/4.png') },
  { title: '5/11. Нажмите на 3 раздел “ETHERNET”', source: require('../../img/instructions/5.png') },
  { title: '6/11. Нажмите на “IP Адрес удаленного сервера”', source: require('../../img/instructions/6.png') },
  { title: '7/11. Введите ip адрес “92.118.113.84”', source: require('../../img/instructions/7.png') },
  { title: '8/11. Нажмите на “OK”', source: require('../../img/instructions/8.png') },
  { title: '9/11. Нажмите на “ВЫХОД”', source: require('../../img/instructions/9.png') },
  { title: '10/11. Нажмите на “ВЫХОД”', source: require('../../img/instructions/10.png') },
  { title: '11/11. Нажмите на “сервис”', source: require('../../img/instructions/11.png') },
  { title: '12/11. Это окно поможет вам зарегистрироваться в приложении', source: require('../../img/instructions/12.png') },
];

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    height: windowHeight / 1.3,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    width: windowWidth,
    height: (windowHeight / 2.6),
    resizeMode: 'contain',
    borderRadius: 35,
  },
  slideTitle: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: responsiveFontSize(2.1),
    textAlign: 'center',
    color: '#212121',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 0,
    marginTop: 20,

  },
  slide: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgClose: {
    width: 30,
    height: 30,
  },
  paginationContainer: {
    width: '100%',
    padding: 20,
    margin: 0,
  },
  textCloseGallery: {
    fontFamily: 'SFProDisplay',
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    color: '#787880',
    marginTop: 30,
    marginBottom: 30,
  },
});

function GalleryModal({
  isGalleryModalVisible, setGalleryModalVisible,
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  // Функция для перехода к следующему слайду
  const goToNextSlide = () => {
    carouselRef.current.snapToNext(); // Шаг 3: Вызываем метод snapToNext
  };


  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      <Image source={item.source} style={styles.img} />
      <Text style={styles.slideTitle}>{item.title}</Text>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isGalleryModalVisible}
      onRequestClose={() => setGalleryModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Carousel
            ref={carouselRef}
            layout="default"
            data={images}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
          />

          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <CustomButton text="Далее" onPress={goToNextSlide} />
          </View>

          <TouchableOpacity onPress={() => setGalleryModalVisible(false)} style={{ width: '100%', paddingHorizontal: 20 }}>
            <Text style={styles.textCloseGallery}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default GalleryModal;

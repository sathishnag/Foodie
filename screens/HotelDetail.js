
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,Image, ImageBackground
} from 'react-native';
import { SIZES, COLORS, FONTS, constants, icons, images } from "../constants";
import TextButton from "../components/TextButton";



const ExpandableComponent = ({item, onClickFunction, onDummyToRender}) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  
  const [cartList, setMyCartList] = React.useState([]);

  
  function existsInCart(id) {
    return cartList.find(cartItem => cartItem.id === id);
  }

  function updateQuantity(newQty, id) {
    const newCartList = cartList.map(cart => {
      cart.id === item.id ? {...cart, qty:newQty}:cart 
    })
    setMyCartList(newCartList);
  }

  function addToCartList (item) {
    cartList.push(item);
    setMyCartList(cartList);
    onDummyToRender();
  }

  function removeFromCartList (id) {
    const indx = cartList.findIndex(item => item.id === id);
    cartList.splice(x, 1);
  }

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);


  return (
    <View>
<TouchableOpacity
  activeOpacity={0.8}
  onPress={
    onClickFunction
  }
  style={styles.header}>
  <Text style={styles.headerText}>
    {item.category_name}
  </Text>
</TouchableOpacity>
<View
  style={{
    height: layoutHeight,
    overflow: 'hidden',
    marginBottom: 8
  }}>
  {item.subcategory.map((item, key) => (
    <TouchableOpacity
      key={key}
      style={styles.content}
      onPress={
        () => alert('Id: ' + item.id + ' val: ' + item.val)
    }>
      <View style={{flex:1}}>
      <View style={{flexDirection:'row'}}>
      <View>
        <Text style={{...FONTS.h5, marginTop:16}}>
          {key}. {item.val}
        </Text>
        <Text style={{color: COLORS.primary}}>
          Rs.70
        </Text>
        <Text style={{color: COLORS.grey}}>
          1 piece
        </Text>
      </View>
      <View style={{flex:1}}>
      <ImageBackground style={{alignSelf:'flex-end', width:100, height:100}} source={images.burger_restaurant_2}>
      {
        existsInCart(item.id) !== undefined ? <Text>xczxcxz</Text> : (<TextButton label='ADD' onPressEve={() => addToCartList(item)} buttonContainerStyle={{width:50,
          alignSelf:"flex-end",
          position: 'absolute',
          top:85,
          right: 30,
          backgroundColor: COLORS.primary}}></TextButton>)
      }
      </ImageBackground>
      </View>
      </View>
      <View style={{flex:1, justifyContent:'flex-end', marginTop:8}}>
        <View style={{...styles.separator}} />
      </View>
      </View>
    </TouchableOpacity>
  ))}
</View>
</View>
  );
};


const HotelDetail = () => {
  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(true);
  const [layoutHeight, setLayoutHeight] = useState(0);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] =
             !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };

  const updateLayout1 = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={{flex: 1, }}>
      <View style={styles.container}>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
            key={item.category_name}
            onClickFunction={() => {
              updateLayout(key);
            }}
            onDummyToRender = {() => {
              updateLayout1(key);
            }

            }
            item={item}
          />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HotelDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal : SIZES.padding - 6,
    marginBottom: SIZES.base,
    marginTop: SIZES.base
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    borderLeftColor: COLORS.primary,
    padding: 10,
    paddingTop: 2,
    paddingBottom: 8,
    marginLeft: 8,
    borderLeftWidth: 5,
    marginBottom: 6,
    height: 30,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color:COLORS.grey
  },
  separator: {
    height: 0.2,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
    justifyContent:'flex-end'
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    flex:1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    paddingBottom: 8
  },
});

const CONTENT = [
  {
    isExpanded: true,
    category_name: 'BREAKFAST',
    subcategory: [
      {id: 3, val: 'Sub Cat 3'},
      {id: 300, val: 'Sub Cat 3'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    subcategory: [
      {id: 4, val: 'Sub Cat 4'},
      {id: 5, val: 'Sub Cat 5'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 3',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
      {id: 9, val: 'Sub Cat 9'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 4',
    subcategory: [
      {id: 10, val: 'Sub Cat 10'},
      {id: 12, val: 'Sub Cat 2'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 5',
    subcategory: [
      {id: 13, val: 'Sub Cat 13'},
      {id: 15, val: 'Sub Cat 5'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 6',
    subcategory: [
      {id: 17, val: 'Sub Cat 17'},
      {id: 18, val: 'Sub Cat 8'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 7',
    subcategory: [{id: 20, val: 'Sub Cat 20'}],
  },
  {
    isExpanded: false,
    category_name: 'Item 8',
    subcategory: [{id: 22, val: 'Sub Cat 22'}],
  },
  {
    isExpanded: false,
    category_name: 'Item 9',
    subcategory: [
      {id: 26, val: 'Sub Cat 26'},
      {id: 27, val: 'Sub Cat 7'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 10',
    subcategory: [
      {id: 28, val: 'Sub Cat 28'},
      {id: 30, val: 'Sub Cat 0'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 11',
    subcategory: [{id: 31, val: 'Sub Cat 31'}],
  },
  {
    isExpanded: false,
    category_name: 'Item 12',
    subcategory: [{id: 34, val: 'Sub Cat 34'}],
  },
  {
    isExpanded: false,
    category_name: 'Item 13',
    subcategory: [
      {id: 38, val: 'Sub Cat 38'},
      {id: 39, val: 'Sub Cat 9'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 14',
    subcategory: [
      {id: 40, val: 'Sub Cat 40'},
      {id: 42, val: 'Sub Cat 2'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 15',
    subcategory: [
      {id: 43, val: 'Sub Cat 43'},
      {id: 44, val: 'Sub Cat 44'},
    ],
  },
];
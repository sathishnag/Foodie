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
import StepperInput  from '../components/StepperInput';
import { idText } from 'typescript';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'react-native-gesture-handler';
import {Dimensions } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { addToCart, deccrementQuantity, doInitializeState , incrementQuantity, updateFoodItems, removeFromCart} from '../actions/actions';


const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const FoodItem = ({item, onDummyToRender}) => {
  const foodItemsDataList = useSelector(state => state.FoodItemsReducer)
  const dispatch = useDispatch();

  const [qty, setQty] = useState(0);

  const [cartList, setMyCartList] = React.useState([]);
  
  function greaterThanZero(item) {
    return item.item.qty > 0;
  }

  function addToCartList (item) {
   dispatch(addToCart(item));
   dispatch(incrementQuantity(item));
   alert(JSON.stringify(foodItemsDataList.selectedCount));
   alert(JSON.stringify(foodItemsDataList.cart))
  }

  function removeFromCartList (item) {
    dispatch(removeFromCart(item));
    dispatch(deccrementQuantity(item));
    alert(JSON.stringify(foodItemsDataList.selectedCount));
    alert(JSON.stringify(foodItemsDataList.cart));
   }

  return(
    <View
    key={item.id}
    style={styles.content}
  >
    <View style={{flex:1}}>
    <View style={{flexDirection:'row'}}>
    <View>
      <Text style={{...FONTS.h5, marginTop:16}}>
        {item.id}. {item.val}
      </Text>
      <Text style={{color: COLORS.primary}}>
        Rs.70
      </Text>
      <Text style={{color: COLORS.grey}}>
        1 piece
      </Text>
    </View>
    <View style={{flex:1}}>
    <ImageBackground style={{alignSelf:'flex-end', width:150, height:150}} source={images.honey_mustard_chicken_burger}>
    {
      greaterThanZero(item) ? 
      (<StepperInput containerStyle={{
          borderColor: 'white',
          borderWidth: 3, top:135,
          right: -20
          }}
          value = {item.item.qty}
          onAdd = {() => {addToCartList(item)}}
          onMinus = {() => {removeFromCartList(item)}}
          >
      </StepperInput>)
      : (<Button
          label='ADD' 
          onPress={() => addToCartList(item)} 
          containerStyle={{width:90,
          height: 40,
          alignSelf:"flex-end",
          position: 'absolute',
          top:135,
          right: 40,
          backgroundColor: COLORS.primary}}></Button>)
    }
    </ImageBackground>
    </View>
    </View>
    <View style={{flex:1, justifyContent:'flex-end', marginTop:8, marginBottom:8}}>
      <View style={{...styles.separator}} />
    </View>
    </View>
  </View>)
}

const ExpandableComponent = ({item, onClickFunction, onDummyToRender, index}) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [qty, setQty] = useState(1);
  
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
  <View style={{backgroundColor:'lightgrey'}}>
  <Text style={styles.headerText}>
    {item.category_name}
  </Text>
  </View>
</TouchableOpacity>
<View
  style={{
    height: layoutHeight,
    overflow: 'hidden',
    marginBottom: 8
  }}>
  {item.subcategory.map((item, key) => (
   <FoodItem item={{item}}  key={item.id} onDummyToRender={onDummyToRender}></FoodItem>
  ))}
</View>
</View>
  );
};


const HotelDetail = ({navigation}) => {
  const dispatch = useDispatch();
  const foodItemsDataList = useSelector(state => state.FoodItemsReducer);
  const [multiSelect, setMultiSelect] = useState(true);
  const [layoutHeight, setLayoutHeight] = useState(0);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...foodItemsDataList.items];
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
    dispatch(updateFoodItems(array));
  };

  const updateLayout1 = () => {
   
  };

  React.useEffect (() => {
    dispatch(doInitializeState(CONTENT));
    },[]);

  return (
    <View style={{flex: 1, backgroundColor:'white'}}>
        <ScrollView>
          {foodItemsDataList.items.map((item, key) => (
            <ExpandableComponent
            key={item.category_name}
            onClickFunction={() => {
              updateLayout(key);
            }}
            onDummyToRender = {() => {
              updateLayout1();
            }
            }
            item={item}
            index={key}
          />
          ))}
        </ScrollView>
      {foodItemsDataList.selectedCount  > 0?
     (<View style={{height:50,
     flexDirection:'row'}}>
         <View
          style={{
            flex: 0.8,
            flexDirection: "row",
            paddingHorizontal: 1,
            paddingBottom: 10,
            borderTopLeftRadius: 20,
            borderBottomEndRadius : 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.white,
          }}
        >

    <TouchableOpacity
            style={{
                alignItems:'center',
                justifyContent:'center',
                width:  widthScreen - 50,
                backgroundColor: COLORS.primary,
                borderRadius : 50,
                left: 20,
                ...FONTS.h4
            }}
            onPress = {() => navigation.navigate('cart')}
        >
            <Text 
                style={{
                }}
            >
              {
                `${foodItemsDataList.selectedCount} selected`
              }
            </Text>
        </TouchableOpacity>

        </View>
      </View>) : <Text></Text>}
    </View>
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
    marginTop: 16,
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
      {id: 3, val: 'Sub Cat 3', qty:0},
      {id: 300, val: 'Sub Cat 3', qty:0},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    subcategory: [
      {id: 4, val: 'Sub Cat 4', qty:0},
      {id: 5, val: 'Sub Cat 5', qty:0},
      {id: 41, val: 'Sub Cat 42', qty:0},
      {id: 52, val: 'Sub Cat 52', qty:0},
      {id: 42, val: 'Sub Cat 43', qty:0},
      {id: 592, val: 'Sub Cat 54', qty:0},
    ],
  },
  

];
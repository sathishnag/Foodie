import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SIZES, COLORS, FONTS, constants, icons } from "../constants";
import CategoryCard from "../components/CategoryCard";
import Icon from 'react-native-vector-icons/FontAwesome'
const Home = ({navigation}) => {
    const ui_array = [
        {id: 0},
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
      ];

    function renderDeliverTo() {
        return (
            <View 
                style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding, flexDirection:'row'}}>
                <View>
                <Text style={{
                    color: COLORS.primary,
                    ...FONTS.body4
                }}>
                    DELIVER TO
                </Text>
                </View>
            <View>
            <TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Text numberOfLines={1} style={{ width:260, fontFamily: "Roboto-Bold", fontSize: 12,  marginLeft:8, lineHeight: 21 }}>
                            PLOT NUMBER 54 CHINNMAL NAGAR
                        </Text>
                    </View>
                    <View>
                        <Text>
                            <Icon name="angle-down" size={20}></Icon>
                        </Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

    function rederSearch () {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal : SIZES.padding,
                    marginHorizontal : SIZES.base,
                    marginTop: SIZES.base,
                    paddingHorizontal : SIZES.radius,
                    borderRadius : SIZES.radius,
                    backgroundColor : COLORS.lightGray2
                }}>
                    <Text>
                         <Icon name="search" size={15}></Icon>
                    </Text>
                    <TextInput 
                    style={{flex:1,
                            marginLeft: SIZES.radius,
                            ...FONTS.body3
                    }}
                    placeholder="Search food">
                    </TextInput>

            </View>
        )
        }
        return(<View 
                style={{
                    flex:1,
                    marginHorizontal : SIZES.base
                    }}>
            {rederSearch()}
            {renderDeliverTo()}
            <View style={{paddingHorizontal : SIZES.base,flex:1}}>
            <FlatList
          data={ui_array}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <CategoryCard
                key={item.id}
                bgColour="#F00"
                borderColour="#0F0"
                title="Teste"
                onPress={() => navigation.navigate('Hotel List')}
              />
            );
          }}
        />
            </View>
         </View>)
}
export default Home;
import React from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import { GluestackUIProvider } from "@gluestack-ui/themed-native-base";
import CustomTextInput from "../components/CustomTextInput";
import Toast from "react-native-toast-message";
import CustomButton from "../components/CustomButton" ;
import Delete from "../components/delete";


class ListScreen extends React.Component {
  constructor(inProps) {
  super(inProps);
  this.state = {
  listData: [],
  };
}

componentDidMount() {
  // Block hardware back button on Android.
  BackHandler.addEventListener("hardwareBackPress", () => true);

  // Get list of restaurants.
  this.loadRestaurants();
}

componentWillUnmount() {
  BackHandler.removeEventListener("hardwareBackPress");
}

loadRestaurants = async () => {
  try {
  const restaurants = await AsyncStorage.getItem("restaurants");
  const listData = restaurants ? JSON.parse(restaurants) : [];
  this.setState({ restaurantList: listData });
  } catch (error) {
  console.error("Failed to load restaurants:", error);
  }
};

deleteRestaurant = async (item) => {
  try {
  const restaurants = await AsyncStorage.getItem("restaurants");
  let listData = restaurants ? JSON.parse(restaurants) : [];
  listData = listData.filter((restaurant) => restaurant.key !== item.key);
  this.setState({ restaurantList: listData });

  Toast.show({
  type: 'error', // or 'success', 'info', etc.
  position: 'bottom',
  text1: 'Restaurant deleted',
  visibilityTime: 2000,
});

  } catch (error) {
  console.error("Failed to delete restaurant:", error);
  }
};
render() {
  return (
    <GluestackUIProvider>
    <View style={styles.listScreenContainer}>
    <CustomButton
        text="Add Restaurant"
        width="94%"
        onPress={() => this.props.navigation.navigate("AddScreen")}
    />
    <FlatList
    style={styles.restaurantList}
    data={this.state.restaurantList}
    keyExtractor={(item) => item.key}
    renderItem={({ item }) => (
        <View style={styles.restaurantContainer}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.cuisine}>Cuisine : {item.cuisine}</Text>
            <Text style={styles.adressdesc}>Adresse : {item.address}</Text>
            <Text style={styles.adressdesc}>Phone : {item.phone}</Text>
            <Text style={styles.adressdesc}>Dilevry : {item.delivery}</Text>
            <Text style={styles.restaurantRating}>Rating: {item.rating} stars</Text>
            <Delete
                text="Delete"
                onPress={() =>
                    Alert.alert(
                        "Please confirm",
                        "Are you sure you want to delete this restaurant?",
                        [
                            { text: "Yes", onPress: () => this.deleteRestaurant(item) },
                            { text: "No" },
              
                        ],
                        { cancelable: true }
                    )
                }
            />
        </View>
    )}
/>
</View>
</GluestackUIProvider>
  );
}
}

class AddScreen extends React.Component {
  constructor(inProps) {
  super(inProps);
  this.state = {
  name: "",
  cuisine: "",
  price: "",
  rating: "",
  phone: "",
  address: "",
  website: "",
  delivery: "",
  key: `r_${new Date().getTime()}_${Math.random()}`,
  };
}

saveRestaurant = async () => {
  const { name, cuisine, price, rating, phone, address, website, delivery } = this.state;
  
  if ((!name) || (!cuisine) || (!price) || (!rating)  || (!phone)  || (!address)  || (!website) ||  (!delivery)) {
  Alert.alert("Error", "Please fill all fields");
  }
  else {

    try {
    

      // Get the existing restaurants list from AsyncStorage
      const restaurants = await AsyncStorage.getItem("restaurants");

      // Parse the data if it exists, else use an empty array
      const restaurantList = restaurants ? JSON.parse(restaurants) : [];

      // Add the new restaurant to the list
      restaurantList.push(this.state);

      // Save the updated list back to AsyncStorage

      await AsyncStorage.setItem("restaurants", JSON.stringify(restaurantList));

      // Show success toast message
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Restaurant added successfully!",
        visibilityTime: 2000,
      });

      // Navigate to the ListScreen after saving the restaurant
      this.props.navigation.navigate("ListScreen");
    } catch (error) {
      console.error("Failed to save restaurant:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Failed to save restaurant!",
        visibilityTime: 2000,
      });
    }
  }
  }
render() {
  return (
      <ScrollView style={styles.addScreenContainer}>
          <View style={styles.addScreenInnerContainer}>
              <View style={styles.addScreenFormContainer}>
                  <CustomTextInput
                      label="Name"
                      maxLength={20}
                      stateHolder={this}
                      stateFieldName="name"
                      onChangeText={(text) => this.setState({ name: text })} 
                      value={this.state.name}
                  />
                  <Text style={styles.fieldLabel}>Cuisine</Text>
                  <View style={styles.pickerContainer}>
                      <Picker
                          style={styles.picker}
                          selectedValue={this.state.cuisine}
                          onValueChange={(itemValue) => this.setState({ cuisine: itemValue })}
                      >
                  <Picker.Item label="" value="" />
                  <Picker.Item label="Algerian" value="Algerian" />
                  <Picker.Item label="American" value="American" />
                  <Picker.Item label="Other" value="Other" />

                  </Picker>
                  </View>
                  <Text style={styles.fieldLabel}>Price</Text>
<View style={styles.pickerContainer}>
    <Picker
        style={styles.picker}
        selectedValue={this.state.price}
        onValueChange={(itemValue) => this.setState({ price: itemValue })}>
        <Picker.Item label="" value="" />
        <Picker.Item label="$1" value="1" />
        <Picker.Item label="$2" value="2" />
        <Picker.Item label="$3" value="3" />
        <Picker.Item label="$4" value="4" />
        <Picker.Item label="$5" value="5" />
    </Picker>
</View>

<Text style={styles.fieldLabel}>Rating</Text>
<View style={styles.pickerContainer}>
    <Picker
        style={styles.picker}
        selectedValue={this.state.rating}
        onValueChange={(itemValue) => this.setState({ rating: itemValue })}>
        <Picker.Item label="" value="" />
        <Picker.Item label="★" value="1" />
        <Picker.Item label="★★" value="2" />
        <Picker.Item label="★★★" value="3" />
        <Picker.Item label="★★★★" value="4" />
        <Picker.Item label="★★★★★" value="5" />
    </Picker>
</View>
<CustomTextInput
label="Phone Number"
maxLength={20}
stateHolder={this}
stateFieldName="phone"
onChangeText={(text) => this.setState({ phone: text })} 
value={this.state.phone} 
/>
<CustomTextInput
label="Address"
maxLength={20}
stateHolder={this}
stateFieldName="address"
onChangeText={(text) => this.setState({ address: text })}
value={this.state.address}
/>
<CustomTextInput
label="Web Site"
maxLength={20}
stateHolder={this}
stateFieldName="webSite"
onChangeText={(text) => this.setState({ website: text })}
value={this.state.website}
/>
<Text style={styles.fieldLabel}>Delivery?</Text>
<View style={styles.pickerContainer}>  
    <Picker  
    style={styles.picker}  
    selectedValue={this.state.delivery}  
    onValueChange={(itemValue) => this.setState({ delivery: itemValue })}  
    >  
    <Picker.Item label="" value="" />  
    <Picker.Item label="Yes" value="Yes" />  
    <Picker.Item label="No" value="No" />  
    </Picker>  
</View>  
</View>  

<View style={styles.addScreenButtonsContainer}>  
    <CustomButton  
    text="Cancel"  
    width="44%"  
    onPress={() => this.props.navigation.navigate("ListScreen")}  
    />  
    <CustomButton  
    text="Save"  
    width="44%"  
    onPress={this.saveRestaurant}  
    />  
    </View>  
</View>  
</ScrollView>  
  );
}
}

const Stack = createStackNavigator();

const RestaurantsScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="ListScreen"
        >
            <Stack.Screen name="ListScreen" component={ListScreen} />
            <Stack.Screen name="AddScreen" component={AddScreen} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
  listScreenContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  restaurantList: {
    marginTop: 10,
  },
  restaurantContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cuisine: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  }, 
  adressdesc: {
    fontSize: 12,
    marginBottom: 5,
  },
  restaurantRating: {
    fontSize: 11,
    marginBottom: 5,
  },
  addScreenContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  addScreenInnerContainer: {
    padding: 15,
  },
  addScreenFormContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  addScreenButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});


export default RestaurantsScreen;
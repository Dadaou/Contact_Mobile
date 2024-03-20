import React from "react";
import { View, ScrollView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Appbar, Badge, Drawer, Text } from "react-native-paper";

const First = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title="First Page" />
      </Appbar.Header>
      <Text>First Page</Text>
    </View>
  );
};


const DrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="First Page"
        right = {() => <Text variant="labelLarge">44</Text>}
        onPress={() => navigation.navigate("First")
        }
      />
      <DrawerItem
        label="Second Page"
        onPress={() => navigation.navigate("Second")}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <DrawerNavigator.Screen name="First" component={First} />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
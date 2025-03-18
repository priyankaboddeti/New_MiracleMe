import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


import { normalize } from "./normalize";
import colors from "./colors";

const AllPageHeader = (props) => {
  const { MenuIcon, MenuLabel } = props;
  const navigationed = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ImageBackground
        style={styles.Topcard}
        source={require("../assets/images/profileBackgroundImage.png")}
      >
        <TouchableOpacity
          onPress={() => {
            MenuIcon == "chevron-left"
              ? navigationed.goBack()
              : navigationed.openDrawer();
          }}
          style={styles.UpperLeftIcon}
        >
          <View>
            {MenuIcon == "chevron-left" ? (
              <FontAwesome5
                name={MenuIcon}
                size={22}
                color={colors.whiteClr}
              />
            ) : (
              <MaterialIcons
                name={MenuIcon}
                size={30}
                color={colors.whiteClr}
              />
            )}
          </View>
          <Text style={styles.LeftTopText}>{MenuLabel}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default AllPageHeader;

const styles = StyleSheet.create({
  Topcard: {
    flex: 3,
    marginBottom: -120,
  },
  UpperLeftIcon: {
    marginTop: 30,
    flexDirection: "row",
    marginLeft: 25,
    alignItems: "center",
  },
  LeftTopText: {
    fontSize: normalize(18),
    color: colors.whiteClr,
    marginLeft: 15,
    marginTop: 15,
    fontFamily: "Montserrat_600SemiBold",
  },
});

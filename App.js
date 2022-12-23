import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const TEXT = "Open up App.js to start working on your app✅";
const ARR = TEXT.split(" ");

export default function App() {
  const ref_arr = React.useRef(Array.from({ length: ARR.length }, () => new Animated.Value(0))).current;

  React.useEffect(() => {
    const timer = setInterval(() => {
      const animations = ref_arr.map((item, index) => {
        return Animated.timing(item, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        });
      });
      Animated.stagger(100, animations).start(() => {
        setTimeout(() => {
          const animations2 = ref_arr.map((item, index) => {
            return Animated.timing(item, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            });
          });
          Animated.stagger(100, animations2.reverse()).start()
        }, 1000);
      });
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: wp(80) }}>
        {ARR.map((item, index) => (
          <Animated.Text key={index} style={{ fontSize: hp(4), fontWeight: "bold", opacity: ref_arr[index] }}>
            {item} {index < ARR.length ? " " : ""}
          </Animated.Text>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

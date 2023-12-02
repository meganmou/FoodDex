import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";
import { router, Link, useNavigation } from "expo-router";

export default function PassportPage() {
  // hide header bar
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Passport</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <Link
          href={{
            pathname: "/messages/sample",
            params: {
              user: "Alan",
            },
          }}
        >
          Go to sample message for Alan
        </Link>
        <Link
          href={{
            pathname: "/messages/sample",
            params: {
              user: "James",
            },
          }}
        >
          Go to sample message for James
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "pink",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
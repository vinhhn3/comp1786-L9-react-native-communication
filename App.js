import axios from "axios";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ListItem from "./ListItem";

import React from "react";

const App = () => {
  const [data, setData] = useState([]);

  const handleGetRequest = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: "New Item",
          body: "This is a new item created using a POST request.",
          userId: 1,
        }
      );
      setData([...data, response.data]);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGetRequest} style={styles.button}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePostRequest} style={styles.button}>
        <Text style={styles.buttonText}>Create New Item</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;

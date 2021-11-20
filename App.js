import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import Slider from "@react-native-community/slider";
import Clipboard from "expo-clipboard";

import styles from "./src/styles";
import img from "./src/assets/logo.png";

let charset =
  "0123456789abcdefghijklmnopqrstuvwxyz#!$%(&*)[-_={+@]<?}>/ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function App() {
  const [password, setPassword] = useState("");
  const [size, setSize] = useState(13);

  function generatePass() {
    let pass = "";
    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(pass);
  }

  function copyPass() {
    Clipboard.setString(password);
    alert("Senha copiada com Sucesso!");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image source={img} style={styles.logo} />
      <Text style={styles.title}> {size} Caracteres</Text>
      <View style={styles.area}>
        <Slider
          style={styles.slider}
          minimumValue={4}
          maximumValue={20}
          minimumTrackTintColor="#6520BA"
          maximumTrackTintColor="#8C8C8C"
          value={size}
          onValueChange={(valor) => setSize(valor.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      {password !== "" && (
        <View style={styles.area}>
          <Text style={styles.password} onLongPress={copyPass}>
            {password}
          </Text>
        </View>
      )}
    </View>
  );
}

import React from 'react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View, 
  TouchableOpacity,
} from 'react-native';
// import { databse } from './firebasefile';
import database from './firebasefile';
import { getDatabase, ref, get, set, update } from 'firebase/database';
// import { getDatabase } from 'firebase/database';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks, 
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

import { Appbar } from 'react-native-paper';
// import app from './firebasefile';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function HomeScreen({navigation}) {
      // console.log(database)
      const [loading,setLoading] = useState(false)
      const [trainnumber, setTrainNumber] = useState("");
      const [trainname, setTrainName] = useState("");
      const [trainnamehindi,setTrainNameHindi] = useState("");
      const [traintimein, setTrainTimeIn] = useState("");
      const [traintimeout, setTrainTmeOut] = useState("");
      const [trainsrc, setTrainsrc] = useState("");
      const [trainsrchi,setTrainsrchi] = useState("");
      const [traindst, setTraindst] = useState("");
      const [traindsthi,setTraindsthi] = useState("");
      const [trainvia, setTrainVia] = useState("");
      const [trainviahi,setTrainViahi] = useState("");
      const [conversion, setConversion] = useState("");
      const [text, setText] = useState('');
      var via = [];
      var viastring = "";
      const mangaltodev ={
        "अ": "द",
      "आ": "ध",
      "इ": "ड़",
      "ई": "ढ़",
      "उ": "र",
      "ऊ": "त",
      "ऋ": "क",
      "ए": "य",
      "ऐ": "म",
      "ओ": "न",
      "औ": "व",
      "क": "क",
      "ख": "ख",
      "ग": "ग",
      "घ": "घ",
      "ङ": "ङ",
      "च": "च",
      "छ": "छ",
      "ज": "ज",
      "झ": "झ",
      "ञ": "ञ",
      "ट": "ट",
      "ठ": "ठ",
      "ड": "ड",
      "ढ": "ढ",
      "ण": "ण",
      "त": "त",
      "थ": "थ",
      "द": "द",
      "ध": "ध",
      "न": "न",
      "प": "प",
      "फ": "फ",
      "ब": "ब",
      "भ": "भ",
      "म": "म",
      "य": "य",
      "र": "र",
      "ल": "ल",
      "व": "व",
      "श": "श",
      "ष": "ष",
      "स": "स",
      "ह": "ह",
      "क्ष": "क्ष",
      "त्र": "त्र",
      "ज्ञ": "ज्ञ",
      "श्र": "श्र",
      "श्री": "श्री"
      }
      const hindiToKrutiDevMap = {
        'क': 'q', 'ख': 'Q', 'ग': 'w', 'घ': 'W', 'ङ': 'e', 'च': 'r', 'छ': 'R', 'ज': 't', 'झ': 'T', 'ञ': 'y',
        'ट': 'u', 'ठ': 'U', 'ड': 'i', 'ढ': 'I', 'ण': 'o', 'त': 'p', 'थ': '[', 'द': ']', 'ध': 'a', 'न': 's',
        'प': 'd', 'फ': 'f', 'ब': 'g', 'भ': 'h', 'म': 'j', 'य': 'k', 'र': 'l', 'ल': ';', 'व': "'", 'श': 'z',
        'ष': 'x', 'स': 'c', 'ह': 'v', 'क्ष': 'b', 'त्र': 'n', 'ज्ञ': 'm',
        'अ': 'Q', 'आ': 'W', 'इ': 'E', 'ई': 'R', 'उ': 'T', 'ऊ': 'Y', 'ऋ': 'U', 'ए': 'I', 'ऐ': 'O', 'ओ': 'P',
        'औ': '{', 'अं': 'A', 'अः': 'S',
        'ा': 'q', 'ि': 'w', 'ी': 'e', 'ु': 'r', 'ू': 't', 'ृ': 'y', 'े': 'u', 'ै': 'i', 'ो': 'o', 'ौ': 'p',
        'ं': 'a', 'ः': 's', 'ँ': 'd', 'ॅ': 'f', '्': 'g', '।': 'h', '०': 'z', '१': 'x', '२': 'c', '३': 'v',
        '४': 'b', '५': 'n', '६': 'm', '७': ',', '८': '.', '९': '/',"न्" : "U"
      };
    
      const convertToHinglish = async (text) => {
    
        try {
          const response = await axios.post(
            'https://inputtools.google.com/request?text=' + encodeURIComponent(text) + '&itc=hi-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test',
            []
          );
          // console.log(response.data)
          if (response.status === 200 && response.data && response.data[1] && response.data[1][0] && response.data[1][0][1]) {
            const hinglishText = response.data[1][0][1];
            setConversion(hinglishText)
            // console.log(hinglishText)
            return hinglishText;
          }
        } catch (error) {
          console.error('Error converting to Hinglish:', error);
        }
    
        return '';
      };
      const convertHindiToKrutiDev = (hindiText) => {
        let krutiDevText = '';
        for (let i = 0; i < hindiText.length; i++) {
          const char = hindiText[i];
          const krutiDevChar = hindiToKrutiDevMap[char] || char;
          krutiDevText += krutiDevChar;
        }
        return krutiDevText;
      };
      const convertHindiToKrutiDevnew = (hindiText) => {
        let krutiDevText = '';
        for (let i = 0; i < hindiText.length; i++) {
          const char = hindiText[i];
          const krutiDevChar = devconversion[char] || char;
          krutiDevText += krutiDevChar;
        }
        return krutiDevText;
      };
      const devconversion ={
        "अ": "v",
        "आ": "vk",
        "इ": "b",
        "ई": "bZ",
        "उ": "m",
        "ऊ": "Å",
        "ऋ": "_",
        "ऌ": "ऌ",
        "ऍ": "ऍ",
        "ऎ": "ऎ",
        "ए": ",",
        "ऐ": ",s",
        "ऑ": "v‚",
        "ऒ": "ऒ",
        "ओ": "vks",
        "औ": "vkS",
        "ा": "k",
        "ि": "f",
        "ी": "h",
        "ु": "q",
        "ू": "w",
        "ृ": "`",
        "ॄ": "ॄ",
        "ॢ": "ॢ",
        "ॣ": "ॣ",
        "ॅ": "W",
        "े": "s",
        "ै": "S",
        "ॉ": "‚",
        "ॊ": "ॊ",
        "ो": "ks",
        "ौ": "kS",
        "ं": "a",
        "ः": "%",
        "ॐ": "ॐ",
        "क": "d",
        "ख": "[k",
        "ग": "x",
        "घ": "?k",
        "ङ": "³",
        "च": "p",
        "छ": "N",
        "ज": "t",
        "झ": ">",
        "ञ": "¥",
        "ट": "V",
        "ठ": "B",
        "ड": "M",
        "ढ": "<",
        "ण": ".k",
        "त": "r",
        "थ": "Fk",
        "द": "n",
        "ध": "/k",
        "न": "u",
        "प": "i",
        "फ": "Q",
        "ब": "c",
        "भ": "Hk",
        "म": "e",
        "य": ";",
        "र": "j",
        "ल": "y",
        "व": "o",
        "श": "k",
        "ष": "\"k",
        "स": "l",
        "ह": "g",
        "क्ष": "{k",
        "त्र": "=",
        "ज्ञ": "K",
        "क्":"D", "ख्":"[",
        "ग्":"X",
        "घ्":"?",
        "च्":"P",
        "छ्":"N~",
        "ज्":"T", "झ्":"÷", "ट्":"V~", "ठ्":"B~", "ड्":"M~", "ढ्":"<~", "ण्":".", "त्":"R", "थ्":"F", "द्":"n~", "ध्":"/", "न्":"U", "प्":"I", "ब्":"C", "भ्":"H", "म्":"E", "य्":"¸", "र्":"z", "ल्":"ZY", "व्":"O", "श्":"'", "ष्":"\"" , "स्":"L", "क्ष्":"{", "त्र्":"R", "ज्ञ्":"ZK~", 
      }
    const onlymatras = {
      
         "ा": "k",
        "ि": "f",
        "ी": "h",
        "ु": "q",
        "ू": "w",
        "ृ": "`",
        "ॄ": "ॄ",
        "ॢ": "ॢ",
        "ॣ": "ॣ",
        "ॅ": "W",
        "े": "s",
        "ै": "S",
        "ॉ": "‚",
        "ॊ": "ॊ",
        "ो": "ks",
        "ौ": "kS",
        "ं": "a",
        "ः": "%",
    }
    // const SwapMatras = (characters)=>{
      
    //   return characters;
    // }
    const SwapMatras=(characters)=>{
      for(let i=0;i<characters.length;i++){
        if(i!=characters.length-1){
        // console.log(i+":"+characters[i]+":"+characters.length)
        if(characters[i]=="ि"||characters[i]=="ी"){
          var newposition = characters[i-1]
          characters[i-1] = characters[i]
          // console.log(newposition)
          // characters[i-1] = characters[i]
          characters[i] = newposition;
          // console.log(characters)
    
        }
      }
        if(characters[i]=="्"){
          var newcharacter = characters[i-1]+characters[i]
          characters[i-1] = newcharacter;
          characters.splice(i, 1);
          // characters
          // console.log(characters)
        }
    
      }
      return characters;
    }
    const ConvertToDEV10=(texttoconvert)=>{
      var characterssrc = [...texttoconvert[0]];
                  characterssrc = SwapMatras(characterssrc)
                  // conso/le.l
                  // console.log(characterssrc)
                  const text = convertHindiToKrutiDevnew(characterssrc)
    
                  // console.log(text)
                return text;
    }
      const getDataFromEditText = async () => {
        setLoading(true)
        if (trainnumber != "") {
          if (trainname != "") {
            const trainnamehindiconvert = await convertToHinglish(trainname);
            // const mangalText = "मंगल";
            const mainstring = trainnamehindiconvert[0].split(" ")
            const krutiDevText = convertHindiToKrutiDev(trainnamehindiconvert[0]);
            var characters = [...trainnamehindiconvert[0]];
            characters = SwapMatras(characters)
            // console.log(characters)
            const text = await convertHindiToKrutiDevnew(characters)
            setTrainNameHindi(text)
            // console.log(text)
            // setTrainNumberHindi(convertedtrainnname);
            if (traintimein != "") {
              if (traintimeout != "") {
                if (trainsrc != "") {
                  const trainsrchiconvert = await convertToHinglish(trainsrc)
                  const srchi = await ConvertToDEV10(trainsrchiconvert)
                  setTrainsrchi(srchi)
                  // console.log(srchi)
                  // setTrainsrchi(trainsourehindi)
                  if (traindst != "") {
                    const traindsthiconvert = await convertToHinglish(traindst)
                    const dsthi = await ConvertToDEV10(traindsthiconvert)
                    setTraindsthi(dsthi);
                    // setTraindsthi(traindsthindi)
                    if (trainvia != "") {
                      const englistvialist = trainvia.split(",");
                      console.log(englistvialist)
                      for(let j=0;j<englistvialist.length;j++){
                        const trainviahi = await convertToHinglish(englistvialist[j])
                        // if(trainviahi[j]!=undefined){
                        // console.log(trainviahi[j])
                        const viaindev10 = await ConvertToDEV10(trainviahi)
                        if(j!=0){
                        viastring = viastring +"]" +viaindev10
                      }
                      else{
                        viastring = viaindev10
                      }
                        // console.log(viaindev10)
                        via.push(viaindev10)
                      // }
    
                      }
                      // console.log(viastring)
                      setTrainViahi(viastring)
                      // const trainviadev = ConvertToDEV10(trainviahi)
                      // console.log(trainviahi)
                      // setTrainViahi(trainviahindi)
                      console.log(trainnamehindi+"/"+trainsrchi)
                      await set(ref(database, 'TrainData/' + trainnumber), {
                        "Train Name": trainname,
                        "Train Name In Hindi": trainnamehindi,
                        "Source": trainsrc,
                        "Source Hindi": trainsrchi,
                        "Destination": traindst,
                        "Destination Hindi": traindsthi,
                        "Time": traintimein,
                        "TimeOut": traintimeout,
                        "TravellingVia": trainvia,
                        "TravellingViaHindi": trainviahi
    
                      }).then(() => {
                        Alert.alert("Added", "Train Details Added",
                        [
                            {text: 'DONE', onPress: () => setLoading(false)},
                          ],
                          { 
                            cancelable: false
                          });
    
                      });
                      // console.log(trainnumber+"/"+trainname+"/"+traintimein+"/"+traintimeout+"/"+trainsrc+"/"+traindst+"/"+trainvia);
                    } else {
                      setLoading(false)
                      Alert.alert("Alert", "Please Enter Train Via Routes")
                    }
    
                  } else {
                    setLoading(false)
                    Alert.alert("Alert", "Please Enter Train Destination")
                  }
                } else {
                  setLoading(false)
                  Alert.alert("Alert", "Please Enter Train Origin Source")
                }
              } else {
                setLoading(false)
                Alert.alert("Alert", "Please Enter Train Time Out from alwar junction")
              }
            } else {
              setLoading(false)
              Alert.alert("Alert", "Please Enter Train Time In at alwar junction")
            }
          } else {
            setLoading(false)
            Alert.alert("Alert", "Please Enter Train Name")
          }
        } else {
          setLoading(false)
          Alert.alert("Alert", "Please Enter Train Number")
        }
      }
      const isDarkMode = useColorScheme() === 'dark';
    
      const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      };
      const RouteToNewPge=()=>{
    navigation.navigate("NewScreen")
      }
    
      return (
        <View style={styles.mainlayout}>
          <View style={styles.appbar}>
            <Text style={styles.appbartext}>Train Details</Text>
          </View> 
          {/* <View style={styles.overlay}> */}
             {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.overlay} />}
              {/* </View> */}
          <ScrollView>
            <View style={styles.layout}>
              <View style={styles.inputLayoutStyle}>
              
                <Text style={styles.text}>Enter Train Number</Text>
                <TextInput placeholder='eg:1234' keyboardType="numeric" value={trainnumber} onChangeText={setTrainNumber} style={styles.input}></TextInput>
                <Text style={styles.text}>Enter Train Name</Text>
                <TextInput placeholder='eg: Train Express' value={trainname} onChangeText={setTrainName} style={styles.input}></TextInput>
                <Text style={styles.text}>Enter Train Time In</Text>
                <TextInput placeholder='eg:12:00' value={traintimein} onChangeText={setTrainTimeIn} style={styles.input}></TextInput>
                <Text style={styles.text}>Enter Train Time Out</Text>
                <TextInput placeholder='eg:12:00' value={traintimeout} onChangeText={setTrainTmeOut} style={styles.input}></TextInput>
                <Text style={styles.text}>Enter Train Source</Text>
                <TextInput placeholder='eg:Source' value={trainsrc} onChangeText={setTrainsrc} style={styles.input}></TextInput>
                <Text style={styles.text}>Enter Train Destination</Text>
                <TextInput placeholder='eg:Destination' value={traindst} onChangeText={setTraindst} style={styles.input}></TextInput>
                <Text style={styles.text}>Enter Train Via</Text>
                <TextInput placeholder='eg:a,b,c' value={trainvia} onChangeText={setTrainVia} style={styles.input}></TextInput>
                <View style={styles.buttonlayput}>
                  <TouchableOpacity style={styles.buttonstyle} onPress={() => getDataFromEditText()} >
                    <Text style={styles.buttontext}>Add Train</Text>
                  </TouchableOpacity>
                  <Text>
                    <TouchableOpacity style={styles.buttonstylerouter}>
                      <Text style={styles.buttontext} onPress={()=>RouteToNewPge()}>RouteToNewPage</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
    
    
    
      );
    }
    
    const styles = StyleSheet.create({
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttontext: {
        // margin:10,
        color: "#fff",
        fontSize: 30,
      },
      buttonstyle: {
        height: 50,
        width: '50%',
        backgroundColor: "#1176bc",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonstylerouter: {
        height: 50,
        width: '50%',
        backgroundColor: "#1176bc",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonlayput: {
        // height:50,
        margin: 15,
        alignItems: "center"
      },
      appbartext: {
        textAlign: "center",
        fontSize: 30,
        margin: 7,
        color: "#fff",
        // fontWeight:"400"
    
    
      },
      input: {
        marginLeft: 50,
        marginRight: 50,
        height: 40,
        borderWidth: 1,
        padding: 10,
      },
      appbar: {
        height: 50,
        backgroundColor: '#1176bc',
        textAlign: 'center',
        flexDirection: 'column'
      },
      text: {
        fontSize: 20,
        color: 'black',
        // marginTop:200,
        marginLeft: 40,
        marginRight: 50,
        height: 40,
        padding: 10,
      },
      layout: {
        flex: 2,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      mainlayout: {
        flex: 1,
      },
      inputLayoutStyle: {
        margin: 10,
        // marginTop:10,
        width: '90%',
        // height:"100%",
        // elevation:0.5,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'grey'
    
      }
    
    
    });
    
    export default HomeScreen;
    
import React, { useContext } from 'react';
import { View, Text, Button, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { STATUS_GREEN, STATUS_YELLOW, STATUS_RED, STATUS_NONE, parseDate } from './utils';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { PhotoContext } from './PhotoHistoryProvider';
import * as Notifications from 'expo-notifications';


const HomeScreen = ({navigation}) => {
    // const [photoHistory, setPhotoHistory] = useState([
    //     {id: '1', date: '13.11.2024 at 12:31', status: STATUS_NONE, photoUri: 'https://via.placeholder.com/300'},
    //     {id: '2', date: '12.11.2024 at 15:03', status: STATUS_GREEN, photoUri: 'https://via.placeholder.com/300'},
    //     {id: '3', date: '11.11.2024 at 07:53', status: STATUS_YELLOW, photoUri: 'https://via.placeholder.com/300'},
    //     {id: '4', date: '09.11.2024 at 06:52', status: STATUS_RED, photoUri: 'https://via.placeholder.com/300'},
    // ]);
    const {photoHistory} = useContext(PhotoContext);
    const {addPhoto} = useContext(PhotoContext);
    const {updatePhoto} = useContext(PhotoContext);
    const [expandedItems, setExpandedItems] = useState({});
    const getAverageStatus = (photoHistory) => {
        let total = 0;
        let numberOfPhotos = photoHistory.length;
        for (let i = 0; i < photoHistory.length; i++) {
            if (photoHistory[i].status == STATUS_GREEN) {
                total += 1;
            } else if (photoHistory[i].status == STATUS_YELLOW) {
                total += 2;
            } else if (photoHistory[i].status == STATUS_RED) {
                total += 3;
            } else if(photoHistory[i].status == STATUS_NONE) {
                numberOfPhotos -= 1;
            }
        }
        if(numberOfPhotos == 0) {
            return STATUS_NONE;
        }
        const average = total / numberOfPhotos;
        if (average < 1.5) {
            return STATUS_GREEN;
        } else if (average < 2.5) {
            return STATUS_YELLOW;
        } else {
            return STATUS_RED;
        }
    }
    const handleDatePhotoButtonPress = (item) => {
        setExpandedItems((prevExpandedItems) => {
            const newExpandedItems = { ...prevExpandedItems };
            if (newExpandedItems[item.id]) {
                delete newExpandedItems[item.id];
            } else {
                newExpandedItems[item.id] = true;
            }
            return newExpandedItems;
        });
    };

    const scheduleNotification = async () => {
        const now = new Date();
        const nextDay = new Date(now);
        nextDay.setDate(now.getDate() + 1);
        nextDay.setHours(12);
        nextDay.setMinutes(0);
        nextDay.setSeconds(0);
        nextDay.setMilliseconds(0);
        const schedulingOptions = {
            time: nextDay.getTime(),
        };
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Take your daily photo!',
                body: "It's time to take your daily photo.",
            },
            trigger: schedulingOptions,
        });
    }
    // const handleTakeTodayPhotoButtonPress = () => {
        
    // }
    const handleTakeTodayPhotoButtonPress = async () => {
        // console.log("Take photo button pressed.");
        // Request camera permissions
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission Denied", "Camera permission is required to take photos.");
            return;
        }
        // const permissionResult2 = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // if (!permissionResult2.granted) {
        //     Alert.alert("Permission Denied", "Media library permission is required to take photos.");
        //     return;
        // }
        // console.log("Camera permission granted.");
        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.8,
        });
        // console.log("result after taking photo: ", result);
        if (!result.canceled) {
            try {
                // Save photo locally
                const localUri = result.assets[0].uri;
                const fileName = localUri.split('/').pop(); // Extract file name
                const newPath = `${FileSystem.documentDirectory}${fileName}`; // Save to app's local directory

                await FileSystem.moveAsync({
                    from: localUri,
                    to: newPath,
                });

                const now = new Date();
                const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}.${now.getFullYear()} at ${now
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

                const newId = (photoHistory.length + 1).toString();
                // setPhotoHistory((prevHistory) => [
                //     {
                //         id: newId, // Generate a new ID
                //         date: formattedDate,
                //         status: STATUS_NONE, // Initial status
                //         photoUri: newPath, // Path to the saved photo
                //     },
                //     ...prevHistory
                // ]);
                const newPhoto = {
                    id: newId,
                    date: formattedDate,
                    status: STATUS_NONE,
                    photoUri: newPath,
                };
                await addPhoto(newPhoto);
                setExpandedItems((prevExpandedItems) => {
                    const newExpandedItems = { ...prevExpandedItems };
                    newExpandedItems[newId] = true;
                    return newExpandedItems;
                });
                await scheduleNotification();
            } catch (error) {
                console.error("Error saving the photo:", error);
                Alert.alert("Error", "An error occurred while saving the photo.");
            }
        } else {
            console.log("Photo taking cancelled.");
        }
    };
    const renderDatePhoto = ({item}) => {
        return <View>
            <TouchableOpacity style={expandedItems[item.id] == true ? styles.listButtonClicked : styles.listButton} onPress={handleDatePhotoButtonPress.bind(null, item)}>
                <Text style={styles.dateButtonText}>{item.date}</Text>
                <View style = {{alignSelf: 'flex-end', marginLeft: 'auto', flexDirection: 'row'}}>
                    {item.status == STATUS_NONE && <Icon name = 'circle' size = {20} style = {styles.statusNoneCircle}/>}
                    {item.status == STATUS_GREEN && <Icon name = 'circle' size = {20} style = {styles.statusGreenCircle}/>}
                    {item.status == STATUS_YELLOW && <Icon name = 'circle' size = {20} style = {styles.statusYellowCircle}/>}
                    {item.status == STATUS_RED && <Icon name = 'circle' size = {20} style = {styles.statusRedCircle}/>}
                    <Icon name={expandedItems[item.id] == true ? 'chevron-up' : 'chevron-down'} size={20} style={styles.dropdownIcon} />
                </View>
            </TouchableOpacity>
            {expandedItems[item.id] && (
                <View style={styles.expandedArea}>
                    {/* <Text style={styles.name}>Name: John Doe</Text> */}
                    <Image source={{uri: item.photoUri}} style={styles.expandedPhoto} />
                    {item.status == STATUS_GREEN && <Text style={styles.photoStatusGreen}>You look quite happy in this photo!</Text>}
                    {item.status == STATUS_YELLOW && <Text style={styles.photoStatusYellow}>You don't look happy in this photo.</Text>}
                    {item.status == STATUS_RED && <Text style={styles.photoStatusRed}>You look sad in this photo.</Text>}
                    {item.status == STATUS_NONE && <Text style={styles.photoStatusNone}>Currently evaluating this photo.</Text>}
                </View>
            )}
        </View>
    }
    const canTakeTodaysPhoto = () => {
        // return true; // debug
        if (photoHistory.length === 0) {
            return true;
        }
        const latestPhoto = photoHistory[0];
        const now = new Date();
        const latestPhotoDate = parseDate(latestPhoto.date);
        const timeDiff = now - latestPhotoDate;
        if(timeDiff < 24 * 60 * 60 * 1000 - 1000 * 60) { // so it's 24 hours without 1 minute
            return false;
        } 
        return true;
    }
    return (
        <View style={styles.backgroundView}>
        <SafeAreaView style={styles.container}>
            
            {getAverageStatus(photoHistory) == STATUS_NONE ? <Text style={styles.title}>Welcome.</Text> : <Text style={styles.title}>Welcome back.</Text>}
            {getAverageStatus(photoHistory) == STATUS_GREEN && <Text style={styles.statusGreen}>Status: No signs of anxiety or depression.</Text>}
            {getAverageStatus(photoHistory) == STATUS_YELLOW && <Text style={styles.statusYellow}>Status: Mild signs of anxiety.</Text>}
            {getAverageStatus(photoHistory) == STATUS_RED && <Text style={styles.statusRed}>Status: Severe signs of anxiety and/or depression.</Text>}
            {canTakeTodaysPhoto() == true &&
            <TouchableOpacity style={styles.takePhotoButton} onPress={handleTakeTodayPhotoButtonPress}>
                <Text style={styles.buttonText}>Take today's photo now.</Text>
            </TouchableOpacity>
            }
            {canTakeTodaysPhoto() == false && 
            <TouchableOpacity style={styles.takePhotoButtonDeactivated}>
                <Text style={styles.buttonTextDeactivated}>Next photo tommorow at {parseDate(photoHistory[0].date).getHours()}:{parseDate(photoHistory[0].date).getMinutes()}</Text>
            </TouchableOpacity>
            }
            <FlatList
                data = {photoHistory}
                keyExtractor={(item) => item.id}
                renderItem={renderDatePhoto}
            />

        </SafeAreaView>
        </View>
    );
}


export default HomeScreen;
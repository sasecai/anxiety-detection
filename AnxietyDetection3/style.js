import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundView: {
        backgroundColor: '#ffffff', 
        flex: 1
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff', // White background for the entire screen
        marginHorizontal: 25, // Global horizontal margin for all content
        marginVertical: 80, // Global vertical margin for all content
    },
    searchBar: {
        height: 40,
        borderColor: '#007BFF', // A vibrant blue for the border
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#f0f0f0', // Light gray for the input area
    },
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc', // Light border between list items
        backgroundColor: '#ffffff', // White background for list items
        borderRadius: 5,
        marginBottom: 10,
        elevation: 2, // Adding slight elevation for a soft shadow effect
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000', // Black for main text for better contrast
    },
    details: {
        fontSize: 14,
        color: '#999999', // A medium gray for additional details
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    statusGreen: {
        fontSize: 18,
        color: '#05ad32',
        marginBottom: 20,
    },
    statusYellow: {
        fontSize: 18,
        color: '#ffae17',
        marginBottom: 20,
    },
    statusRed: {
        fontSize: 18,
        color: '#fc6f53',
        marginBottom: 20,
    },
    takePhotoButton: {
        backgroundColor: '#5400c9',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    takePhotoButtonDeactivated: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#5400c9',
        borderWidth: 2,
    },
    listButton: {
        backgroundColor: '#4ac3f7',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
    },
    listButtonClicked: {
        backgroundColor: '#4ac3f7',
        padding: 15,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        marginBottom: 0,
        flexDirection: 'row',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonTextDeactivated: {
        color: '#5400c9',
        fontWeight: 'bold',
        fontSize: 16,
    },
    dateButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
    },
    listContainer: {
        
    },
    dropdownIcon: {
        color: "#007BFF",
        marginLeft: 10
    },
    statusGreenCircle: {
        color: '#05ad32',
    },
    statusYellowCircle: {
        color: '#ffae17',
    },
    statusRedCircle: {
        color: '#fc6f53',
    },
    statusNoneCircle: {
        color: '#777777',
    },
    expandedArea: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        marginBottom: 10,
    },
    expandedPhoto: {
        width: 300, 
        height: 300, 
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    photoStatusGreen: {
        fontSize: 18,
        color: '#05ad32',
        alignSelf: 'center',
    },
    photoStatusYellow: {
        fontSize: 18,
        color: '#ffae17',
        alignSelf: 'center',
    },
    photoStatusRed: {
        fontSize: 18,
        color: '#fc6f53',
        alignSelf: 'center',
    },
    photoStatusNone: {
        fontSize: 18,
        color: '#777777',
        alignSelf: 'center',
    }
});

export default styles;
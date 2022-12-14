import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 10, alignItems: "center", backgroundColor: 'black', height: 10000 },
  pageTitle: { fontWeight: 'bold', fontSize: 30, color: 'orange' },
  header: { fontWeight: 'bold', fontSize: 18, color: 'black', flexShrink: 1 },
  text: { fontWeight: 'bold', fontSize: 14, color: 'black', flexShrink: 1 },
  errors: { fontWeight: 'bold', fontSize: 18, color: 'red' },
  input: { borderWidth: 1, borderColor: 'orange', borderRadius: 10, borderStyle: 'solid', textAlign: 'center', height: 30, backgroundColor: 'white', margin: 10},
  movieCard: { borderWidth: 1, padding: 10, margin: 5, borderRadius: 5, backgroundColor: "orange", display: 'flex', flexDirection: 'row', width: '90%', flexWrap: 'wrap' },
  detailsCard: { borderWidth: 1, padding: 10, margin: 5, borderRadius: 5, backgroundColor: "orange", width: '90%', flexWrap: 'wrap' },
  modalView: { width: "80%", height: '70%', margin: 5, backgroundColor: "black", borderColor: "orange", borderWidth: 1, borderRadius: 5, alignItems: "center", justifyContent: 'space-evenly' },
  buttonsContainer: {display: 'flex', flexDirection: 'row', justifyContent: 'center'},
  animationContainer: { justifyContent: 'space-evenly', alignItems: "center", display: 'flex', width: '70%', height: 200 }
});


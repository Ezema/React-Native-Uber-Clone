import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import * as ScreenOrientation from 'expo-screen-orientation'
import restaurants from './restaurantData.js'

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)  

function MenuItemDetailsScreen({navigation, route}){  
  const {menuObject} = route.params  
  return(
    <View style={styles.menuItemDetailsContainerView}>      
      <View style={styles.menuItemDetailsImageContainerView}>
      <Image style={styles.menuItemDetailsImage} source={menuObject.image}></Image>
      </View>
      <View style={styles.menuItemDetailsTextContainerView}>
        <Text style={styles.menuItemDetailsTitleText}>{menuObject.title}</Text>
        <Text style={styles.menuItemDetailsPriceText}>£{menuObject.price}</Text>
        <Text style={styles.menuItemDetailsDescriptionText}>{menuObject.description}</Text>
      </View>
    </View>
  )
}

const MenuItemCell = (props) => (
  <Cell {...props} onPress={props.action} style={styles.menuItemCell} cellContentView=
  {
    <View style={styles.menuItemCellContainer}>
      <View style={styles.menuItemCellLeftColumnContainer}>
        <Text style={styles.menuItemNameText}>{props.title}</Text>
        <Text style={styles.menuItemPriceText}>£{props.price}</Text>
        <Text style={styles.menuItemIngredientsText}>{props.description}</Text>
      </View>
      <View style={styles.menuItemCellRightColumnContainer}>        
        <Image style={styles.menuItemImage} source={props.itemImage}></Image>      
      </View>
    </View>
  }
  />
)
function MenuScreen({navigation, route}){
  const {arrayOfMenuSectionObjects} = route.params
  return(
    <View>      
      <ScrollView style={[styles.menuViewScrollView]}>
        <TableView style={styles.menuTableView}>
        {arrayOfMenuSectionObjects.map((menuSectionObject, menuSectionObjectIndex) => (
          <Section sectionTintColor={'#FFFF'} headerTextStyle={styles.menuItemSectionTitleText} style={styles.menuSection} roundedCorners={false} hideSurroundingSeparators={false} key={menuSectionObjectIndex} header={menuSectionObject.menuSectionTitle}>
            {menuSectionObject.menuSectionContent.map((menuObject,menuObjectIndex)=>(
              <MenuItemCell height='290px' backgroundColor='transparent' key={menuObjectIndex} title={menuObject.title} itemImage={menuObject.image} price={menuObject.price} description={menuObject.description} action={()=>navigation.navigate('Menu item details', { 'menuObject':menuObject })}/>              
            ))            
            }            
          </Section>
        ))
        }
        </TableView>
      </ScrollView>
    </View>
  )
}
const HomeScreenCell = (props) => (
  <Cell {...props} onPress={props.action} style={styles.homeScreenCell} cellContentView=
  {
    <View style={styles.homeScreenCellContainer}>      
      <Image style={styles.homeScreenCellImage} source={props.imgUri}/>      
      <View style={styles.homeScreenCellEtaTextContainer}>
        <Text style={styles.homeScreenCellEtaText}>{props.eta}</Text>
        <Text style={styles.homeScreenCellEtaText}>mins</Text>
      </View>
      <Text style={styles.homeScreenCellTitleText}>{props.title}</Text>
      <Text style={styles.homeScreenCellTaglineText}>{props.tagline}</Text>
    </View>
  }
  />
)
function Homescreen({navigation, route}){
  return(
    <ScrollView>
      <TableView>
      <Section /* header='que mira' */ hideSeparator='true' separatorTintColor='#ccc'>
      {
        restaurants.map((restaurantData,restaurantIndex)=>(
          <HomeScreenCell key={restaurantIndex} action={()=>navigation.navigate('Menu', { arrayOfMenuSectionObjects:restaurantData.menu, restaurantName:restaurantData.restaurantName, restaurantImage:restaurantData.restaurantImage})} backgroundColor='transparent' imgUri={restaurantData.restaurantImage} height='290px' eta={restaurantData.restaurantEta} title={restaurantData.restaurantName} tagline={restaurantData.restaurantTagline}></HomeScreenCell>          
        ))
      }
      </Section>
      </TableView>
    </ScrollView>
  )
}
export default function App() {
  const Stack = createStackNavigator()
  return (    
    <NavigationContainer>
      <StatusBar/>
      <Stack.Navigator>                
        <Stack.Screen name="Restaurants" component={Homescreen}/>
        <Stack.Screen name="Menu" component={MenuScreen} options={({ route }) => ({ title: route.params.restaurantName })}/>
        <Stack.Screen name="Menu item details" component={MenuItemDetailsScreen} options={({ route }) => ({ title: route.params.menuObject.title })}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuViewScrollView:{    
    height:'100%'
  },
  menuTableView:{
    backgroundColor:'violet'
  },
  menuSection:{    
  },
  homeScreenCell:{    
    padding:0,
    margin:0,
    display:'flex',
  },
  homeScreenCellContainer:{    
    marginBottom:15,    
    width:'100%',
    maxHeight:250,
    display:'flex',
    flex:1,
    alignItems:'flex-start',
    justifyContent:'flex-end',
    overflow:'hidden',
  },
  homeScreenCellEtaTextContainer:{
    position:'absolute',    
    borderRadius: 50,
    backgroundColor:'white',    
    alignSelf:'flex-end',

    alignItems:'center',
    justifyContent:'center',    
    
    paddingTop:'2%',
    paddingBottom:'2%',
    paddingLeft:'7%',
    paddingRight:'7%',
    bottom:'13%',
    right:'3%'
  },
  homeScreenCellEtaText:{
    fontSize:18,
    fontWeight:'bold',
  },
  homeScreenCellTitleText:{
    paddingTop:'2%',
    fontSize:25,
    fontWeight:'bold',
  },
  homeScreenCellTaglineText:{
    color:'grey',
    paddingTop:'1.5%',
  },
  homeScreenCellImageContainer:{
  },
  homeScreenCellImage: {        
    borderRadius:5,
    objectFit:'cover',
    maxWidth:'100%',
    maxHeight:'72%',
    alignSelf:'center',
  },
  menuItemSectionTitleText:{
    fontSize:30,
    color:'black',
    fontWeight:'bold',
    paddingBottom:10,
  },
  menuItemCell:{
    flex:1,
    padding:0,
    margin:0,    
    width:'100%',
    height:'100%'
  },
  menuItemCellContainer:{
    display:'flex',
    flex:1,
    width:'100%',
    maxheight:'100%',
    flexDirection:'row',
    justifyContent:'flex-start'    
  },
  menuItemCellLeftColumnContainer:{
    flex:1,
    paddingRight:5,
    maxHeight:170,    
  },
  menuItemCellRightColumnContainer:{
    flex:1,
    maxHeight:170,
  },
  menuItemNameText:{
    fontSize:22,
    fontWeight:'600',
    marginTop:5,
  },
  menuItemPriceText:{
    fontSize:16,
    fontWeight:'300',
    marginTop:5,
  },
  menuItemIngredientsText:{
    marginTop:5,
    color:'grey'
  },
  menuItemImage:{
    maxWidth:'100%',
    maxHeight:170,
    alignSelf:'center',
  },
  menuItemDetailsContainerView:{
    display:'flex',
    flex:1,
  },
  menuItemDetailsImageContainerView:{
    flex:1,
    display:'flex'
  },
  menuItemDetailsImage:{    
    flex:1,
    maxWidth:'100%',
    alignSelf:'center',
    justifySelf:'center',
  },
  menuItemDetailsTextContainerView:{    
    flex:1,
    marginLeft:15,
    marginRight:15
  },
  menuItemDetailsTitleText:{
    marginTop:10,
    fontSize:35,
    fontWeight:'bold'
  },
  menuItemDetailsPriceText:{
    fontWeight:'600',
    marginTop:2,
    fontSize:22,
  },
  menuItemDetailsDescriptionText:{
    color:'grey',
    fontWeight:'400',
    marginTop:10,
    fontSize:18,
  },
})


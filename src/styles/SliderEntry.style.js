import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    calContainer: {
        flex: 1,
        backgroundColor: '#c47c7b',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        justifyContent: 'center',
        alignItems: 'center'
    },
    calTextString:{
      fontWeight: 'bold'
    },
    calTextNumber:{
      fontSize:40,
      color:'white'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on ios; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    dataContainer: {
        justifyContent: 'center',
        //  justifyContent: 'space-between',
        paddingTop: 40 - entryBorderRadius,
        paddingBottom: 40- entryBorderRadius,
        //marginBottom:15,
        //paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        //flexDirection:"row"
    },
    dataItemContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight:10,
      paddingLeft:10
    },
    dataItemContainerTitle:{
      color: colors.gray,
      fontSize: 11,
      fontWeight: 'bold'
    },
    title: {
        color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    loadRest:{
      width:itemWidth,
      flex: 1,
      backgroundColor: colors.gray,
      borderTopLeftRadius: entryBorderRadius+10,
      borderTopRightRadius: entryBorderRadius+10,
      borderBottomLeftRadius: entryBorderRadius+10,
      borderBottomRightRadius: entryBorderRadius+10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loadRestIcon:{
      width:60,
      height:60
    },
    loadRestText:{
      fontSize:20,
      fontWeight: 'bold',
      color:'white',
      marginTop:15,
      textAlign:'center'
    }
});

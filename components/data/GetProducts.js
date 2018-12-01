import {AsyncStorage} from 'react-native';

const retrieveProducts = async ()  => {
    try{
        const cartArray = await AsyncStorage.getItem('@cart');
        if(cartArray !== null){
            // console.log("we have data");
            // return JSON.parse(cartArray);
            return cartArray;
        }
    } catch(err){
        // console.log(err);
        return null;
    }
    // console.log("we don't have data");
    return null;
};
export default retrieveProducts;
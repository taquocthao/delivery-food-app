import {AsyncStorage} from 'react-native';

const storingProducts = async (cartArray) => {
    await AsyncStorage.setItem('@cart', JSON.stringify(cartArray));
    // console.log("save success");
}

export default storingProducts;
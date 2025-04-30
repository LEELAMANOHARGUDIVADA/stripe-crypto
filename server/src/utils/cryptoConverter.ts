import axios from "axios";

const cryptoConverter = async(crypto: string):Promise<number | undefined> => {
    try {
        const cryptoPrice = await axios.get<{ [key: string]: { usd: number } }>(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        return cryptoPrice.data[crypto].usd;
    } catch (error) {
        console.log(error);
    }
}

export default cryptoConverter;
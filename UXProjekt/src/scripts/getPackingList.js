import { filterWeatherDataByTime } from '@/scripts/filterWeatherDataByTime.js';
import { useUserStore } from '@/stores/userStore';

export async function generatePackingList() {
    const store = useUserStore();
    const children = store.userChildren;

    try {
        const weatherObjects = await filterWeatherDataByTime();
        return createPackingList(weatherObjects);
    } catch (error) {
        console.error('Error fetching and transforming weather data:', error);
        return [];
    }
}

function createPackingList(weatherObjects) {
    let allClothes = [];
    weatherObjects.forEach(weatherObj => {
        let clothes = [];
        const temperature = weatherObj.temperature;
        const windSpeed = weatherObj.windSpeed;
        const rain = weatherObj.averagePrecipitation;

        if (temperature <= 5) {
            clothes.push("Mössa", "Halsduk", "Vinterjacka", "Vantar", "Kängor");
        } else if (temperature <= 15) {
            clothes.push("Keps", "Vårjacka", "Långbyxor", "Sneakers");
        } else {
            clothes.push("Keps", "Solglasögon", "T-shirt", "Shorts", "Sandaler");
        }

        if (rain > 0 && rain < 1) {
            clothes.push("Paraply");
        }
        else if (rain > 1 && rain < 5) {
            clothes.push("Regnjacka", "Regnbyxor", "Stövlar", "Paraply");
        }

        if (temperature > 0 && windSpeed >= 8) {
            clothes.push("Vindjacka", "Långbyxor");
        }

        allClothes = allClothes.concat(clothes);
    });

    return [{ clothes: allClothes }];

}


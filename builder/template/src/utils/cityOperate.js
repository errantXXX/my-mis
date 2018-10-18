export default function getCity(scope, cityList) {
	const regionName = [];
    const cityData = [];
    for (let i = 0; i < cityList.length; i += 1) {
        const regionNameTmp = {};
        const cityDataTemp = [];
            regionNameTmp.regionName = cityList[i].regionName;
        for (let j = 0; j < cityList[i].data.length; j += 1) {
            const cityListTmp = {};
            cityListTmp.cityCode = cityList[i].data[j].cityCode;
            cityListTmp.city = cityList[i].data[j].city;
            cityListTmp.regionId = i;
            cityData[cityList[i].data[j].cityCode] = cityListTmp;
            cityDataTemp.push(cityList[i].data[j].cityCode);
        }
        cityDataTemp.sort();
        regionNameTmp.cityListStr = cityDataTemp.join(',');
        regionName[i] = regionNameTmp;
    }

    const activityRegionName = [];
    let cityName = [];
    let regionLength = 0;
    scope.sort();
    if (scope.length === 0) {
        return ['all'];
    } else {
        if (scope.length > 1) {
            scope.forEach((i) => {
                const index = cityData[i];
                if (index) {
                    if (!activityRegionName[index.regionId]) {
                        activityRegionName[index.regionId] = [];
                    }
                    activityRegionName[index.regionId].push(i);
                }
            });
            for (let j = 0; j < activityRegionName.length; j += 1) {
                if (activityRegionName[j] !== undefined) {
                    if (activityRegionName[j].join(',') === regionName[j].cityListStr) {
                        cityName.push(regionName[j].cityListStr);
                        regionLength += 1;
                    } else {
                        activityRegionName[j].forEach((tmp) => {
                            cityName.push(`${cityData[tmp].cityCode}`);
                            const r = [];
                            for (let i = 0, l = cityName.length; i < l; i += 1) {
                                for (let j = i + 1; j < l; j += 1) {
                                    if (cityName[i] === cityName[j]) j = ++i;
                                }
                                r.push(cityName[i]);
                            }
                            cityName = r;
                        });
                    }
                }
            }
        } else if (scope.length === 1) {
            cityName.push(`${cityData[scope[0]].cityCode}`);
        }
        if (regionLength === regionName.length) {
            return ['all'];
        } else {
          	return cityName;
        }
    }
}

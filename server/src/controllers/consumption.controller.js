const generateDailyConsumption = (req, res) => {
    const generateCustomDistribution = (nMeans) => {
        let MIN = 0, MAX = 24;

        const randn_bm = (skew) => {
            let u = 0, v = 0;
            while(u === 0) u = Math.random() // Converting [0,1) to (0,1)
            while(v === 0) v = Math.random()
            let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
            
            num = num / 10.0 + 0.5 // Translate to 0 -> 1
            if (num > 1 || num < 0) 
              num = randn_bm(skew) // resample between 0 and 1 if out of range
            else {
              num = Math.pow(num, skew) // Skew
              num *= MAX - MIN // Stretch to fill range
              num += MIN // offset to min
            }

            return num
        }

        let buckets = new Array(24).fill(0);

        // Generate a random cummulative distribution of nMeans Gaussian
        for (let i = 0; i < 100000; i++) {
            // TODO: generate nMeans peaks
            buckets[Math.floor(randn_bm(3))] += 1;
            buckets[Math.floor(randn_bm(1))] += 1;
            buckets[Math.floor(randn_bm(0.25))] += 1;
        }

        // normalize
        let sum = buckets.reduce((a, b) => a + b, 0);
        buckets = buckets.map(x => x / sum);

        // enumerate the buckets
        let bucketsEnumerated = [];
        for (let i = 0; i < buckets.length; i++) {
            bucketsEnumerated.push([i, buckets[i]]);
        }

        return bucketsEnumerated;
    };

    const generateConsumptionDistribution = (baseDistribution) => {

        // add some random noise
        for (let i = 0; i < baseDistribution.length; i++) {
            baseDistribution[i][1] += Math.random() * 0.1 - 0.05;
        }

        return baseDistribution;
    };

    // User's consumption profile for a weekday (based on the average consumption in Germany (c) Statistisches Bundesamt)
    let weekdayBaseDistribution = [
        [0, 0.4],
        [1, 0.25],
        [2, 0.15],
        [3, 0.1],
        [4, 0.1],
        [5, 0.13],
        [6, 0.25],
        [7, 0.62],
        [8, 0.67],
        [9, 0.63],
        [10, 0.6],
        [11, 0.55],
        [12, 0.62],
        [13, 0.67],
        [14, 0.6],
        [15, 0.55],
        [16, 0.48],
        [17, 0.5],
        [18, 0.7],
        [19, 0.8],
        [20, 0.85],
        [21, 0.7],
        [22, 0.6],
        [23, 0.47],
    ]

    // User's consumption profile for a weekend (based on the average consumption in Germany (c) Statistisches Bundesamt)
    let weekendBaseDistribution = [
        [0, 0.5],
        [1, 0.3],
        [2, 0.25],
        [3, 0.1],
        [4, 0.1],
        [5, 0.13],
        [6, 0.2],
        [7, 0.25],
        [8, 0.3],
        [9, 0.5],
        [10, 0.7],
        [11, 0.82],
        [12, 0.99],
        [13, 0.84],
        [14, 0.71],
        [15, 0.6],
        [16, 0.48],
        [17, 0.5],
        [18, 0.7],
        [19, 0.8],
        [20, 0.85],
        [21, 0.7],
        [22, 0.6],
        [23, 0.47],
    ]

    res.status(200).send(generateConsumptionDistribution(weekendBaseDistribution));
}

export {
    // eslint-disable-next-line import/prefer-default-export
    generateDailyConsumption,
};
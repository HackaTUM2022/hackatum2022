const generateDailyConsumption = (req, res) => {
    const generateDistribution = (nMeans) => {
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

        // Generate a random cummulative distribution of nMeans Gaussian distributions
        for (let i = 0; i < 100000; i++) {
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
            bucketsEnumerated.push({
                hour: i,
                value: buckets[i],
            });
        }

        return bucketsEnumerated;
    };

    res.status(200).send(generateDistribution(3));
}

export {
    // eslint-disable-next-line import/prefer-default-export
    generateDailyConsumption,
};
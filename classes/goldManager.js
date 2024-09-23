
const PercentileBar = require('./percentileBar');
const Roll = require('./roll');



class GoldManager {

    static rolls = []
    
    constructor(dieRollMap)
    {
        this.dieRollMap = dieRollMap;
    }

    static create(dieRollMap)
    {
        return new GoldManager(dieRollMap);
        
    }

    calculateGold(level, typeOfRoll)
    {
        let gold = 0;
        for (let i = 0; i < level; ++i)
        {
            //console.log(`Gold obtained in level: ${i+1}`);
            //Lets make a die roll for each level according to the Roll state
            gold += this.dieRollMap.get(typeOfRoll).execute();
            //console.log(gold);
        }

        return Math.max(0, gold);
    }


}

module.exports = {
    GoldManager
}

const Roll = require('./../classes/roll');

class PercentileBar
{
    static Value = {

        SUCCESS:    2,
        GREAT:      3,
        CRITICAL:   4,
        FAIL:       1,
        FUMBLE:     0,
        PERFECT:    5
        
    }

    constructor(criticalPercentile, greatPercetile, successPercentile, fumblePercentile)
    {
        this.criticalPercentile = criticalPercentile;
        this.greatPercetile     = greatPercetile;
        this.successPercentile  = successPercentile;
        this.fumblePercentile   = fumblePercentile;
    }

    static create20CriticalAndFumble(successPercentile)
    {
        return PercentileBar.from(20, successPercentile, 20);
    }

    static from(criticalChance, successPercentile, fumbleChance)
    {
        if (criticalChance > 49)
            throw new Error("The critical chance cannot be above 49")
        
        //Great percentile will be always 50% of success
        const greatPercetile = Math.ceil(successPercentile / 2);

        //Critical hit:
        // (criticalChance/100) * successPercentile ROUNDED UP
        const criticalPercentile = Math.ceil((criticalChance / 100) * successPercentile);

        //Fumble 
        // 100 - Math.ceil((fumbleChance/100)*(100-successPercentile)) + 1
        const fumblePercentile = 100 - Math.ceil((fumbleChance/100) * (100 - successPercentile)) + 1;

        return new PercentileBar(criticalPercentile, greatPercetile, successPercentile, fumblePercentile);

        
    }

    isGreat(roll)
    {
        return roll <= this.greatPercetile && roll > this.criticalPercentile && !this.isPerfect();
    }

    isCritical(roll)
    {
        return roll <= this.criticalPercentile;
    }

    isFail(roll)
    {
        return roll > this.successPercentile && roll < this.fumblePercentile && !this.isPerfect();
    }

    isFumble(roll)
    {
        return roll >= this.fumblePercentile;
    }

    isSuccess(roll)
    {
        return !this.isCritical(roll) && !this.isGreat(roll) && !this.isFail(roll) && !this.isFumble(roll) && !this.isPerfect()
    }

    isPerfect(roll)
    {
        //Minimum to be perfect. this.criticalPercentile == 
        return (roll == 1 && this.criticalPercentile > 4) || (roll == 2 && this.criticalPercentile > 6);
    }



    getTypeOfRoll(roll)
    {
        return  this.isGreat(roll)      ? PercentileBar.Value.GREAT:
                this.isCritical(roll)   ? PercentileBar.Value.CRITICAL:
                this.isFail(roll)       ? PercentileBar.Value.FAIL:
                this.isPerfect(roll)    ? PercentileBar.Value.PERFECT:
                this.isFumble(roll)     ? PercentileBar.Value.FUMBLE: PercentileBar.Value.SUCCESS
       

    }


}

module.exports = {
    PercentileBar
}
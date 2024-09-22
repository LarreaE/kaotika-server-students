class Roll 
{
    constructor(numFaces, numDies, modifier)
    {
        this.numFaces = numFaces;
        this.numDies = numDies;
        this.modifier = modifier;  
    }

    throwOneDie()
    {
        return Math.floor(Math.random() * this.numFaces) + 1;
    }

    execute()
    {
        let roll = 0;
        for (let i = 0; i < this.numDies; ++i)
        {
            roll += this.throwOneDie();
        }

        return roll + this.modifier;
    }
}

module.exports  = { Roll

}

const EXPERIENCE_TO_NEXT_LEVEL = 1750;
const EXPERIENCE_PER_GRADE = 40;
const ATTRIBUTES_INCREASE_PER_LEVEL = 5;

const LevelUpAttributes = {
        INTELLIGENCE: 0,
        DEXTERITY:    1,
        CHARISMA:     2,
        CONSTITUTION: 3,
        STRENGTH:     4,
        TOTAL:        5
    };


const ProfilesAttributes = [
    {
        "name": "Scholar",
        "major_attributes": [ "Intelligence"],
        "minor_attributes": [ "Constitution", "Strength"],
        "normal_attributes":[ "Dexterity", "Charisma"]
    },
    {
        "name": "Pariah",
        "major_attributes": [ "Strength"],
        "minor_attributes": [ "Charisma", "Intelligence"],
        "normal_attributes":[ "Dexterity", "Constitution"]
    },
    {
        "name": "Juggler",
        "major_attributes": [ "Dexterity"],
        "minor_attributes": [ "Intelligence", "Strength"],
        "normal_attributes":[ "Charisma", "Constitution"]
    },
    {
        "name": "Blasphemer",
        "major_attributes": [ "Charisma"],
        "minor_attributes": [ "Intelligence", "Constitution"],
        "normal_attributes":[ "Strength", "Dexterity"]
    },
    {
        "name": "Embalmer",
        "major_attributes": [ "Dexterity"],
        "minor_attributes": [ "Charisma", "Constitution"],
        "normal_attributes":[ "Intelligence", "Strength"]
    },
    {
        "name": "Gossiper",
        "major_attributes": [ "Intelligence"],
        "minor_attributes": [ "Strength", "Constitution"],
        "normal_attributes":[ "Dexterity", "Charisma"]
    },
    {
        "name": "Bumbler",
        "major_attributes": [ "Constitution"],
        "minor_attributes": [ "Intelligence", "Dexterity", "Charisma"],
        "normal_attributes":[ "Strength" ]
    },
    {
        "name": "Poet",
        "major_attributes": [ "Charisma"],
        "minor_attributes": [ "Constitution", "Strength"],
        "normal_attributes":[ "Dexterity", "Intelligence"]
    }



]


module.exports = {
    EXPERIENCE_TO_NEXT_LEVEL,
    EXPERIENCE_PER_GRADE,
    ATTRIBUTES_INCREASE_PER_LEVEL,

    ProfilesAttributes,
    LevelUpAttributes

    
}


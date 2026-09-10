// CARD PACK SHOP - CARD CATALOG
// Central home for card identity, type, and base-value lookup.
// Add more characters here without touching gameplay code.

function getCharacterName(currentSet: number, rarity: string): string {
    if (currentSet == 0) {
        if (rarity == "NORMAL") return "Psyduck"
        if (rarity == "HOLOGRAPH") return "Rayquaza"
        if (rarity == "EX") return "Dragapult ex"
        if (rarity == "ILLUSTRATION RARE") return "Carbink"
        if (rarity == "ULTRA RARE") return "Mega Dragonite ex"
        if (rarity == "SPECIAL ILLUSTRATION") return "Team Rocket Mewtwo ex"
        return "Mega Gengar ex"
    }

    if (currentSet == 1) {
        if (rarity == "NORMAL") return "Baltoy"
        if (rarity == "HOLOGRAPH") return "Delphox"
        if (rarity == "EX") return "Beedrill ex"
        if (rarity == "ILLUSTRATION RARE") return "Froakie"
        if (rarity == "ULTRA RARE") return "Mega Dragalge ex"
        if (rarity == "SPECIAL ILLUSTRATION") return "Cinccino ex"
        return "Mega Greninja ex"
    }

    if (currentSet == 2) {
        if (rarity == "NORMAL") return "Snorlax"
        if (rarity == "HOLOGRAPH") return "Gengar"
        if (rarity == "EX") return "Meowth ex"
        if (rarity == "ILLUSTRATION RARE") return "Dedenne"
        if (rarity == "ULTRA RARE") return "Decidueye ex"
        if (rarity == "SPECIAL ILLUSTRATION") return "Mega Starmie ex"
        return "Mega Zygarde ex"
    }

    if (rarity == "NORMAL") return "Wailmer"
    if (rarity == "HOLOGRAPH") return "Slowbro"
    if (rarity == "EX") return "Mega Excadrill ex"
    if (rarity == "ILLUSTRATION RARE") return "Goldeen"
    if (rarity == "ULTRA RARE") return "Morpeko ex"
    if (rarity == "SPECIAL ILLUSTRATION") return "Mega Zeraora ex"
    return "Mega Darkrai ex"
}

function getBaseValue(rarity: string): number {
    if (rarity == "NORMAL") return 1
    if (rarity == "HOLOGRAPH") return 2
    if (rarity == "EX") return 5
    if (rarity == "ILLUSTRATION RARE") return 15
    if (rarity == "ULTRA RARE") return 30
    if (rarity == "SPECIAL ILLUSTRATION") return 75
    if (rarity == "MEGA HYPER RARE") return 250
    return 1
}

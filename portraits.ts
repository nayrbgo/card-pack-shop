// CARD PACK SHOP - PORTRAITS
// Small pixel-art creature portraits for the collection screen.
// These are intentionally simple 24x24 icons so they stay readable in Arcade.

function getCharacterPortrait(currentSet: number, rarity: string): Image {
    let portrait = image.create(24, 24)

    // Each set gets its own accent color.
    let setColor = 5
    if (currentSet == 1) setColor = 2
    if (currentSet == 2) setColor = 7
    if (currentSet == 3) setColor = 13

    // Each rarity gets a highlight color.
    let rarityColor = 6
    if (rarity == "HOLOGRAPH") rarityColor = 9
    if (rarity == "EX") rarityColor = 4
    if (rarity == "ILLUSTRATION RARE") rarityColor = 10
    if (rarity == "ULTRA RARE") rarityColor = 6
    if (rarity == "SPECIAL ILLUSTRATION") rarityColor = 14
    if (rarity == "MEGA HYPER RARE") rarityColor = 15

    portrait.fill(0)

    if (rarity == "NORMAL") {
        // Round little creature.
        portrait.fillRect(7, 7, 10, 9, setColor)
        portrait.fillRect(5, 9, 2, 5, setColor)
        portrait.fillRect(17, 9, 2, 5, setColor)
        portrait.fillRect(8, 16, 3, 4, setColor)
        portrait.fillRect(13, 16, 3, 4, setColor)
        portrait.setPixel(9, 10, 1)
        portrait.setPixel(14, 10, 1)
        portrait.fillRect(11, 13, 2, 1, rarityColor)
    } else if (rarity == "HOLOGRAPH") {
        // Winged creature.
        portrait.fillRect(9, 6, 6, 11, setColor)
        portrait.fillRect(6, 8, 3, 7, rarityColor)
        portrait.fillRect(15, 8, 3, 7, rarityColor)
        portrait.fillRect(3, 10, 3, 3, rarityColor)
        portrait.fillRect(18, 10, 3, 3, rarityColor)
        portrait.fillRect(10, 17, 2, 4, setColor)
        portrait.fillRect(13, 17, 2, 4, setColor)
        portrait.setPixel(10, 9, 1)
        portrait.setPixel(13, 9, 1)
    } else if (rarity == "EX") {
        // Horned beast.
        portrait.fillRect(6, 8, 12, 10, setColor)
        portrait.fillRect(4, 5, 4, 4, rarityColor)
        portrait.fillRect(16, 5, 4, 4, rarityColor)
        portrait.fillRect(8, 18, 3, 3, setColor)
        portrait.fillRect(13, 18, 3, 3, setColor)
        portrait.setPixel(9, 11, 1)
        portrait.setPixel(14, 11, 1)
        portrait.fillRect(10, 15, 4, 1, rarityColor)
    } else if (rarity == "ILLUSTRATION RARE") {
        // Flower / forest creature.
        portrait.fillRect(10, 9, 4, 10, setColor)
        portrait.fillRect(7, 6, 4, 5, rarityColor)
        portrait.fillRect(13, 6, 4, 5, rarityColor)
        portrait.fillRect(9, 4, 6, 4, rarityColor)
        portrait.fillRect(5, 14, 5, 3, setColor)
        portrait.fillRect(14, 14, 5, 3, setColor)
        portrait.setPixel(11, 11, 1)
        portrait.setPixel(13, 11, 1)
    } else if (rarity == "ULTRA RARE") {
        // Dragon head.
        portrait.fillRect(7, 7, 10, 11, setColor)
        portrait.fillRect(5, 5, 4, 5, rarityColor)
        portrait.fillRect(15, 5, 4, 5, rarityColor)
        portrait.fillRect(9, 4, 2, 4, rarityColor)
        portrait.fillRect(13, 4, 2, 4, rarityColor)
        portrait.setPixel(9, 11, 1)
        portrait.setPixel(14, 11, 1)
        portrait.fillRect(10, 15, 4, 2, rarityColor)
        portrait.fillRect(8, 18, 8, 3, setColor)
    } else if (rarity == "SPECIAL ILLUSTRATION") {
        // Crowned star creature.
        portrait.fillRect(7, 8, 10, 10, setColor)
        portrait.fillRect(5, 5, 3, 5, rarityColor)
        portrait.fillRect(10, 3, 4, 5, rarityColor)
        portrait.fillRect(16, 5, 3, 5, rarityColor)
        portrait.fillRect(4, 12, 3, 3, rarityColor)
        portrait.fillRect(17, 12, 3, 3, rarityColor)
        portrait.setPixel(9, 11, 1)
        portrait.setPixel(14, 11, 1)
        portrait.fillRect(10, 15, 4, 1, 1)
        portrait.fillRect(9, 18, 6, 3, rarityColor)
    } else {
        // Mega Hyper Rare: large angular legendary silhouette.
        portrait.fillRect(8, 6, 8, 12, setColor)
        portrait.fillRect(4, 4, 5, 5, rarityColor)
        portrait.fillRect(15, 4, 5, 5, rarityColor)
        portrait.fillRect(3, 9, 5, 3, setColor)
        portrait.fillRect(16, 9, 5, 3, setColor)
        portrait.fillRect(5, 14, 4, 3, rarityColor)
        portrait.fillRect(15, 14, 4, 3, rarityColor)
        portrait.fillRect(9, 18, 2, 4, setColor)
        portrait.fillRect(13, 18, 2, 4, setColor)
        portrait.setPixel(10, 10, 1)
        portrait.setPixel(13, 10, 1)
        portrait.fillRect(10, 14, 4, 1, rarityColor)
    }

    return portrait
}

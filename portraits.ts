// CARD PACK SHOP - PORTRAITS
// Placeholder portrait system. Replace each branch with hand-drawn pixel art later.

function getCharacterPortrait(currentSet: number, rarity: string): Image {
    let portrait = image.create(24, 24)
    let setColor = 5
    if (currentSet == 1) setColor = 2
    if (currentSet == 2) setColor = 7
    if (currentSet == 3) setColor = 13

    let rarityColor = 1
    if (rarity == "HOLOGRAPH") rarityColor = 9
    if (rarity == "EX") rarityColor = 4
    if (rarity == "ILLUSTRATION RARE") rarityColor = 10
    if (rarity == "ULTRA RARE") rarityColor = 6
    if (rarity == "SPECIAL ILLUSTRATION") rarityColor = 14
    if (rarity == "MEGA HYPER RARE") rarityColor = 15

    portrait.fill(0)
    portrait.fillRect(4, 3, 16, 4, rarityColor)
    portrait.fillRect(6, 7, 12, 10, setColor)
    portrait.fillRect(4, 17, 16, 4, rarityColor)
    portrait.setPixel(9, 10, 1)
    portrait.setPixel(14, 10, 1)
    portrait.fillRect(10, 14, 4, 1, 1)
    return portrait
}

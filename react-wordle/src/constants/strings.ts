export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!

export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough letters'
export const WORD_NOT_FOUND_MESSAGE = 'Word not found'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const HARD_MODE_DESCRIPTION =
  'Any revealed hints must be used in subsequent guesses'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was "${solution}"`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_WORD_TEXT = 'New day in'
export const SHARE_TEXT = 'Prove'
export const MIGRATE_BUTTON_TEXT = 'Transfer'
export const MIGRATE_DESCRIPTION_TEXT =
  'Click here to transfer your statistics to a new device.'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const DISCOURAGE_INAPP_BROWSER_TEXT =
  "You are using an embedded browser and may experience problems sharing or saving your results. We encourage you rather to use your device's default browser."

// Social Media
export const DISCORD_URL = 'https://discord.com'
export const TELEGRAM_URL = 'https://t.me/alfredfuu'

// Worboo Chat Bubble Messages
export const WORBOO_CHAT_MESSAGES = [
  'I am Worboo! I can help you narrow down the word choices. Try making a guess first!',
  'This word might be a noun that refers to an everyday object.',
  'This word could be a verb describing a common action.',
  'This word might be related to nature or the environment.',
  'People in professional settings often use this word.',
  'This word is commonly used in casual conversations.',
  'This word might have Latin or Greek origins.',
  'This word could be related to technology or science.',
  'This word might be used frequently in literature or academic writing.',
  'This word could have multiple meanings depending on context.',
  'This word might be something you encounter in your daily routine.'
]

// Friend System
export const FRIEND_SEARCH_TITLE = 'Find Friends'
export const FRIEND_SEARCH_PLACEHOLDER = 'Enter OCID (e.g., 0x1234...5678)'
export const FRIEND_SEARCH_BUTTON = 'Search'
export const FRIEND_ADD_BUTTON = 'Add Friend'
export const FRIEND_ADDED_MESSAGE = 'Friend added successfully!'
export const FRIEND_NOT_FOUND_MESSAGE = 'User not found. Please check the OCID and try again.'
export const FRIEND_ALREADY_ADDED_MESSAGE = 'This user is already in your friends list.'
export const FRIEND_LIST_TITLE = 'Friends List'
export const FRIEND_PROFILE_LAST_ACTIVE = 'Last active:'
export const FRIEND_PROFILE_LEVEL = 'Level'
export const FRIEND_PROFILE_OCID = 'OCID:'
export const FRIEND_PROFILE_MESSAGE_BUTTON = 'Message'
export const FRIEND_PROFILE_GIFT_BUTTON = 'Send Gift'
export const FRIEND_PROFILE_CHALLENGE_BUTTON = 'Challenge'
export const FRIEND_PROFILE_COPY_OCID = 'Copy OCID'
export const FRIEND_PROFILE_COPIED_OCID = 'Copied!'

// Shop constants
export const SHOP_TITLE = 'Worboo Shop'
export const SHOP_BUY_BUTTON = 'Buy'
export const SHOP_EQUIP_BUTTON = 'Equip'
export const SHOP_UNEQUIP_BUTTON = 'Unequip'
export const SHOP_EQUIPPED_LABEL = 'Equipped'
export const SHOP_TABS = {
  FULL_WORBOO: 'Full Worboo',
  BODY: 'Body',
  HEAD: 'Head',
  EYES: 'Eyes',
  MOUTH: 'Mouth',
  ACCESSORIES: 'Accessories'
}

// Rarity levels
export const RARITY = {
  COMMON: { name: 'Common', color: 'gray' },
  UNCOMMON: { name: 'Uncommon', color: 'green' },
  RARE: { name: 'Rare', color: 'blue' },
  EPIC: { name: 'Epic', color: 'purple' },
  LEGENDARY: { name: 'Legendary', color: 'orange' }
}

// Full Worboo NFTs
export const SHOP_FULL_WORBOO_ITEMS = [
  {
    id: 'worboo-default',
    name: 'Classic Worboo',
    price: 100,
    image: '/worboo/worboo.png',
    description: 'The original Worboo character',
    rarity: RARITY.COMMON
  },
  {
    id: 'worboo-sunglass',
    name: 'Cool Worboo',
    price: 150,
    image: '/worboo/worboo-sunglass.png',
    description: 'Worboo with stylish sunglasses',
    rarity: RARITY.UNCOMMON
  },
  {
    id: 'worboo-unruly',
    name: 'Unruly Worboo',
    price: 150,
    image: '/worboo/worboo-unruly.png',
    description: 'Worboo with a wild attitude',
    rarity: RARITY.UNCOMMON
  },
  {
    id: 'worboo-like',
    name: 'Friendly Worboo',
    price: 200,
    image: '/worboo/worboo-like.png',
    description: 'Worboo giving a thumbs up',
    rarity: RARITY.RARE
  },
  {
    id: 'worboo-pig',
    name: 'Piggy Worboo',
    price: 250,
    image: '/worboo/worboo-pig.png',
    description: 'Worboo in pig costume',
    rarity: RARITY.EPIC
  },
  {
    id: 'worboo-redpepper',
    name: 'Spicy Worboo',
    price: 250,
    image: '/worboo/worboo-redpepper.png',
    description: 'Worboo with a hot pepper',
    rarity: RARITY.EPIC
  }
]

// Body parts NFTs
export const SHOP_BODY_ITEMS = [
  {
    id: 'body-default',
    name: 'Classic Body',
    price: 50,
    image: '/worboo/worboo.png',
    description: 'The original Worboo body',
    rarity: RARITY.COMMON
  },
  {
    id: 'body-blue',
    name: 'Blue Body',
    price: 80,
    image: '/worboo/worboo-like.png',
    description: 'A cool blue Worboo body',
    rarity: RARITY.UNCOMMON
  },
  {
    id: 'body-pig',
    name: 'Pig Body',
    price: 120,
    image: '/worboo/worboo-pig.png',
    description: 'Adorable pig-themed body',
    rarity: RARITY.RARE
  }
]

// Head parts NFTs
export const SHOP_HEAD_ITEMS = [
  {
    id: 'head-default',
    name: 'Classic Head',
    price: 50,
    image: '/worboo/worboo.png',
    description: 'The original Worboo head',
    rarity: RARITY.COMMON
  },
  {
    id: 'head-unruly',
    name: 'Unruly Head',
    price: 75,
    image: '/worboo/worboo-unruly.png',
    description: 'A head with wild hair',
    rarity: RARITY.UNCOMMON
  }
]

// Eye parts NFTs
export const SHOP_EYE_ITEMS = [
  {
    id: 'eyes-default',
    name: 'Classic Eyes',
    price: 30,
    image: '/worboo/worboo.png',
    description: 'The original Worboo eyes',
    rarity: RARITY.COMMON
  },
  {
    id: 'eyes-sunglass',
    name: 'Sunglasses',
    price: 60,
    image: '/worboo/worboo-sunglass.png',
    description: 'Cool sunglasses for your Worboo',
    rarity: RARITY.UNCOMMON
  }
]

// Mouth parts NFTs
export const SHOP_MOUTH_ITEMS = [
  {
    id: 'mouth-default',
    name: 'Classic Mouth',
    price: 30,
    image: '/worboo/worboo.png',
    description: 'The original Worboo mouth',
    rarity: RARITY.COMMON
  },
  {
    id: 'mouth-pepper',
    name: 'Spicy Mouth',
    price: 70,
    image: '/worboo/worboo-redpepper.png',
    description: 'A mouth with a hot pepper',
    rarity: RARITY.RARE
  }
]

// Accessories NFTs
export const SHOP_ACCESSORY_ITEMS = [
  {
    id: 'accessory-none',
    name: 'No Accessory',
    price: 0,
    image: '/worboo/worboo.png',
    description: 'No accessories',
    rarity: RARITY.COMMON
  },
  {
    id: 'accessory-thumbsup',
    name: 'Thumbs Up',
    price: 40,
    image: '/worboo/worboo-like.png',
    description: 'A friendly thumbs up gesture',
    rarity: RARITY.UNCOMMON
  }
]

// All shop items combined for convenience
export const SHOP_ITEMS = [
  ...SHOP_FULL_WORBOO_ITEMS,
  ...SHOP_BODY_ITEMS,
  ...SHOP_HEAD_ITEMS,
  ...SHOP_EYE_ITEMS,
  ...SHOP_MOUTH_ITEMS,
  ...SHOP_ACCESSORY_ITEMS
]

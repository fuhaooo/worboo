# React Wordle

This is a clone project of the popular word guessing game we all know and love. Made using React, Typescript, and Tailwind.

[**Try out the demo!**](https://reactle.vercel.app/)

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd react-wordle
$> npm install
$> npm run start
```

### To build/run docker container:

#### Development

```bash
$> docker build -t reactle:dev -f docker/Dockerfile .
$> docker run -d -p 3000:3000 --name reactle-dev reactle:dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

#### Production

```bash
$> docker build --target=prod -t reactle:prod -f docker/Dockerfile .
$> docker run -d -p 80:8080  --name reactle-prod reactle:prod
```

Open [http://localhost](http://localhost) in browser.

## FAQ

### How can I change the length of a guess?

The default configuration is for solutions and guesses of length five, but it is flexible enough to handle other lengths, even variable lengths each day.

To configure for a different constant length:

- Update the `WORDS` array in [src/constants/wordlist.ts](src/constants/wordlist.ts) to only include words of the new length.
- Update the `VALID_GUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) to only include words of the new length.

To configure for variable lengths:

- Update the `WORDS` array in [src/constants/wordlist.ts](src/constants/wordlist.ts) to include words of any of the variable lengths desired.
- Update the `VALID_GUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) to include words of any of the variable lengths desired.

Note that guesses are validated against both the length of the solution, and presence in VALID_GUESSES.

### How can I create a version in another language?

- In [.env](.env):
  - Update the title and the description
  - Set the `REACT_APP_LOCALE_STRING` to your locale
- In [public/index.html](public/index.html):
  - Update the "You need to enable JavaScript" message
  - Update the language attribute in the HTML tag
  - If the language is written right-to-left, add `dir="rtl"` to the HTML tag
- Update the name and short name in [public/manifest.json](public/manifest.json)
- Update the strings in [src/constants/strings.ts](src/constants/strings.ts)
- Add all of the five letter words in the language to [src/constants/validGuesses.ts](src/constants/validGuesses.ts), replacing the English words
- Add a list of goal words in the language to [src/constants/wordlist.ts](src/constants/wordlist.ts), replacing the English words
- Update the "Settings" modal in [src/components/modals/SettingsModal.tsx](src/components/modals/SettingsModal.tsx)
- Update the "Info" modal in [src/components/modals/InfoModal.tsx](src/components/modals/InfoModal.tsx)
- Update the statistics migration components modal in:
  - [src/components/stats/MigrationIntro.tsx](src/components/stats/MigrationIntro.tsx)
  - [src/components/stats/EmigratePanel.tsx](src/components/stats/EmigratePanel.tsx)
  - [src/components/stats/ImmigratePanel.tsx](src/components/stats/ImmigratePanel.tsx)
  - [src/components/modals/MigrateStatsModal.tsx](src/components/modals/MigrateStatsModal.tsx)
- To ensure that migration codes are unique to your application, update the Blowfish encryption key and initialization vector with random 30 character and 8 character strings in [src/constants/settings.ts](src/constants/settings.ts)
- If the language has letters that are not present in English update the keyboard in [src/components/keyboard/Keyboard.tsx](src/components/keyboard/Keyboard.tsx)
- If the language is written right-to-left, prepend `\u202E` (the unicode right-to-left override character) to the return statement of the inner function in `generateEmojiGrid` in [src/lib/share.ts](src/lib/share.ts)

### How can I add usage tracking?

This repository includes support for Google Analytics or [Plausible Analytics](https://plausible.io), but, by default, this is disabled.

To enable Google Analytics:

- Create a Google Analytics 4 property and obtain the measurement ID (of the format `G-XXXXXXXXXX`)
- In [.env](.env), add `REACT_APP_GOOGLE_MEASUREMENT_ID=G-XXXXXXXXXX`

Keep in mind that your region might have legislation about obtaining a user's consent before enabling trackers. This is up to downstream repos to implement.

To enable Plausible Analytics:

- Create a new website with Plausible Analytics with a given domain, e.g. `example.app`
- In [.env](.env), add `REACT_APP_PLAUSIBLE_DOMAIN=example.app`

## Recent Updates

### Friend System Enhancement (2025-02-26)

#### New Features:
- **Friend Search**: Users can now search for friends using their OCID through a new modal interface
  - Click the "Add Friend" button in the Profile sidebar to open the search dialog
  - Enter an OCID to find and add new friends
  - View detailed profile information before adding a friend

- **Friend Profile Cards**: Enhanced Friend List with detailed profile cards
  - Click on any friend in your Friend List to view their detailed profile
  - Profile cards display the friend's Worboo avatar, level, OCID, and bio
  - Quick actions available: Message friend and Send Gift

#### Product Design Considerations:
- **User Experience Flow**: The friend search and profile viewing process is designed to be intuitive and seamless
- **Visual Consistency**: Friend cards maintain the same visual language as the rest of the Worboo interface
- **Progressive Disclosure**: Information is presented in a layered approach, showing basic details in the list and more comprehensive information in the profile card
- **Accessibility**: All interactive elements have appropriate focus states and semantic HTML

#### Future Enhancements (Planned):
- Friend request approval system
- Friend activity feed
- Collaborative learning features between friends
- Friend recommendations based on learning progress and interests

## Projects built using this repo

### Other languages

- [Arwordle](https://arwordle.netlify.app/): Arabic
- [Boludle](https://www.boludle.com/): Argentinian
- [Gerdle](https://gerdle.vext.co.uk/): Cornish (Kernowek)
- [Jwordle](https://jwordle.vercel.app/): Japanese
- [Katadel](https://katadel.vercel.app/): Jawi (Malay Arabic script)
- [Keclap](https://keclap.xyz/): Sundanese
- [Kelmaly](https://kelmaly.com/): Arabic
- [Kerdle](https://kerdle.vercel.app/): Cornish/Kernewek (Standard Written Form)
- [Latindictionary.io](https://wordle.latindictionary.io/): Latin
- [Lexoula](https://lexoula.com/): Ελληνικά (Greek)
- [Malay](https://malay-wordle.netlify.app/): Bahasa Malaysia
- [Mondle](https://mondle.vercel.app/): Mongolian
- [Parolette](https://parolette.netlify.app/): Italian
- [Parolle.it](https://parolle.it): Italian
- [Pashtoodle](https://pashtoodle.lingdocs.com): Pashto
- [Persian](https://www.persian-wordle.ir/): Persian (Farsi)
- [Pinyin](https://www.pinyindle.com/): Pinyin (romanization system for Mandarin Chinese)
- [Rudle](https://rudle.vercel.app): Russian
- [Sindhal](https://hellosindh.com/sindhal): Sindhi
- [Szózat](https://szozat.miklosdanka.com/): Hungarian
- [So'zzana](https://sozzana.netlify.app/): O'zbek (Lotin)
- [Tatar](https://tatardle.vercel.app/): Tatar (Turkic Language)
- [Tàu Tâi-gí (Taigi Wordle)](https://tau.taigi.info/): Taigi (Taiwanese)
- [Telugu](https://teluguwordle.com): Telugu (South Indian Language)
- [Tlembung](https://tlembung.vercel.app/): Javanese
- [Tugma](https://tugma.vercel.app): Hiligaynon (spoken in the Philippines)
- [Ukrainian](https://goroh.pp.ua/games/wordle): Ukrainian
- [Urdle](https://urdle.chaoticity.com/): Urdu
- [Vārdulis](https://wordle.lielakeda.lv/): Latvian
- [Word-leh!](https://word-leh.com): Singlish
- [Wordlar](http://wordlar.uz/): Uzbek
- [Wordle (BOS)](https://elahmo.github.io/wordle/): Bosnian
- [Wordle (Spanish)](https://wordle-es.xavier.cc): Spanish/Espanol
- [Wordle-RO](https://wordle-ro.sirb.net/): Romanian
- [Wortel](https://wortel.wrintiewaar.co.za): Afrikaans
- [Wörtchen](https://woertchen.sofacoach.de): German
- [SGWordle](https://sgwordle.now.sh/): Swiss German
- [kelma.mt](https://kelma.mt): Maltese
- [Слівце](https://slivce.com/): Ukrainian
- [ਪੰਜਾਬੀ](https://punjabipuzzle.netlify.app/): Punjabi
- [சொல்லாடல் Soladle](https://omtamil.com/soladle): Tamil
- [字知之明](https://zedaizd.github.io/zh-char-puzzle/): Traditional Chinese
- [꼬들 - 한국어](https://belorin.github.io/): Korean
- [한글 풀어쓰기 5자](https://nakosung.github.io/wordle/): Korean
- [ไทย](https://buddhistuniversity.net/wordle-thai/): Thai
- [ಕನ್ನಡ](https://www.aksharabandha.co.in/): Kannada

### Fun themes

- ['en si lì'ur](https://tirea.learnnavi.org/wordle): Na'vi, the constructed language from James Cameron's AVATAR (2009)
- [Airportle](https://airportle.scottscheapflights.com/): Airport Codes
- [Anidal](https://anidal-abrarhayat.web.app/): Animals
- [Birdle - Emojis](https://birdle.dev): Bird emojis
- [Birdle](https://www.creek-birdle.com/): Birds
- [Buildly](https://buildly.procurepro.co/): Construction themed
- [Chipotle](https://chipotlele.herokuapp.com): Chipotle (food, items, etc.) themed
- [Crosswordle](https://crosswordle.mekoppe.com/): Crossword mashup
- [Dundle](https://dundle.dunmiffcord.com/): The Office
- [FFXIVrdle](https://ffxivrdle.com/): Final Fantasy XIV
- [Harry Potter](https://www.harrypotterwordle.com/): Harry Potter
- [JoJodle](https://jojo-news.com/fun/jojodle/): JoJo’s Bizarre Adventure
- [Mahjong Handle](https://mahjong-handle.update.sh/): Mahjong Hands
- [Filmle](https://filmle.now.sh/): Movie titles
- [Fletcherdle](https://www.fletcherdle.com/): American singer-songwriter FLETCHER
- [Lyricle](https://www.lyricle.app/): Lyrics
- [Marvle](https://marvle.herokuapp.com): Superhero (Marvel and DC) themed
- [Movie Wordle](https://movie-wordle.vercel.app): Bollywood
- [Murdle](https://murdle.vercel.app/): Spooky hangman mashup
- [Pawnle](https://pawnle.vercel.app/): Parks and Recreation
- [Poker Handle](https://kikychow.github.io/poker-wordle/): Poker
- [Poker Handle 2](https://poker-handle2.com/): Poker
- [Quettale](https://quettale.vercel.app/): Quenya, Elven language in LOTR
- [Radiole](https://radiole.vercel.app/): Radio-themed (for World Radio Day)
- [RareWordle](https://rwordle.vercel.app/): Word guessing with multiple simultaneous solutions of varying "values", all created from the same letters. The goal is to find the most obscure solution. It is inspired by the TV game show Pointless.
- [Reverdle](https://reverdle.now.sh/): Wordle but in reverse, that is one has to make as many guesses possible which do not have any green letter (i.e. a letter in the correct location compared to the hidden solution).
- [Squirdle](https://squirdle-inky.vercel.app/): Pokeman
- [Tacticle](https://tacticle.co/): Chess puzzles
- [Taylordle](https://www.taylordle.com/): Taylor Swift
- [Trekle](https://treklegame.com): Star Trek
- [Weedel](https://meetmeinouter.space/wordle/): Video game characters
- [Wordle.cl](https://www.wordle.cl): Chilean modisms, cities, places
- [Wrdl](https://wrdl-abae.vercel.app/): Words that are 5 letters long after getting rid of their vowels
- [WROUD](https://www.wroud.net/): W R O U D is a simple word game that challenges people to find a six-letter word in 3 guesses from a cloud of letters. https://www.wroud.net/ A spinoff of Wordle but quite different and may be more fun!. WROUD = Word + Cloud
- [香港麻雀 糊dle](https://hkwudle.vercel.app/): Mahjong hands under Hong Kong rules

### Math, Acronyms, Science, Tech, and more

- [AI-powered](https://github.com/asirota/wordle-ai): Includes an AI component
- [Colordle](https://github.com/necropolina/colordle): Guess the hexadecimal color code of the background
- [Genel](https://andrewholding.github.io/gene-wordle/): Gene symbols
- [Jazle](https://jazle.quest/): Javascript
- [Mathler](https://www.mathler.com/): Find the solution that equals X
- [Morsel](https://plingbang.github.io/morsel/): Morse
- [Numble](https://rbrignall.github.io/numble/): Maths
- [Opsle](https://opsle.vercel.app/): Ops
- [Passwordle](https://passwordle.sp8c3.com/): Passwords
- [Perfdle](https://perfdle.com): Performance Testers and Engineers, DevOps, and Observability
- [Primel](https://converged.yt/primel/): Prime numbers
- [Qwordle](https://qwordle.bhat.ca/): Quantum version of Wordle (uses entangled word-pairs)
- [Quantle](https://deduckproject.github.io/quantle/): Another quantum variant where guesses are quantum equations
- [Rundle](https://furstenheim.github.io/react-wordle/): Like wordle, but only last three guesses are considered.
- [Stockle](https://stockle.win/): Guess the stock or ETF
- [Syscordle](https://nezza.github.io/syscordle/): SYSCALL
- [TwoKinds](https://twokinds.me): There's only two kinds of people in this World.
- [UNLOCOdle](https://unlocodle.collabital.com/): UNLOCODEs
- [Visionle](https://orisenbazuru.github.io/visionle/): Guess the label of randomly chosen image from ImageNet/ImageNet-Sketch dataset (Machine learning)
- [0xdle](https://0xdle.vercel.app/): Hexadecimal

_Want to add one to the list? Just make a pull request or [let us know via a comment here](https://github.com/cwackerfuss/react-wordle/issues/120)_

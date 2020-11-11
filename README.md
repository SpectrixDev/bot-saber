# Bot Saber
#### By Spectrix and SamHep0803
[Add to your server!](https://discord.com/oauth2/authorize?client_id=753289892007510017&scope=bot&permissions=74837056) | [Support Server](https://discord.gg/Ny6zTNH)

Bot Saber is a discord bot handy for anyone wanting to spice up their discord server with Beat Saber features and commands. It offers a great way to integrate the game right into your server.

The bot boasts a list of various commands and features. We plan to expand these commands and consistantly add more. For example, there's a BeatSaver integration and a ScoreSaber integration, allowing for beatmap searches and profile viewing from within Discord.

As well as this, the bot has per-server settings, allowing you to customize the prefix for your specific server, to avoid conflicts with other bots.

Bot Saber is the first Beat Saber specific bot, meaning that all the focus is put onto making it completely to do with Beat Saber and not other commands, allowing for our creativity for making commands a lot wider.

## Usage
The bot allows users to do the following:

- Search for specific beatmaps on BeatSaver and get information about them (and let's them OneClick install them through a protocol, as well as to preview the map in their browser).
- Search for specific users on ScoreSaber and get information about them.
- Get the current hot beatmaps availabe on BeatSaver.
- See the leaderboards of ScoreSaber.
- Allow customization of the bot's settings such as prefix
- More & more coming soon


| **Name** | **Description** | **Usage** |
|:---:|---|---|
| help | Returns list of commands | help {command}
| hot | Shows currently hot beatmaps on BeatSaver | hot
| leaderboard | Shows the top #10 players on the leaderboard from ScoreSaber | leaderboard
| ping | Returns bot latency | ping 
| profile | Returns info from ScoreSaber about the specified profile | profile {id/name} {search}
| settings | Displays the server's current settings | settings
| song | Returns info from ScoreSaber about the specified beatmap | song {search}


<img class="center" src="https://i.imgur.com/UrGEdLy.png">

<img class="center" src="https://i.imgur.com/k9xvAV9.png">


## Contributing
We seriously would appriciate your thoughts, suggestions and contributions! We're happy to look at any features you'd like to see, any issues you've found, and we will gladly have a look at all pull requests that are made. If you feel like there's something could be better, something is unnessacary, something is broken, or if you find any spaghetti code, feel free to open a pull request and change what you like.

## APIs and External stuff used
- [BeatSaver](https://beatsaver.com)
- [ScoreSaber](https://scoresaber.com)
- [OneClick Install from ModAssistant](https://github.com/Assistant/ModAssistant) using [my own Flask website cuz discord doesnt support protocol](https://github.com/SpectrixOfficial/spectrix.pythonanywhere.com/)
- [SkyStudioAppsBSViewer](https://skystudioapps.com/bs-viewer/)

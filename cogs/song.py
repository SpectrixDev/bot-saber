import json, discord, asyncio, json, math, aiohttp, datetime
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

headers = {
      "Content-Type": "application/json",
      "User-Agent": "BeatSaberDiscordBot",
    }

class Song(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    
    @commands.cooldown(1, 5, BucketType.user)
    @commands.command()
    async def song(self, ctx, typeofsearch=None, *, query: commands.clean_content):
        """Gets song info via it's Beat Saver key or Name"""

        if not typeofsearch:
            return await ctx.send("**:no_entry: Ensure you provided full args, either `name` or `id`, for example: `b!song name Midnight Lady`**")
        if not query:
            return await ctx.send("**:no_entry: You need to provide args.**")
        # First request info from beatsaver to see if such a beatmap exists:
        async with ctx.typing():
            async with aiohttp.ClientSession(headers=headers) as session:
                if typeofsearch.lower() == "id":
                    async with session.get(f"https://beatsaver.com/api/maps/details/{query}") as r:
                        result = await r.json()
                        
                elif typeofsearch.lower() == "name":
                    async with session.get(f"https://beatsaver.com/api/search/advanced/0?q={query}") as r:
                        print(r)
                        result = await r.json()

        
        # Now check how many results we should display WIP
        docNumber = int(result['totalDocs']) if int(result['totalDocs']) <= 10 else 10

        
        result = result['docs'][0]
        metadata = result['metadata']
        stats = result['stats']
        embed = discord.Embed(title=f"**Song:** {result['name']}", 
                                description=f""":inbox_tray: [One click install](http://spectrix.pythonanywhere.com/botsaber?key=${result['key']}) with [ModAssistant](https://github.com/Assistant/ModAssistant)!\n
                                              :eyes: [Preview this map in your browser!](https://skystudioapps.com/bs-viewer/?id=${result['key']})""",
                                color=0xf03030, 
                                url=f"https://beatsaver.com/beatmap/{result['key']}")

        author = metadata['levelAuthorName'] if metadata['automapper'] == None else metadata['automapper']
        duration = str(datetime.timedelta(seconds=int(metadata['duration'])))
        embed.add_field(name="ℹ __Beatmap Info__",
                            value=f"""• **Level Author:** {author}
                                    • **Duration:** {duration if duration[:1] != "0" else duration[:2]}
                                    • **Beatmap BPM:** {round(int(metadata['bpm']))}""", inline=False)

        embed.add_field(name="📈 __Beatmap Stats__",
                        value=f"""• **Downloads:** {stats['downloads']}
                                • **Upvotes:** {stats['upVotes']}
                                • **Downvotes:** {stats['downVotes']}
                                • **Rating:** {round(int(stats['rating'])*100)}%""", inline=False)
         
        await ctx.send(embed=embed)


                                


def setup(bot):
    bot.add_cog(Song(bot))
        
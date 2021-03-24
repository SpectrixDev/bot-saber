import json, discord, asyncio, json, math, aiohttp, datetime
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType
from disputils import BotEmbedPaginator

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

headers = {
      "Content-Type": "application/json",
      "User-Agent": "BeatSaberDiscordBot",
    }

class Song(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    async def getSongInfo(self, result):
        metadata = result['metadata']
        stats = result['stats']
        embed = discord.Embed(title=f"**Beatmap:** {result['name']}", 
                                description=f":inbox_tray: [One click install](http://spectrix.pythonanywhere.com/botsaber?key={result['key']}) with [ModAssistant](https://github.com/Assistant/ModAssistant)!"+
                                            f"\n:eyes: [Preview this map in your browser!](https://skystudioapps.com/bs-viewer/?id={result['key']})",
                                color=0xf03030, 
                                url=f"https://beatsaver.com/beatmap/{result['key']}")

        author = metadata['levelAuthorName'] if metadata['automapper'] == None else metadata['automapper']
        duration = str(datetime.timedelta(seconds=int(metadata['duration']))) if int(metadata['duration']) != 0 else "Not specified"
        duration = duration if duration[:1] != '0' else (duration[2:] if duration[2:][:1] != '0' else duration[3:])
        embed.add_field(name=":information_source: __Beatmap Info__",
                        value=f"• **Level Author:** {author}" +
                              f"\n• **Duration:** {duration}" +
                              f"\n• **Beatmap BPM:** {round(int(metadata['bpm']))}", inline=False)

        embed.add_field(name="📈 __Beatmap Stats__",
                        value="• **Downloads:** {:,d}".format(stats['downloads']) +
                        "\n• **Upvotes:** {:,d}".format(stats['upVotes']) +
                        "\n• **Downvotes:** {:,d}".format(stats['downVotes']) +
                        f"\n• **Rating:** {str(round(stats['rating']*100))+'%' if stats['rating']!=0 else 'Unrated'}", inline=False)

        embed.add_field(name="📊 Beatmap Difficulties",
                        value="\n".join([("- " + key.title()) for key, valueofkey in metadata['difficulties'].items() if valueofkey == True]))
        
        embed.set_thumbnail(url=f"https://beatsaver.com{result['coverURL']}")
        embed.set_footer(text=f"🔑 Key: {result['key']}", icon_url=config['styling']['logo'])
        return embed

    @commands.cooldown(1, 3, BucketType.user)
    @commands.group(aliases=['beatmap', 'map'])
    async def song(self, ctx):
        """Gets song info via it's Beat Saver key or Name"""
        if ctx.invoked_subcommand is None:
            await ctx.send("**❌ Invalid input!** Ensure you provided full args. ```fix\nList of args:\n\n- name\n- id``` **For example:** `b!song name Midnight Lady`")


    @song.command()
    async def name(self, ctx, *, query):
        async with ctx.typing():
            embeds = []
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.get(f"https://beatsaver.com/api/search/advanced/0?q={query}") as r:
                    result = await r.json()
            for i in range(int(result['totalDocs']) if int(result['totalDocs']) <= 10 else 10):
                embeds.append(await self.getSongInfo(result['docs'][i]))
                paginator = BotEmbedPaginator(ctx, embeds)
        try:
            await paginator.run()
        except Exception:
            await ctx.send("**:no_entry: Error! Make sure I have the correct permissions to use this command. I may need `manage_messages` perms or `add_reactions` perms. If that doesn't fix the issue, contact my devs!**")

    
    @song.command()
    async def id(self, ctx, id):
        async with ctx.typing():
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.get(f"https://beatsaver.com/api/maps/detail/{id}") as r:
                    result = await r.json()
                    embed = await self.getSongInfo(result)
                    await ctx.send(embed=embed)

                
    
    


                                


def setup(bot):
    bot.add_cog(Song(bot))
        

        #async with session.get(f"https://beatsaver.com/api/maps/detail/{query}") as r:
       #                 result = await r.json()
        #                await self.getSongInfo(ctx, result)
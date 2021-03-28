import json, discord, asyncio, json, math, aiohttp, datetime
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType
from disputils import BotEmbedPaginator
from discord import Embed

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

headers = {
      "Content-Type": "application/json",
      "User-Agent": "BeatSaberDiscordBot",
    }

class Beatmap(commands.Cog):
    """ Commands that return info from beatmap(s) from ScoreSaber """
    def __init__(self, bot):
        self.bot = bot

    async def getSongInfo(self, result):
        metadata = result['metadata']
        stats = result['stats']
        embed = discord.Embed(title=f"**Beatmap:** {result['name']}", 
                                description=f":inbox_tray: [One click install](http://spectrix.pythonanywhere.com/botsaber?key={result['key']}) with [ModAssistant](https://github.com/Assistant/ModAssistant)!"+
                                            f"\n:eyes: [Preview this map in your browser!](https://skystudioapps.com/bs-viewer/?id={result['key']})",
                                color=0x0000ff, 
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
                        value="\n".join([("- " + key.title()) for key, valueofkey in metadata['difficulties'].items() if valueofkey == True]), inline=False)

        if len(result['description']) > 0:
            embed.add_field(name="📋 __Description__", value=f"```\n{result['description']}```", inline=False)
        
        
        embed.set_thumbnail(url=f"https://beatsaver.com{result['coverURL']}")
        embed.set_footer(text=f"🔑 Key: {result['key']}", icon_url=config['styling']['logo'])
        return embed

    @commands.cooldown(1, 3, BucketType.user)
    @commands.group(aliases=['beatmap', 'map'])
    async def song(self, ctx):
        """Get information about a song from its key, or search for songs by name"""
        if ctx.invoked_subcommand is None:
            await ctx.send("**❌ Invalid input!** Ensure you provided full args. ```fix\nList of args:\n\n- name\n- key``` **For example:** `b!song name Midnight Lady`")


    @song.command()
    async def name(self, ctx, *, query):
        """Searches for songs with a specific name, returns a max of 10 results, to get song information"""
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
        except IndexError:
            await ctx.send("**❌ No results found.** Think this is an error? Try again.")

    
    @song.command()
    async def key(self, ctx, id):
        """Lets you search for a song by its key to get song information"""
        async with ctx.typing():
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.get(f"https://beatsaver.com/api/maps/detail/{id}") as r:
                    result = await r.json()
                    embed = await self.getSongInfo(result)
                    await ctx.send(embed=embed)     

    @commands.cooldown(1, 5, BucketType.user)
    @commands.command()
    async def hot(self, ctx):
        """Current scoresaber hot song list"""
        embeds = []
        notify = await ctx.send("**<a:red_note:760170835729580065> Searching...** This takes time as I'm getting info from many songs...")

        async with ctx.typing():
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.get("https://beatsaver.com/api/maps/hot/0") as r:
                    result = await r.json()

            for i in result['docs']:
                embeds.append(await self.getSongInfo(i))
            
        
        paginator = BotEmbedPaginator(ctx, embeds)
        
        try:
            await notify.delete()
        except Exception:
            pass

        paginator = BotEmbedPaginator(ctx, embeds)

        
        await paginator.run() 

def setup(bot):
    bot.add_cog(Beatmap(bot))
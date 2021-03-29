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

class ModelSaber(commands.Cog):
    """ Commands that return results from ModelSaber """
    def __init__(self, bot):
        self.bot = bot

    async def getModelSaberInfo(self, query):
        e = discord.Embed(title=f'**"{query["name"]}"** by **{query["author"]}**', 
                              color=0x800080, 
                              url=f"https://modelsaber.com/Sabers/?id={query['id']}",
                              description=f":inbox_tray: !")

        e.set_thumbnail(url=f"https://modelsaber.com/files/saber/{query['id']}/{query['thumbnail']}")
        e.set_footer(text="Info from modelsaber.com")
        return e
        

    @commands.cooldown(1, 3, BucketType.user)
    @commands.group()
    async def saber(self, ctx):
        if ctx.invoked_subcommand is None:
            print(0)
    
    @saber.command()
    async def author(self, ctx, query):
        embed = []
        async with ctx.typing():
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.get(f"https://modelsaber.com/api/v2/get.php?type=saber&filter=author:{query}") as r:
                    result = await r.json()
            for i in result:
                embed.append(await self.getModelSaberInfo(result[i]))
            
        paginator = BotEmbedPaginator(ctx, embed)

        try:
            await paginator.run()
        except IndexError:
            await ctx.send("**❌ No results found.** Think this is an error? Try again.")


def setup(bot):
    bot.add_cog(ModelSaber(bot))
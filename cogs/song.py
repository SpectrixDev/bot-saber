import json, requests, discord, asyncio, json, math
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

class Song(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.cooldown(1, 5, BucketType.user)
    @commands.command()
    async def song(self, ctx, typeofsearch, *query):
        """Gets song info via it's Beat Saver key or Name"""
        if typeofsearch.lower() == "id":
            result = requests.get(f"https://beatsaver.com/api/maps/details/{query}").json()
        elif typeofsearch.lower() == "name":
            result = requests.get(f"https://beatsaver.com/api/search/advanced/0?q={' '.join(query)}").json()
        else:
            return await ctx.send("Something went wrong... Ensure you provided full args, for example: `b!profile name Spectrix`")
        

        embed = discord.Embed(title=f"**Song:** {result['name']}", 
                              description=f"""📥 [One click install](http://spectrix.pythonanywhere.com/botsaber?key=${result['key']}) with [ModAssistant](https://github.com/Assistant/ModAssistant)!\n
                                            👀 [Preview this map in your browser!](https://skystudioapps.com/bs-viewer/?id=${result['key']})""",
                              color=0xf03030, 
                              url=f"https://beatsaver.com/beatmap/{result['key']}")

        determineAuthor = result['metadata']['levelAuthorName'] if result['metadata']['automapper'] == None else result['metadata']['automapper']
        determineDuration = f"{math.floor(result['metadata']['duration'] / 60)} {result['metadata']['duration'] - math.floor(result['metadata']['duration'])}" # NEEDS WORK
        print(determineDuration)
        embed.add_field(name="ℹ __Beatmap Info__",
                        value=f"""• **Level Author:** {result['metadata']['levelAuthorName'] if result['metadata']['automapper'] == None else result['metadata']['automapper']}
                                • **Duration:** {math.floor(result['metadata']['duration'] / 60) }""")

                                


def setup(bot):
    bot.add_cog(Song(bot))
        
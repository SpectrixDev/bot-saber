import discord, asyncio, random, time, datetime, json, aiohttp, requests
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

class Profile(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.cooldown(1, 5, BucketType.user)
    @commands.command()
    async def profile(self, ctx, typeofsearch, query):
        """Gets user info and stats via it's Beat Saver/Steam ID or Name."""
        if typeofsearch.lower() == "id":
            result = requests.get(f"https://new.scoresaber.com/api/player/{query}/full").json()
        elif typeofsearch.lower() == "name":
            nameResult = requests.get(f"https://new.scoresaber.com/api/players/by-name/{query}").json()
            result = requests.get(f"https://new.scoresaber.com/api/player/{nameResult['players'][0]['playerId']}/full").json()
        else:
            return await ctx.send("Error message here")

        playerInfo = result['playerInfo']
        scoreStats = result['scoreStats']

        embed = discord.Embed(title=f"**User:** {playerInfo['playerName']}", 
                              color=0x309eff, 
                              url=f"https://new.scoresaber.com/u/{playerInfo['playerId']}")

        embed.add_field(name="ℹ __Player Info__",
                        value=f"""**Rank:** #{format(int(playerInfo["rank"]), ",d")}
                                **Country Rank:** #{playerInfo["countryRank"]} ({playerInfo["country"]} :flag_{playerInfo["country"].lower()}:)
                                **PP:** {format(int(playerInfo["pp"]), ",d")}""", inline=False)

        embed.add_field(name="📈 __Player Stats__",
                        value=f"""**Total Score:** {format(int(scoreStats["totalScore"]), ",d")}
                                **Total Ranked Score:** {format(int(scoreStats["totalRankedScore"]), ",d")}
                                **Average Ranked Accuracy:** {str(round(scoreStats["averageRankedAccuracy"], 2))}%
                                **Total Play Count:** {scoreStats["totalPlayCount"]}
                                **Ranked Play Count:** {scoreStats["rankedPlayCount"]}""", inline=False)

        embed.set_thumbnail(url=f"https://new.scoresaber.com{playerInfo['avatar']}")
        embed.set_footer(text=f"User ID: {playerInfo['playerId']}", icon_url="https://cdn.discordapp.com/attachments/478201257417244675/760182130352586802/unknown.png")
        await ctx.send(embed=embed)

def setup(bot):
    bot.add_cog(Profile(bot))
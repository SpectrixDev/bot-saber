import discord, asyncio, random, json, aiohttp, requests
from urllib.parse import quote
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType
from disputils import BotEmbedPaginator
from discord import Embed

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

class ProfileCommands(commands.Cog):
    """ Commands relating to ScoreSaber profiles """
    def __init__(self, bot):
        self.bot = bot
    
    async def getProfileInfo(self, result):
        playerInfo = result['playerInfo']
        scoreStats = result['scoreStats']

        embed = discord.Embed(title=f"**User:** {playerInfo['playerName']}", 
                              color=0x309eff, 
                              url=f"https://new.scoresaber.com/u/{playerInfo['playerId']}")

        embed.add_field(name="ℹ __Player Info__",
                        value=f"**Rank:** #{format(int(playerInfo['rank']), ',d')}" +
                                f"\n**Country Rank:** #{playerInfo['countryRank']} ({playerInfo['country']} :flag_{playerInfo['country'].lower()}:)" +
                                f"\n**PP:** {format(int(playerInfo['pp']), ',d')}", inline=False)

        embed.add_field(name="📈 __Player Stats__",
                        value=f"**Total Score:** {format(int(scoreStats['totalScore']), ',d')}" +
                                f"\n**Total Ranked Score:** {format(int(scoreStats['totalRankedScore']), ',d')}" +
                                f"\n**Average Ranked Accuracy:** {str(round(scoreStats['averageRankedAccuracy'], 2))}%" +
                                f"\n**Total Play Count:** {scoreStats['totalPlayCount']}" +
                                f"\n**Ranked Play Count:** {scoreStats['rankedPlayCount']}", inline=False)

        embed.set_thumbnail(url=f"https://new.scoresaber.com{playerInfo['avatar']}")
        embed.set_footer(text=f"User ID: {playerInfo['playerId']}", icon_url="https://cdn.discordapp.com/attachments/478201257417244675/760182130352586802/unknown.png")
        return embed



    @commands.cooldown(1, 5, BucketType.user)
    @commands.group(aliases=['user'])
    async def profile(self, ctx):
        """Gets user info and stats via it's Beat Saber/Steam ID or Name."""
        if ctx.invoked_subcommand is None:
            await ctx.send("**❌ Invalid input!** Ensure you provided full args. ```fix\nList of args:\n\n- name\n- id``` **For example:** `b!profile name Spectrix`")

    @profile.command()
    async def name(self, ctx, *, query):
        async with ctx.typing():
            embeds = []
            notify = await ctx.send("**<a:red_note:760170835729580065> Searching...** This may take some time depending on the amount of people with similar names...")
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.get(f"https://new.scoresaber.com/api/players/by-name/{query}") as r:
                        result = await r.json()
            

                loop = len(result['players']) if len(result['players']) <= 10 else 10
            except KeyError:
                try:
                    await notify.delete()
                except Exception:
                    pass
                await ctx.send("**❌ No results found.** Think this is an error? Try again.")
            for i in range(loop):
                try:
                    async with aiohttp.ClientSession() as session:
                        async with session.get(f"https://new.scoresaber.com/api/player/{result['players'][i]['playerId']}/full") as r:
                            resultID = await r.json()
                            embeds.append(await self.getProfileInfo(resultID))

                except Exception as e:
                    print("Error in profile name\n" + e)
                    pass

            
            try:
                await notify.delete()
            except Exception:
                pass
            paginator = BotEmbedPaginator(ctx, embeds)
        try:
            await paginator.run()
        except Exception:
            await ctx.send("**:no_entry: Error! Make sure I have the correct permissions to use this command. I may need `manage_messages` perms or `add_reactions` perms. If that doesn't fix the issue, contact my devs!**")

    @profile.command()
    async def id(self, ctx, *, query):
        async with ctx.typing():
            async with aiohttp.ClientSession() as session:
                async with session.get(f"https://new.scoresaber.com/api/player/{query}/full") as r:
                    result = await r.json()
                    embed = await self.getProfileInfo(result)
                    await ctx.send(embed=embed)



def setup(bot):
    bot.add_cog(ProfileCommands(bot))
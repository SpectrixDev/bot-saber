import discord, asyncio, random, time, datetime, json, aiohttp, requests
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType
from disputils import BotEmbedPaginator
from discord import Embed

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

class Leaderboard(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.cooldown(1, 5, BucketType.user)
    @commands.command()
    async def leaderboard(self, ctx):
        """Current scoresaber global leaderboard info"""
        result = requests.get("http://new.scoresaber.com/api/players/1").json()
        data = ''
        embed = []
        for i in range (50):
            player = result['players'][i]
            data+=(f"`#{player['rank']}.` **{player['playerName']}** | **PP:** {player['pp']} | **Country:** {player['country']} :flag_{player['country'].lower()}:\n")
            if i == 9 or i == 19 or i == 29 or i == 39 or i == 49:
                e = Embed(title=f"🏆 Global Leaderboards",
                      description=data,
                      color=0x115599)
                e.set_footer(text="Data fetched from ScoreSaber", icon_url="https://cdn.discordapp.com/attachments/753288806928482354/811991289645760542/rYiHR2pu_400x400.png")
                embed.append(e)
                data = ''
                e = ''
        paginator = BotEmbedPaginator(ctx, embed)
        await paginator.run()

def setup(bot):
    bot.add_cog(Leaderboard(bot))

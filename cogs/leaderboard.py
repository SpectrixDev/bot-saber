import discord, asyncio, random, time, datetime, json, aiohttp, requests
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType

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
        for i in range(10):
            
        embed = discord.Embed(title="🏆 **Top 10 Players Leaderboard.**", color=0x309eff, ""

def setup(bot):
    bot.add_cog(Leaderboard(bot))
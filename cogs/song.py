import json, requests
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

class Song(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.cooldown(1, 5, BucketType.user)
    @commands.command
    async def song(self, ctx, typeofsearch, *query):
        """Gets song info via it's Beat Saver key or Name"""
        if typeofsearch.lower() == "id":
            result = requests.get(f"https://beatsaver.com/api/maps/details/{query}").json()
        elif typeofsearch.lower() == "name":
            result = requests.get(f"httos://beatsaver.com/api/search/advanced/0?q={' '.join(query)}")

def setup(bot):
    bot.add_cog(Song(bot))
        
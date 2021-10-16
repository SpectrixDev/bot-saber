import discord, asyncio, random, time, datetime, json, aiohttp, requests, humanize, psutil, logging, platform
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType
from disputils import BotEmbedPaginator
from discord import Embed

log = logging.getLogger(__name__)

with open("config.json") as f:
    config = json.load(f)

class LeaderboardCommands(commands.Cog):
    """ Commands that use the ScoreSaber leaderboard """
    def __init__(self, bot):
        self.bot = bot
    
    @commands.cooldown(1, 5, BucketType.user)
    @commands.command()
    async def leaderboard(self, ctx):
        """Current scoresaber global leaderboard info"""
        async with ctx.typing():
            async with aiohttp.ClientSession() as session:
                async with session.get("https://new.scoresaber.com/api/players/1") as r:
                    result = await r.json()
            data = ''
            embed = []
            for i in range (50):
                player = result['players'][i]
                data+=(f"`#{player['rank']}.` **{player['playerName']}** | **PP:** {player['pp']} | **Country:** {player['country']} :flag_{player['country'].lower()}:\n")
                if i == 9 or i == 19 or i == 29 or i == 39 or i == 49:
                    e = Embed(title=f"🏆 Global Leaderboards",
                        description=data,
                        color=0x115599)
                    e.set_footer(text="Do b!profile name <user> for more info", icon_url="https://cdn.discordapp.com/attachments/753288806928482354/811991289645760542/rYiHR2pu_400x400.png")
                    embed.append(e)
                    data = ''
                    e = ''
        paginator = BotEmbedPaginator(ctx, embed)
        try:
            await paginator.run()
        except Exception:
            await ctx.send("**:no_entry: Error! Make sure I have the correct permissions to use this command. I may need `manage_messages` perms or `add_reactions` perms. If that doesn't fix the issue, contact my devs!**")

def setup(bot):
    bot.add_cog(LeaderboardCommands(bot))

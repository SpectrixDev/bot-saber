import logging
import discord
from discord.ext import commands
from utils.formats import *  # pylint: disable=wildcard-import

log = logging.getLogger(__name__)

with open("config.json") as f:
    config = json.load(f)

class EventHandler(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.webhook = bot.webhook

    @commands.Cog.listener()
    async def on_guild_join(self, guild):
        await self.bot.update()
        
        try:
            embed = discord.Embed(color=discord.Color(value=0x309eff))
            embed.set_author(name="Here's some stuff to get you started:")
            embed.add_field(name="Prefix", value="`b!`, or **just mention me!**")
            embed.add_field(name="Command help", value="[Documentation](https://github.com/SpectrixDev/bot-saber/README.md)")
            embed.add_field(name="Support Server", value="[Join, it's quite fun here](https://discord.gg/Ny6zTNH)")
            embed.add_field(name="Upvote", value="[Click here](https://discordbots.org/bot/753289892007510017/vote)")
            embed.set_thumbnail(url=config["styling"]["thumbnail"])
            embed.set_footer(text=f"Thanks to you, Bot Saber is now on {len(self.guilds)} servers! <3", icon_url=config["styling"]["logo"])
            await guild.system_channel.send(content="**Hello World! Thanks for inviting me! :wave: **", embed=embed)
        except:
            pass

        bots = sum(1 for x in guild.members if x.bot)
        humans = sum(1 for x in guild.members if not x.bot)
        members = guild.member_count

        message = GUILD_STATUS_MESSAGE.format(
            type="Joined", 
            guild=guild, 
            bots=bots,
            humans=humans
        )
        log.info(message)
        await self.webhook.send("```\n%s\n```" % message)


    @commands.Cog.listener()
    async def on_guild_remove(self, guild):

        bot_count = sum(1 for x in guild.members if x.bot)
        human_count = sum(1 for x in guild.members if not x.bot)
        member_count = guild.member_count
        message = GUILD_STATUS_MESSAGE.format(
            type="Left", 
            guild=guild, 
            bots=bots,
            humans=humans
        )
        log.info(message)
        await self.webhook.send("```\n%s\n```" % message)
        await self.bot.update()

    @commands.Cog.listener()
    async def on_command(self, ctx):
        if ctx.guild:
            MESSAGE = GUILD_COMMAND_MESSAGE.format(ctx=ctx)
        else:
            MESSAGE = COMMAND_MESSAGE.format(ctx=ctx)
        self.bot.command_usage[ctx.command.qualified_name] += 1
        log.info(MESSAGE)
        await self.webhook.send("```yaml\n%s\n```" % MESSAGE)


    @commands.Cog.listener() # TODO: add full error support, especiallty for Cooldown
    async def on_command_error(self, ctx, error):

        if hasattr(ctx.command, 'on_error'):
            return

        error = getattr(error, "original", error)

        ignored = (
            commands.UserInputError,
            commands.CommandNotFound,
            commands.MissingPermissions,
            commands.BotMissingPermissions,
            commands.NotOwner
        )

        if isinstance(error, ignored):
            return

        if isinstance(error, commands.NSFWChannelRequired):
            # https://discordpy.readthedocs.io/en/latest/ext/commands/api.html#discord.ext.commands.is_nsfw
            return await ctx.send("You can only use this command in a NSFW only channel!")

        if ctx.guild:
            payload = GUILD_MESSAGE.format(ctx=ctx, error=error)

        else:
            payload = DM_MESSAGE.format(ctx=ctx, error=error)

        log.error(payload)
        await self.webhook.send("```fix\n%s\n```" % payload)
        
def setup(bot):
    bot.add_cog(EventHandler(bot))
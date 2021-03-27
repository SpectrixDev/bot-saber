import discord, asyncio, time, datetime, random, json, aiohttp, logging, os, traceback, sys, math
from discord.ext import commands
from time import ctime
from os import listdir
from os.path import isfile, join

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

class Bot_Saber(commands.AutoShardedBot):
    def __init__(self):
        super().__init__(command_prefix=commands.when_mentioned_or("b!"),
                         owner_ids=[276707898091110400, 99819835273252864],
                         case_insensitive=True)

    async def update_activity(self):
        await self.change_presence(
            activity=discord.Activity(
                name=f"{len(self.guilds)} guilds | b!help",
                type=3,
                url="https://www.twitch.tv/SpectrixYT"))
        print("Updated presence")
        payload = {"server_count"  : len(self.guilds)}
        url = "https://discordbots.org/api/bots/753289892007510017/stats"
        headers = {"Authorization" : config["tokens"]["dbltoken"]}
        async with aiohttp.ClientSession() as aioclient:
            await aioclient.post(url,
                                data=payload,
                                headers=headers)
            print(f"Posted payload to Discord Bot List:\n{payload}")

    async def on_ready(self):
        print("=======================\nConnected\n=========")
        await self.update_activity()

    async def on_message(self, message):
        if message.author.bot:
            return
        await self.process_commands(message)

    async def on_guild_join(self, guild):
        await self.update_activity()
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

    async def on_guild_remove(self):
        await self.update_activity()

    async def on_command_error(self, ctx, error):
        """The event triggered when an error is raised while invoking a command.
        ctx   : Context
        error : Exception"""

        if hasattr(ctx.command, 'on_error'):
            return
            
        error = getattr(error, 'original', error)
        
        if isinstance(error, commands.MissingRequiredArgument):
            return await ctx.send("**❌ You didn't provide the required arguments, do b!help if you dunno what to do... <:thronking:503200655507456003>**")

        elif isinstance(error, commands.DisabledCommand):
            return await ctx.send(f'**❌ `{ctx.command}` has been disabled.**')

        elif isinstance(error, commands.NoPrivateMessage):
            try:
                return await ctx.author.send(f'**❌ `{ctx.command}` can not be used in Private Messages.**')
            except:
                pass
        elif isinstance(error, commands.BadArgument):
            if ctx.command.qualified_name == 'tag list':
                return await ctx.send('**❌ I could not find that member. Please try again.**')
        elif isinstance(error, commands.BotMissingPermissions):
            missing = [perm.replace('_', ' ').replace('guild', 'server').title() for perm in error.missing_perms]
            if len(missing) > 2:
                fmt = '{}, and {}'.format("**, **".join(missing[:-1]), missing[-1])
            else:
                fmt = ' and '.join(missing)
            _message = 'I need the **{}** permission(s) to run this command.'.format(fmt)
            return await ctx.send(_message)
        elif isinstance(error, commands.NotOwner):
            return await ctx.send('**❌ Only my owners can run that command.**')
        elif isinstance(error, commands.CommandOnCooldown):
            return await ctx.send(f"**❌ Woah there, that command is on a cooldown for {math.ceil(error.retry_after)} seconds**")
        elif isinstance(error, commands.CheckFailure) or isinstance(error, commands.MissingPermissions):
            return await ctx.send('**❌ You have insufficient permissions to run this command.**')
        
        print('Error in command: {}:'.format(ctx.command), file=sys.stderr)
        traceback.print_exception(type(error), error, error.__traceback__, file=sys.stderr)

    def initiate_start(self):
        with open("config/uptime.json", 'w+') as uptime:
            json.dump({"uptimestats" : str(datetime.datetime.utcnow())}, uptime)
        print("Uptime Posted!")
        self.remove_command('help')
        lst = [f for f in listdir("cogs/") if isfile(join("cogs/", f))]
        no_py = [s.replace('.py', '') for s in lst]
        startup_extensions = ["cogs." + no_py for no_py in no_py]
        try:
            for cogs in startup_extensions:
                self.load_extension(cogs)
                print(f"Loaded {cogs}")
            print("\nAll Cogs Loaded\n===============\nLogging into Discord...")
            super().run(config['tokens']['token'])
        except Exception as e:
            print(f"\n###################\nPOSSIBLE FATAL ERROR:\n{e}\n\n\
                    THIS MEANS THE BOT HAS NOT STARTED CORRECTLY!")

if __name__ == '__main__':
    Bot_Saber().initiate_start()

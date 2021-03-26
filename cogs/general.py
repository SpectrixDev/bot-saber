import discord, asyncio, random, time, datetime, json, aiohttp, requests
from discord.ext import commands
from discord.ext.commands.cooldowns import BucketType

with open("config/thesacredtexts.json") as f:
    config = json.load(f)

class General(commands.Cog):
    """ General-use commands """
    def __init__(self, bot):
        self.bot = bot
    
    @commands.cooldown(1, 5, BucketType.user)
    @commands.command()
    async def ping(self, ctx):
        """Pings the bot"""
        msg = await ctx.send("`Pinging bot latency...`")
        await msg.edit(content=f":ping_pong: **{round(self.bot.latency * 1000)}ms**")

    @commands.command()
    async def uptime(self, ctx):
        """See how long the bot has been online for"""
        file = open('config/uptime.json', "r")
        time = json.load(file)['uptimestats']
        uptimeraw = datetime.datetime.strptime(time, "%Y-%m-%d %H:%M:%S.%f")
        uptime = datetime.datetime.utcnow() - uptimeraw
        hours, remainder = divmod(int(uptime.total_seconds()), 3600)
        minutes, seconds = divmod(remainder, 60)
        days, hours = divmod(hours, 24)
        await ctx.send(f"{days}d, {hours}h, {minutes}m, {seconds}s")


    # Creds to zedchance for original template. Added more styling and subcommand checks.
    @commands.command(name='help',
                      description='Help command',
                      aliases=['info', 'commands'])
    async def help_command(self, ctx, *commands: str):
        """ Shows this message """
        bot = ctx.bot
        prefix = "b!"
        embed = discord.Embed(color=0xf03030)
        embed.set_author(name="Bot Saber Help", icon_url=config['styling']['logo'])
        embed.set_footer(text="Made by Spectrix and SamHep with love ❤", icon_url=config['styling']['logo'])

        def generate_usage(command_name):
            """ Generates a string of how to use a command """
            temp = f'{prefix}'
            command = bot.get_command(command_name)
            # Aliases
            if len(command.aliases) == 0:
                temp += f'{command_name}'
            elif len(command.aliases) == 1:
                temp += f'[{command.name}|{command.aliases[0]}]'
            else:
                t = '|'.join(command.aliases)
                temp += f'[{command.name}|{t}]'
            
            
            # Subcommands
            tempsubcommands = '<'
            for i in bot.walk_commands():
                if str(i).startswith(command.name) and len(str(i)) != len(command_name):
                    tempsubcommands += str(i)[len(command_name):] + '|'

            if tempsubcommands != '<':
                temp += ' ' + tempsubcommands[:-1].replace(" ", "") + '> <args>'
                return temp

            else:
                # Parameters
                params = f' '
                for param in command.clean_params:
                    params += f'<{command.clean_params[param]}> '
                temp += f'{params}'
                return temp

        def generate_command_list(cog):
            """ Generates the command list with properly spaced help messages """
            # Determine longest word
            max = 0
            for command in bot.get_cog(cog).get_commands():
                if not command.hidden:
                    if len(f'{command}') > max:
                        max = len(f'{command}')
            # Build list
            temp = ""
            for command in bot.get_cog(cog).get_commands():
                if command.hidden:
                    temp += ''
                elif command.help is None:
                    temp += f'{command}\n'
                else:
                    temp += f'• `b!{command}` - '
                    temp += f'{command.help}\n'
            return temp

        # Help by itself just lists our own commands.
        if len(commands) == 0:
            for cog in bot.cogs:
                temp = generate_command_list(cog)
                if temp != "":
                    embed.add_field(name=f'**{cog}**', value=temp, inline=False)
            embed.add_field(name=":information_source: More info:", value="- **Type `b!help command` for more info on a command.**\n"+
                                                    "- **You can also type `b!help category` for more info on a category.**\n\n"+
                                                    "🥰 **Like what you see? Vote for me on [top.gg](https://top.gg/bot/753289892007510017/vote)!\n\n"+
                                                    "🔰 [[Add me to your server]](https://discord.com/oauth2/authorize?client_id=753289892007510017&scope=bot&permissions=74837056)\n\n"+
                                                    "❓ [[Support server]](https://discord.gg/ehR2Qw4GgN)\n\n🛠 [[GitHub]](https://github.com/SpectrixDev/bot-saber)**")
        elif len(commands) == 1:
            # Try to see if it is a cog name
            name = commands[0].capitalize()
            command = None

            if name in bot.cogs:
                cog = bot.get_cog(name)
                msg = generate_command_list(name)
                embed.add_field(name=name, value=msg, inline=False)
                msg = f'{cog.description}\n'
                embed.set_footer(text=msg)

            # Must be a command then
            else:
                command = bot.get_command(name)
                if command is not None:
                    help = f''
                    if command.help is not None:
                        help = command.help
                    embed.add_field(name=f'**{command}**',
                                    value=f'{command.description}```{generate_usage(name)}```\n{help}',
                                    inline=False)
                else:
                    msg = ' '.join(commands)
                    embed.add_field(name="Not found", value=f'Command/category `{msg}` not found.')
        else:
            msg = ' '.join(commands)
            embed.add_field(name="Not found", value=f'Command/category `{msg}` not found.')

        await ctx.send(f'{ctx.author.mention}', embed=embed)
        return

def setup(bot):
    bot.add_cog(General(bot))
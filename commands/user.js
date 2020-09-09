const { Message } = require("discord.js");
const rp = require('request-promise');

module.exports = {
	name: 'user',
	description: 'Returns the user profile from scoresaber,',
	args: true,
	usage: 'b!user <Scoresaber ID>',
	
	async execute(msg, args) { // for args, the id can be a steam id, so we need to maybe make a search feature where you can put steam username and get steam ID numbers
        const options = {
			uri: 'https://scoresaber.com/u/',
			headers: headers,};
		await rp(args)
			.then(html => {
				const ul = $('.columns .column:not(.is-narrow) ul', html)[0];

				const rankingLi = $('strong:contains("Player Ranking:")', ul).parent().slice(0, 1);
				const links = $('a', rankingLi);

				const regionLink = links.slice(-1).attr('href');
				region = regionLink.slice(-2);

				const rankingAnchors = $('li:first-child a', ul);
				globalRank = Number(rankingAnchors.slice(0, 1).text().slice(1).replace(',', ''));
				regionRank = Number(rankingAnchors.slice(1, 2).text().slice(2).replace(',', ''));

				const ppLi = $('strong:contains("Performance Points:")', ul).parent().slice(0, 1);

				pp = Number(ppLi.text().replace('pp', '').replace(/\s/g, '').replace('PerformancePoints:', '').replace(',', ''));
				name = $('.title.is-5 a', html).text().trim();
			})
			.catch(err => {
				console.log(err);
			});
        msg.channel.send(`${regionRank}\n ${region}\n, ${globalRank}\n, ${pp}\n, ${name}\n`);
	}};
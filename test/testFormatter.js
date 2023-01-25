const { formatDiscordMessage, formatTwitterMessage } = require('../utils/format');

const mockTwitterClient = {
	v1: {
		uploadMedia: async function(cardPath) {
			console.log("mocked uploadMedia(): " + cardPath)
			return "unit-test";
		}
	}
}

const assert = require("assert");

const singleSale = {
	data: { '29': 1 },
	totalPrice: 0.38,
	buyer: '0x6fa4b81c3d7df392432bb568e648794aa69885d6',
	seller: '0xf508d9916cb4c0e02bce766d580c15bea1090f08',
	ethPrice: 1543.9826453736796,
	token: 'ETH',
	platforms: [ 'OpenSea' ]
};

describe("Formatter", function () {
	this.timeout(10_000);

	describe("formatDiscordMessage()", function () {
		it("should format single sales correctly", async function () {
			const discordMsg = await formatDiscordMessage(singleSale);

			assert.equal(discordMsg.username, 'Peperium Sales')
			assert.equal(discordMsg.embeds[0].title, 'UNDEADPEPE')
			assert.equal(discordMsg.embeds[0].description, 'Platform: **OpenSea**\nBuyer: **Skyjuice**\nSeller: **Lamborghinis**\n---------------------------------')
			assert.equal(discordMsg.embeds[0].thumbnail.url, 'https://crypt0biwan.github.io/peperium-website/assets/ipfs/UNDEADPEPE.jpg')
			assert.equal(discordMsg.embeds[0].color, '0x4bea1d')
			assert.deepEqual(discordMsg.embeds[0].fields[0], {
				"name": "Quantity",
				"value": "1x UNDEADPEPE",
				"inline": true
			})
			assert.deepEqual(discordMsg.embeds[0].fields[1], {
				"name": "ETH",
				"value": "0.38",
				"inline": true
			})
		});
	});

	describe("formatTwitterMessage()", function () {
		it("should format single sales correctly", async function () {
			const [twitterMessage, mediaIds] = await formatTwitterMessage(mockTwitterClient, singleSale);
			const expectedMessage = `UNDEADPEPE bought for 0.38 ETH ($587) on OpenSea!\n\nhttps://opensea.io/assets/ethereum/0xfe880206214856f984d4f64fc89c26681dca15a2/29`;

			assert.equal(expectedMessage, twitterMessage);
			assert.equal(mediaIds.length, 1);
			assert.notEqual(mediaIds[0], null);
			assert.notEqual(mediaIds[0], "");
		});
	});
});
const COLORS = require('./colors')
const { getUsername } = require('./opensea')

const getImageURL = _card => {
	const card = parseInt(_card)
	let cardExt = ''

	if ([18,24].includes(card)) {
		return `artwork/UNKNOWN.png`
	} else if (card === 99) {
		return `artwork/TAOWARARE.jpg`
	} else if ([1,4,8,10,11,12,13,14,15,16,17,22,23,26,30].includes(card)) {
		cardExt = `.png`
	} else if ([20,31].includes(card)) {
		cardExt = `.gif`
	} else {
		cardExt = `.jpg`
	}	

	return `ipfs/${getCardName(card)}${cardExt}`
}

const getCardName = _card => {
	let cards = []

	cards[1] = 'KFPEPE'
	cards[2] = 'PEPESTREET'
	cards[3] = 'ZENPEPE'
	cards[4] = 'PEPRESSIONISM'
	cards[5] = 'PEPEBANKSY'
	cards[6] = 'MONAPEPE'
	cards[7] = 'LORDRARE'
	cards[8] = 'BASEBALLPEPE'
	cards[9] = 'BATPEPE'
	cards[10] = 'HOTDOGPEPE'
	cards[11] = 'KINGRARE'
	cards[12] = 'ACCEPTRARE'
	cards[13] = 'NEVERENDINGPEPE'
	cards[14] = 'PEPEGOD'
	cards[15] = 'PEPEGOLD'
	cards[16] = 'NEWPEPE'
	cards[17] = 'PEPETTE'
	cards[18] = 'VAPORPEPE'
	cards[19] = 'PEPESTENCIL'
	cards[20] = 'GlitchPepe'
	cards[21] = 'PEPERIUMCLASSIC'
	cards[22] = 'CHILLPEPE'
	cards[23] = 'RUINSOFPEPE'
	cards[24] = 'GIGERPEPECITY'
	cards[25] = 'PEPEZEUSLIGHT'
	cards[26] = 'CRIMEANDPEPESHMENT'
	cards[27] = 'PEPENEMSTEAK'
	cards[28] = 'RPALPHASTIK'
	cards[29] = 'UNDEADPEPE'
	cards[30] = 'MHV'
	cards[31] = 'PBJCAT'
	cards[99] = 'TAOWARARE'

	return cards[parseInt(_card)]
}

// style = currency to include dollar sign
const formatValue = (value, decimals = 2, style = 'decimal') =>
	new Intl.NumberFormat('en-US', {
		style,
		currency: 'USD',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}).format(value)

const formatDiscordMessage = async ({ data, totalPrice, buyer, seller, ethPrice, token, platforms }) => {
	const buyerUsername = await getUsername(buyer)
	const sellerUsername = (seller === "Multiple") ? "Multiple" : await getUsername(seller)
	
	let quantities = []
	for (const [card, qty] of Object.entries(data)) {
		quantities.push(`${qty}x ${getCardName(card)}`);
	}
	const cards = Object.keys(data);
	const card = cards[0];

	const contract = "0xfe880206214856f984d4f64fc89c26681dca15a2";
	const url = 
		platforms[0] === 'LooksRare'
		? `https://looksrare.org/collections/${contract}/${card}`
		: `https://opensea.io/assets/ethereum/${contract}/${card}`;
	let fields = [
		{
			name: 'Quantity',
			value: quantities.join("\n"),
			inline: true,
		},
		{
			name: token,
			value: formatValue(parseFloat(totalPrice), 2),
			inline: true,
		}
	];

	let title = "";
	if (cards.length > 1) {
		title = `Multiple cards bought`;
	} else {
		title = `${getCardName(card)}`;
	}

	if(['ETH', 'WETH'].includes(token)) {
		fields.push({
			name: 'USD',
			value: formatValue(parseFloat(totalPrice * ethPrice), 0),
			inline: true,
		})
	}
	return {
		username: 'Peperium Sales',
		embeds: [
			{
				title: title,
				description: `${platforms.length > 1 ? "Platforms" : "Platform"}: **${platforms.join(", ")}**\nBuyer: **${buyerUsername}**\nSeller: **${sellerUsername}**\n---------------------------------`,
				url,
				thumbnail: {
					url: `https://crypt0biwan.github.io/peperium-website/assets/${getImageURL(card)}`
				},
				color: COLORS.GREEN,
				fields,
				timestamp: new Date()
			}
		]
	}
}

async function uploadMedia(twitterClient, _card) {
	mediaId = await twitterClient.v1.uploadMedia(`images/${getImageURL(_card)}`);

	return mediaId;
}

const formatTwitterMessage = async (twitterClient, { data, totalPrice, buyer, seller, ethPrice, token, platforms }) => {
	let twitterMessage;
	let mediaIds = [];
	let totalPriceString = formatValue(totalPrice, 2)

	if (Object.keys(data).length == 1) {
		let totalPriceUsdString = "";
		if(['ETH', 'WETH'].includes(token)) {
			totalPriceUsdString = `(${formatValue(totalPrice * ethPrice, 0, 'currency')}) `;
		}

		let platformString = "";
		if (platforms.length > 1) {
			platformString = `on ${platforms[0]}!`;
		} else if (platforms.length > 0) {
			platformString = `on ${platforms.join(", ")}!`;
		}

		const cardNum = Object.keys(data)[0];
		const cardCount = Object.values(data)[0];
		let qtyString = "";
		if (cardCount > 1) {
			qtyString = `${cardCount}x `;
		}

		twitterMessage = `${qtyString}${getCardName(cardNum)} bought for ${totalPriceString} ${token} ${totalPriceUsdString}${platformString}\n\nhttps://opensea.io/assets/ethereum/0xfe880206214856f984d4f64fc89c26681dca15a2/${cardNum}`;

		mediaIds = [await uploadMedia(twitterClient, cardNum)];
	} else {
		let qtyString = Object.entries(data).map(q => {
			return `${q[1]}x ${getCardName(q[0])}`;
		}).join('\n');

		let totalPriceUsdString = "";
		if(['ETH', 'WETH'].includes(token)) {
			totalPriceUsdString = `(${formatValue(totalPrice * ethPrice, 0, 'currency')})`;
		}

		const cardNums = Object.keys(data).slice(0, 4);

		twitterMessage = `Multiple cards sold for a total of ${totalPriceString} ${token} ${totalPriceUsdString}!\n${qtyString}`;
		mediaIds = await Promise.all(cardNums.map(card => uploadMedia(twitterClient, card)));
	}

	return [twitterMessage, mediaIds];
}

module.exports = exports = {
	getCardName,
	formatDiscordMessage,
	formatTwitterMessage,
}

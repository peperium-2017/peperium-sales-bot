const { handlePeperiumTransfer, getPeperiumEventsFromBlock } = require("../utils/watcher.js");
const { getUsername } = require("../utils/opensea");

const assert = require("assert");

const mockOpenSeaClient = (address) => {
	return new Promise((resolve, reject) => {
		if (address == "0x49468f702436d1e590895ffa7155bcd393ce52ae")
			resolve({
				data: {
					username: "mockUsername",
					account: {
						user: {
							username: "mockUsername"
						}
					}
				}
			});
		else
			resolve({
				data: {
					username: null,
				}
			});
	});
}

describe("Watcher", function () {
	this.timeout(10_000);

	describe("handlePeperiumTransfer()", function () {
		it("should correctly find the single UNDEADPEPE transfer in block 16481215", async function () {
			const events = await getPeperiumEventsFromBlock(16481215);
			assert.equal(events.length, 1);

			const details = await handlePeperiumTransfer(events[0])
			assert.deepEqual(details.data, {"29": 1})
			assert.equal(details.totalPrice, 0.38);
		});
	});

	describe("handleSeaportSales()", function() {
		it("should return the correct numbers for an ETH sale", async function () {
			const details = await handlePeperiumTransfer({
				transactionHash: '0x6eee954815383d963c92a6ec49614ed2b8e11e54454f02ebddb1745dcd3bf89b'
			})

			assert.deepEqual(details.data, {"29": 1})
			assert.equal(details.token, "ETH");
			assert.equal(details.totalPrice, "0.2999");
		})

		it("should return the correct numbers for a WETH sale", async function () {
			const details = await handlePeperiumTransfer({
				transactionHash: '0xb065d78c206e3deda3393ce92f9968d7fd3eeb1a9d59698648fec27d43d8e64a'
			})

			assert.deepEqual(details.data, {"99": 1})
			assert.equal(details.token, "WETH");
			assert.equal(details.totalPrice, "0.6777");
		})
	})

	describe("handleSeaport_1_5_Sales()", function() {
		it("should return the correct numbers for an ETH sale", async function () {
			const details = await handlePeperiumTransfer({
				transactionHash: '0x5735015d88c354f1345c4a61fb3139cadc53840b92b6bb02a1013f543f0db8a8'
			})

			assert.equal(details.token, "ETH");
			assert.equal(details.totalPrice, "1.3299999999999998");
		})

		it("should return the correct numbers for a WETH sale", async function() {
			const details = await handlePeperiumTransfer({
				transactionHash: '0x0932563458a9b95aaf5b5bd9ab813d10558dd0d892b05103c4b75b6cd1b47d40'
			})

			assert.deepEqual(details.data, {"20": 1})
			assert.equal(details.token, "WETH")
			assert.equal(details.totalPrice, "0.1")
		})		
	})

	describe("getOpenseaUsername()", function () {
		it("should correctly find the username corresponding to ETH address 0x49468f702436d1e590895ffa7155bcd393ce52ae", async function () {
			const username = await getUsername(mockOpenSeaClient, "0x49468f702436d1e590895ffa7155bcd393ce52ae");

			assert.equal(username, "mockUsername");
		});

		it("should correctly return a formatted ETH address when there's no username available", async function () {
			const username = await getUsername(mockOpenSeaClient, "0xbebf173c83ad4c877c04592de0c38567abf66526");

			assert.equal(username, "0xbeb...526");
		});
	});	
});

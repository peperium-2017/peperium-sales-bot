const { handlePeperiumTransfer, getPeperiumEventsFromBlock } = require("../utils/watcher.js");
const { getUsername } = require("../utils/opensea");

const assert = require("assert");

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

			// 8 decimals so 1 equals 100000000
			assert.deepEqual(details.data, {"99": 100000000})
			assert.equal(details.token, "WETH");
			assert.equal(details.totalPrice, "0.6777");
		})
	})

	describe("getOpenseaUsername()", function () {
		it("should correctly find the username corresponding to ETH address 0x49468f702436d1e590895ffa7155bcd393ce52ae", async function () {
			const username = await getUsername("0x49468f702436d1e590895ffa7155bcd393ce52ae");

			assert.equal(username, "crypt0biwan");
		});

		it("should correctly return a formatted ETH address when there's no username available", async function () {
			const username = await getUsername("0xbebf173c83ad4c877c04592de0c38567abf66526");

			assert.equal(username, "0xbeb...526");
		});
	});	
});

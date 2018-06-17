const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('reactions.js');

// exports.name        = `addreaction`;
// exports.description = `adds a new reaction option\n usage: ${global.prefix}addreaction [keyword] [reaction text/image]`;
// exports.call        = addReactionCommand;

class ReactionHandler {
	constructor(){
		this.reactionList = [];

		this.dirName = require('path').join(__dirname, 'reactions.json');
		this.loadReactions();
		// log(this.reactionList);
	}

	async loadReactions(){
		log('loading reactions');
		let reactionList;
		reactionList = await utils.readJSON(this.dirName);
		log("%o", Object.keys(reactionList));
		log(Object.keys(reactionList).length);
		log('reactions loaded!');
		this.reactionList = reactionList;
		return reactionList;
	}

	evaluate(messageObject){
		log('\t\t reactionEvaluate');
		const reaction = this.getReaction(messageObject.key);
		messageObject.reply(reaction);
		return reaction;
	}

	async updateReactionList(){
		log('updateReactionList');
		await utils.writeJSON(this.dirName, this.reactionList);
		this.loadReactions();
	}

	createReaction(reaction) {
		this.reactionList[reaction] = [];
		this.updateReactionList();
	}

	deleteReaction(reaction) {
		this.reactionList[reaction] = null;
		this.updateReactionList();
	}

	async addReactionEntry(reaction, entry) {
		log('addReactionEntry');
		const r = this.reactionList[reaction] || this.createReaction(reaction);
		r.push(entry);
		await this.updateReactionList();
	}

	async addReactionEntries(reaction, entries) {
		log('addReactionEntries');
		for(let i = 0; i < entries.length; i++){
			await this.addReactionEntry(reaction, entries[i]);
		}
	}

	getReactionEntries(reaction) {
		return this.reactionList[reaction] || 'invalid reaction';
	}

	removeReactionEntry(reaction, entry) {
		const rEntryList = this.getReactionEntries(reaction);
		const index = rEntryList.indexOf(entry);
		log('rEntryList:%O', rEntryList);
		log('index:%O', index);
		log('rEntryList[index]:%O', rEntryList[index]);
		if (index > -1) {
		  rEntryList.splice(index, 1);
		}

		this.updateReactionList();
	}

	getReaction(reaction){
		// log('this.reactionList:%o', this.reactionList);
		log('reaction:%o', reaction);
		log('this.reactionList[reaction]:%o', this.reactionList[reaction]);
		const reactionEntry = utils.getRandomItem(this.reactionList[reaction]) || ['invalid reaction'];
		log(reactionEntry);
		// const i = Math.floor(Math.random() * list.length);
		return reactionEntry;
	}

}

module.exports = new ReactionHandler();
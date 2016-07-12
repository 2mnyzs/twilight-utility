/*
	Main Javascript page, the first function() is shorthand(in jquery) for document on ready.
	This means everything inside won't fire until the page is loaded(which is important since you can't manipulate elements if they aren't loaded yet!).
*/

$(function(){
var tech_data = [{"id":0,"name":"Enviro Compensator","description":"+1 production capacity of your Space Docks","race__id":null,"race_cost":0,"color__id":0,"pre_requisite__ids":[],"post_requisite__ids":[2,8],"all_pre_requisites_req":null,"expansion__id":null},{"id":1,"name":"TransFabrication","description":"May scuttle units at the start of the Produce Units step. Each non-fighter/non-ground force unit you scuttle will provide +1 trade good. Units scuttled may not be reproduced the same turn.","race__id":null,"race_cost":0,"color__id":0,"pre_requisite__ids":[],"post_requisite__ids":[27],"all_pre_requisites_req":null,"expansion__id":0},{"id":2,"name":"Sarween Tools","description":"Whenever you produce units at any Space Dock, you now receive +1 resource with which to produce.","race__id":null,"race_cost":0,"color__id":0,"pre_requisite__ids":[0],"post_requisite__ids":[3,5],"all_pre_requisites_req":false,"expansion__id":null},{"id":3,"name":"Micro Technology","description":"When you receive Trade Goods from your trade agreements, you now receive +1 Trade Good for each active Trade Agreement.","race__id":null,"race_cost":0,"color__id":0,"pre_requisite__ids":[2,8],"post_requisite__ids":[4,10],"all_pre_requisites_req":false,"expansion__id":null},{"id":4,"name":"Integrated Economy","description":"When producing units, place them in any activated adj. system that is empty or friendly. Place PDS and Ground Forces on any friendly planet in range.","race__id":null,"race_cost":0,"color__id":0,"pre_requisite__ids":[3,9],"post_requisite__ids":[],"all_pre_requisites_req":true,"expansion__id":null},{"id":5,"name":"Nano Technology","description":"Dreadnaughts and War Suns can't be targeted by Action Cards. When you claim a planet, you gain it refreshed.","race__id":null,"race_cost":0,"color__id":0,"pre_requisite__ids":[2],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":1},{"id":6,"name":"Graviton Laser System","description":"PDS get one re-roll for each missed combat roll.","race__id":null,"race_cost":0,"color__id":0,"pre_requisite__ids":[25],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":null},{"id":7,"name":"Transit Diodes","description":"As an action, you may spend 1 Command Counter from your Strategic Allocation to immediately move up to 4 Ground Forces to a planet you control.","race__id":null,"race_cost":0,"color__id":0,"pre_requisite__ids":[13,23],"post_requisite__ids":[15],"all_pre_requisites_req":false,"expansion__id":null},{"id":8,"name":"Stasis Capsules","description":"Cruisers and Dreadnaughts can carry one Ground Force.","race__id":null,"race_cost":0,"color__id":1,"pre_requisite__ids":[0],"post_requisite__ids":[3,9,10],"all_pre_requisites_req":false,"expansion__id":null},{"id":9,"name":"Cybernetics","description":"Fighters receive +1 on all combat rolls.","race__id":null,"race_cost":0,"color__id":1,"pre_requisite__ids":[8,16],"post_requisite__ids":[4,12,31],"all_pre_requisites_req":false,"expansion__id":null},{"id":10,"name":"Neural Motivator","description":"Draw one extra Action Card during each Status Phase.","race__id":null,"race_cost":0,"color__id":1,"pre_requisite__ids":[3,8],"post_requisite__ids":[11,13,20],"all_pre_requisites_req":false,"expansion__id":null},{"id":11,"name":"Neutral Computing","description":"Your cost to purchase new Technologies is reduced by 2.","race__id":null,"race_cost":0,"color__id":1,"pre_requisite__ids":[10],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":0},{"id":12,"name":"Gen Synthesis","description":"Ground Forces receive +1 during Invasion Combat. When destroyed, roll +5 to return to home system.","race__id":null,"race_cost":0,"color__id":1,"pre_requisite__ids":[9],"post_requisite__ids":[14],"all_pre_requisites_req":false,"expansion__id":null},{"id":13,"name":"Dacxive Animators","description":"If you win an Invasion Combat, place one Ground Force for every force lost (both sides, on a role +6) on the planet from your reinforcements.","race__id":null,"race_cost":0,"color__id":1,"pre_requisite__ids":[10],"post_requisite__ids":[7,28],"all_pre_requisites_req":false,"expansion__id":null},{"id":14,"name":"Hyper Metabolism","description":"During each Status Phase, gain 1 additional Command Counter. Before drawing an Action Card, you may discard 1 and draw a new one.","race__id":null,"race_cost":0,"color__id":1,"pre_requisite__ids":[12],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":1},{"id":15,"name":"X-89 Bacterial Weapon","description":"Dreadnaughts or War Sun units may now immediately destroy all enemy Ground Forces on the planet, then discard all of your Action Cards.","race__id":null,"race_cost":0,"color__id":1,"pre_requisite__ids":[7],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":null},{"id":16,"name":"Antimass Deflectors","description":"All ships may pass through asteroid fields, but can not stop in one.","race__id":null,"race_cost":0,"color__id":2,"pre_requisite__ids":[],"post_requisite__ids":[9,17,18],"all_pre_requisites_req":false,"expansion__id":null},{"id":17,"name":"Gravity Drive","description":"Don't roll when moving out of a Gravity Rift. When ships begin movement adjacent to a Gravity Rift or Wormhole, they receive +1 movement.","race__id":null,"race_cost":0,"color__id":2,"pre_requisite__ids":[16],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":0},{"id":18,"name":"XRD Transporters","description":"Carriers receive +1 movement.","race__id":null,"race_cost":0,"color__id":2,"pre_requisite__ids":[16],"post_requisite__ids":[19,20,23],"all_pre_requisites_req":false,"expansion__id":null},{"id":19,"name":"Maneuvering Jets","description":"Opponents receive -1 on all PDS rolls, -2 if from an adjacent system.","race__id":null,"race_cost":0,"color__id":2,"pre_requisite__ids":[18],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":1},{"id":20,"name":"Type IV Drive","description":"Cruisers and Dreadnaughts receive +1 movement.","race__id":null,"race_cost":0,"color__id":2,"pre_requisite__ids":[18,10],"post_requisite__ids":[21],"all_pre_requisites_req":true,"expansion__id":null},{"id":21,"name":"Advanced Fighters","description":"Your Fighters may now move independently with a movement of 2 and receive +1 on all combat rolls. Independent fighters count towards fleet supply.","race__id":null,"race_cost":0,"color__id":2,"pre_requisite__ids":[20],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":null},{"id":22,"name":"Fleet Logistics","description":"When taking a Tactical Action, you may now take 2 Tactical Actions, one after the other, before your turn ends.","race__id":null,"race_cost":0,"color__id":2,"pre_requisite__ids":[28],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":null},{"id":23,"name":"Light Wave Deflector","description":"All ships may move through systems containing enemy ships and continue their movement to the activated system.","race__id":null,"race_cost":0,"color__id":2,"pre_requisite__ids":[18,30],"post_requisite__ids":[7],"all_pre_requisites_req":true,"expansion__id":null},{"id":24,"name":"Hylar V Assault Laser","description":"Cruisers and Destroyers receive +1 in all combat rolls.","race__id":null,"race_cost":0,"color__id":3,"pre_requisite__ids":[],"post_requisite__ids":[25,29],"all_pre_requisites_req":false,"expansion__id":null},{"id":25,"name":"Deep Space Cannon","description":"Enemy fleets in adjacent systems are now in range of your PDS.","race__id":null,"race_cost":0,"color__id":3,"pre_requisite__ids":[24],"post_requisite__ids":[6,26,27,30],"all_pre_requisites_req":false,"expansion__id":null},{"id":26,"name":"Duranium Armor","description":"At the end of each round of combat, you may repair 1 of your damaged units in the battle.","race__id":null,"race_cost":0,"color__id":3,"pre_requisite__ids":[25],"post_requisite__ids":[],"all_pre_requisites_req":false,"expansion__id":0},{"id":27,"name":"War Sun","description":"You are now allowed to produce War Sun units.","race__id":null,"race_cost":0,"color__id":3,"pre_requisite__ids":[25,1],"post_requisite__ids":[],"all_pre_requisites_req":true,"expansion__id":null},{"id":28,"name":"Graviton Negator","description":"Dreadnaughts may bombard planets with PDS. Fighters may participate in Invasion Combat(return to space after combat).","race__id":null,"race_cost":0,"color__id":3,"pre_requisite__ids":[13,31],"post_requisite__ids":[22],"all_pre_requisites_req":false,"expansion__id":null},{"id":29,"name":"Automated Defense Turrets","description":"Destroyers receive +2 and roll an additional die for Anti-Fighter Barrage.","race__id":null,"race_cost":0,"color__id":3,"pre_requisite__ids":[24],"post_requisite__ids":[31],"all_pre_requisites_req":false,"expansion__id":1},{"id":30,"name":"Magan Defense Grid","description":"PDS receive +1 on all combat rolls. Ground Forces with PDS get +1 on all combat rolls during Invasion Combat.","race__id":null,"race_cost":0,"color__id":3,"pre_requisite__ids":[25],"post_requisite__ids":[23],"all_pre_requisites_req":false,"expansion__id":null},{"id":31,"name":"Assault Cannon","description":"Dreadnaughts get on free shot before any Space Battle.","race__id":null,"race_cost":0,"color__id":3,"pre_requisite__ids":[29,9],"post_requisite__ids":[28],"all_pre_requisites_req":true,"expansion__id":null}];

var race_data = [
   {
	  "id":1,
	  "name":"Sardakk N'orr"
   },
   {
	  "id":2,
	  "name":"Mentalk Coalition"
   },
   {
	  "id":3,
	  "name":"Universities of Jol-Nar"
   },
   {
	  "id":4,
	  "name":"Embers of Muaat"
   },
   {
	  "id":5,
	  "name":"Barony of Letnev"
   },
   {
	  "id":6,
	  "name":"Lazax"
   },
   {
	  "id":7,
	  "name":"L1Z1x Mindnet"
   },
   {
	  "id":8,
	  "name":"Naalu Collective"
   },
   {
	  "id":9,
	  "name":"Emirates of Hacan"
   },
   {
	  "id":10,
	  "name":"The Winnu"
   },
   {
	  "id":11,
	  "name":"Clan of Saar"
   },
   {
	  "id":12,
	  "name":"Yin Brotherhood"
   },
   {
	  "id":13,
	  "name":"The Arborec"
   },
   {
	  "id":14,
	  "name":"The Ghosts of Creuss"
   },
   {
	  "id":15,
	  "name":"The Nekro Virus"
   },
   {
	  "id":16,
	  "name":"Yssaril Tribes"
   },
   {
	  "id":17,
	  "name":"Xxcha Kingdom"
   }
];

var color_data = [
	{
		"id":"0",
		"name":"Yellow",
		"hex":"#FFFF00",
		"description":"Economy"
	},
	{
		"id":"1",
		"name":"Green",
		"hex":"#00FF00",
		"description":"Utility"
	},
	{
		"id":"2",
		"name":"Blue",
		"hex":"#0000FF",
		"description":"Movement"
	},
	{
		"id":"3",
		"name":"Red",
		"hex":"#FF0000",
		"description":"Combat"
	}
];

var expansion_data = [
	{
		"id": "0",
		"name":"Shards of the Throne"
	},
	{
		"id": "1",
		"name":"Shattered Empire"
	}
];
	var colors = function(data){
		var colors = data;
		return {
			getColorById: function(id){
				for(var index in colors){
					if(colors[index].id == id){
						return colors[index];
					}
				}
				return false;
			}
		};
	}
	var races = function(data){
		var races = data;
		return {
			getRaceById: function(id){
				for(var index in races){
					if(races[index].id == id){
						return techs[index];
					}
				}
				return false;
			}
		};
	}
	var expansions = function(data){
		var expansions = data;
		return {
			getExpansionById: function(id){
				for(var index in expansions){
					if(expansions[index].id == id){
						return expansions[index];
					}
				}
				return false;
			}
		};
	}

	var techs = function(data){
		var techs = [];

		function getTechById(id){
			for(var index in techs){
				if(techs[index].id == id){
					return techs[index];
				}
			}
			return false;
		}
		//tech object closure
		var tech = function (data){
			var id = data.id,
				name = data.name,
				description = data.description,
				race__id = data.race__id,
				race_cost = data.race_cost,
				color__id = data.color__id,
				pre_requisite__ids = data.pre_requisite__ids,
				post_requisite__ids = data.post_requisite__ids,
				all_pre_requisites_req = data.all_pre_requisites_req,
				expansion__id = data.expansion__id;

			return {
				id: id,
				name: name,
				description: description,
				race_cost: race_cost,
				all_pre_requisites_req: all_pre_requisites_req,
				getChildren: function(){
					var children = [];
					for(var index in pre_requisite__ids){
						children.push(getTechById(pre_requisite__ids[index]));
					}
					return children;
				},
				getParents: function(){
					var parents = [];
					for(var index in post_requisite__ids){
						parents.push(getTechById(post_requisite__ids[index]));
					}
					return parents;
				},
				getColor: function(colors){
					return colors.getColorById(color__id);
				},
				getRace: function(races){
					return races.getRaceById(race__id);
				},
				getExpansion: function(expansions){
					return expansions.getExpansionById(expansion__id);
				}
			};
		}

		for(var index in data){
			var tmp = new tech(data[index])
			techs.push(tmp);
		}
		return {
			techs: techs,
			getTechById: getTechById
		};      
	}
	var techs = techs(tech_data);
	var races = races(race_data);
	var colors = colors(color_data);
	var expansions = expansions(expansion_data);
	console.log('test');
});

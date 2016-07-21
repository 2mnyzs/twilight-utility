/*
	Main Javascript page, the first function() is shorthand(in jquery) for document on ready.
	This means everything inside won't fire until the page is loaded(which is important since you can't manipulate elements if they aren't loaded yet!).
*/

$(function(){
	//gets data from JSON files, calls createMainDisplay after getting/formatting data and creating the closures
	initializeData();
});

function createMainDisplay(colors,techs_controller,races,expansions){
	var mobile_view = $(window).width() < 992 ? true : false;
	mobile_view = true; //please don't forget to kill me

	if(mobile_view){
		var view_state = 'list'; //maybe kill me too
		// BEGIN LIST VIEW
		function refreshListView(){
			$('#view-list-panel').html('');

			var techs = techs_controller.getTechs();
			for(var index in techs){
				var tech = techs[index];
				var color = tech.getColor(colors);
				color = color.border_class;
				var content = "<div class='panel panel-default "+color+"'><div class='panel-heading'><h3 class='panel-title'>"+tech.name;
					content+= "</h3></div><div class='list panel-body'>"+tech.description+"</div></div>";
				$('#view-list-panel').append(content);
			}
			$('#view-list-panel').on('click', '.panel-heading', function(event){
				$(this).siblings('.panel-body').toggle();
				$(this).parents('.panel').siblings().find('.panel-body').hide();
			});
		}
		refreshListView();
		// END LIST VIEW

		// BEGIN TREE VIEW
		var tree = function(){

			function addBranches(tech__id){
				if(tech__id!=null){
					var tech = techs_controller.getTechById(tech__id);
					var children = tech.getChildren();
				}else{
					var children = techs_controller.getRoots();
				}
				var width_class = "col-xs-"+(12/children.length);
				var row = "<div class='branches row'>";
				for(var index in children){
					var child = children[index];
					var color = child.getColor(colors);
					color = color.background_class;
					var name = children.length > 3 ? child.name_short : child.name;
					var req = child.all_pre_requisites_req == true ? 'multiple-required' : '';
					row += "<div class='"+width_class+" "+color+" "+req+" branch' data-tech-id='"+child.id+"'>"+name+"</div>";
				}
				row+="</div>";
				$('#tree-root').append(row);
			}
			addBranches();

			return {
				addBranches: addBranches
			}
		}
		tree = tree();


		$('#view-tree-panel').on('click', '.branch', function(event){
			$(this).parent().nextAll().remove();
			$(this).addClass('path').siblings().removeClass('path');

			var tech__id = $(this).data('tech-id');
			tree.addBranches(tech__id);
		});
		// END TREE VIEW

		// BEGIN NAVIGATION
		$('.tab-pane').on('swipeleft swipeleftdown swipeleftup', function(event){
			var rightTab = $(this).data('right-tab');
			$('#'+rightTab).tab('show');
		});
		$('.tab-pane').on('swiperight swiperightdown swiperightup', function(event){
			var leftTab = $(this).data('left-tab');
			$('#'+leftTab).tab('show');
		});
		// END NAVIGATION

		// BEGIN FILTERING

		// COLORS
		$.each(colors.getColors(), function(){
			$('#color-buttons').append("<button type='button' class='btn "+this.background_class+"' data-color-id='"+this.id+"'>"+this.name+"</button>");
		});
		$('#color-buttons').on('click', 'button', function(event){
			var color__id = $(this).data('color-id');

			//if this color is the sole remaining color that hasn't been filtered, clera the filter
			if($('#color-buttons>.btn:not(.filter-me)').length == 1){
				techs_controller.clearColorFilter();
				$('#color-buttons>.btn.filter-me').removeClass('filter-me');
				refreshListView();
			}else{
				techs_controller.toggleColorFilter(color__id);
				$(this).toggleClass('filter-me');
				refreshListView();
			}
		});

		// Expansions
		$.each(expansions.getExpansions(), function(){
			$('#expansion-buttons').append("<button type='button' class='btn btn-default' data-expansion-id='"+this.id+"'>"+this.name+"</button>");
		});
		$('#expansion-buttons').on('click', 'button', function(event){
			var expansion__id = $(this).data('color-id');

			techs_controller.toggleExpansionOwnership(expansion__id);
			$(this).toggleClass('filter-me');
			refreshListView();
		});
		// END FILTERING
	}else{

	}

}

function initializeData(){
	var colors = function(data){
		var colors = data;
		return {
			getColors: function(){
				return colors;
			},
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
			getRaces: function(){
				return races;
			},
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
			getExpansions: function(){
				return expansions;
			},
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
		var filter_colors = [];
		var filter_expansions = [];
		var filter_ownership = [];

		function getTechById(id){
			for(var index in techs){
				if(techs[index].id == id){
					return techs[index];
				}
			}
			return false;
		}

		function getFilteredTechs(){
			//make copy of master tech array
			var filtered_techs = techs.slice();

			//run color filter
			if(filter_colors.length){
				for(var i = filtered_techs.length - 1; i >=0; i--){
					var tech_color__id = filtered_techs[i].color__id;
					if(filter_colors.indexOf(tech_color__id) != -1){
						filtered_techs.splice(i, 1);
					}
				}
			}
			if(filter_expansions.length){
				for( var index in filtered_techs){
					var expansion__id = filtered_techs[index].expansion__id;
					if(filter_expansions.indexOf(expansion__id) != -1){
						filtered_techs.splice(index, 1);
					}
				}
			}
			if(filter_ownership.length){
				for( var index in filtered_techs){
					var tech__id = filtered_techs[index].id;
					if(filter_ownership.indexOf(tech__id) != -1){
						filtered_techs.splice(index, 1);
					}
				}
			}
			return filtered_techs;
		}

		//tech object closure
		var tech = function (data){
			var id = data.id,
				name = data.name,
				name_short = data.name_short,
				description = data.description,
				race__id = data.race__id,
				race_cost = data.race_cost,
				color__id = data.color__id,
				pre_requisite__ids = data.pre_requisite__ids,
				post_requisite__ids = data.post_requisite__ids,
				all_pre_requisites_req = data.all_pre_requisites_req,
				expansion__id = data.expansion__id;

			function getParents(){
				var parents = [];
				for(var index in pre_requisite__ids){
					parents.push(getTechById(pre_requisite__ids[index]));
				}
				return parents;
			}

			function getChildren(){
				var children = [];
				for(var index in post_requisite__ids){
					children.push(getTechById(post_requisite__ids[index]));
				}
				return children;
			}

			return {
				id: id,
				name: name,
				name_short: name_short,
				description: description,
				race_cost: race_cost,
				all_pre_requisites_req: all_pre_requisites_req,
				race__id: race__id,
				color__id: color__id,
				expansion__id: expansion__id,
				//functions below
				getChildren: getChildren,
				getParents: getParents,
				hasChildren: function(){
					var children = getChildren();
					return children.length ? true : false;
				},
				hasParents: function(){
					var parents = getParents();
					return parents.length ? true : false;
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
			getTechs: getFilteredTechs,
			getTechById: getTechById,
			toggleColorFilter: function(color__id){
				if(isNumber(color__id)){
					if(filter_colors.indexOf(color__id) == -1){
						filter_colors.push(color__id);
					}else{
						filter_colors.splice(filter_colors.indexOf(color__id), 1);
					}
				}
			},
			clearColorFilter: function(){
				filter_colors = [];
			},
			toggleTechOwnership: function(tech__id){
				if(isNumber(tech__id)){
					if(filter_ownership.indexOf(tech__id) == -1){
						filter_ownership.push(tech__id);
					}else{
						filter_ownership.splice(filter_ownership.indexOf(tech__id), 1);
					}
				}
			},
			toggleExpansionOwnership: function(expansion__id){
				if(isNumber(expansion__id)){
					if(filter_expansions.indexOf(expansion__id) == -1){
						filter_expansions.push(expansion__id);
					}else{
						filter_expansions.splice(filter_expansions.indexOf(expansion__id), 1);
					}
				}
			},
			//get techs that have no parents(prereqs)
			getRoots: function(){
				var roots = [];
				for(var index in techs){
					if(techs[index].getParents().length == 0){
						roots.push(techs[index]);
					}
				}
				return roots;
			},
			//get techs that have no children(postreqs)
			getLeafs: function(){
				var leafs = [];
				for(var index in techs){
					if(techs[index].getChildren().length == 0){
						leafs.push(techs[index]);
					}
				}
				return leafs;
			}
		};
	}
	// I'm not good(yet), added a web.config file so that JSON files should be supported now
	var d1_colors = $.Deferred(),
		d2_techs = $.Deferred(),
		d3_races = $.Deferred(),
		d4_expansions = $.Deferred();

	$.when(d1_colors,d2_techs,d3_races,d4_expansions).then(createMainDisplay);

	$.getJSON("assets/data/colors.json", function(data){
		colors = colors(data);
		d1_colors.resolve(colors);
	});
	$.getJSON("assets/data/techs.json", function(data){
		techs_controller = techs(data);
		d2_techs.resolve(techs_controller);
	});
	$.getJSON("assets/data/races.json", function(data){
		races = races(data);
		d3_races.resolve(races);
	});
	$.getJSON("assets/data/expansions.json", function(data){
		expansions = expansions(data);
		d4_expansions.resolve(expansions);
	});

}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
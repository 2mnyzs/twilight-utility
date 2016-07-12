/*Game structure
    1. Pregame
        -physical locations, race picking
    2. Game
        a. Game rounds
            1. Strategy
                -pick strat cards
            2. Action
                -unlimited actions, turns
                -tactical, transfer, strat, other(action, racial, etc)
            3. Status
                -get objectives, clean up etc
    3. Post Game
        -stats, score, etc
    4. Pause
*/ /*
TO-DO
REDO raceCard css
*/
$(function(){
    //check url for game ID to pull data from database for init
    g_STATE = {state: 'pregame', pregame:{players: []}, game:{rounds: [], roundCount: 0}, postgame:{}};


    function updateMainDisplay(){
        $('#main_display').children().hide();
        if(g_STATE.state == 'pregame'){
            $('#pregame_display').show();
            $('#pregame_display').children('div').hide();
            //display pregame cards
            $('#race_display').show();
            $.each(races, function(){
                if(!(this.show == false)){ //lol fix this
                    $('#race_display').prepend(makeRaceCard(this.id, this.name));
                }
            });
            $('#race_display').prepend(makeRaceCard(9999, 'All players accounted for.'));

            $('.raceCard-race').on('click', function(){
                var id = $(this).data('id');
                if(id == 9999){
                    $('#race_display').hide();
                    positionDisplay();
                }else{
                    var player = {points: 0};
                    player.race = {id: id, name: $(this).data('name')};
                    g_STATE.pregame.players.push(player);
                    $(this).hide();
                    $('#race_display').hide();
                    $('#color_display').show();
                }
            });

            $.each(colors, function(){
                if(!(this.show == false)){ //lol fix this v2
                    $('#color_display').prepend(makeColorCard(this.hex, this.name));
                }
            });
            $('.raceCard-color').on('click', function(){
                var color = {name: $(this).data('name'), hex: $(this).data('hex')};
                g_STATE.pregame.players[g_STATE.pregame.players.length-1].color = color;
                $(this).hide();
                $('#color_display').hide();
                $('#name_display').show();
            });

            $('#name_form').on('submit', function(event){
                var name = $('#name_input').val();
                if(name.length == ""){
                    $('#name_input').val("Anon");
                }else{
                    g_STATE.pregame.players[g_STATE.pregame.players.length-1].name = name;
                    $('#name_input').val("");
                    $('#name_display').hide();
                    if(g_STATE.pregame.players.length == 8){
                        positionDisplay();
                    }else{
                        $('#race_display').show();
                    }
                }
                event.preventDefault();
            });

        }else if(g_STATE.state == 'game'){
            $('#game_display').show();
            $('#game_display').children('div').hide();

            //Initiate Phases
            strategyPhase();
            initActionPhase();
            initStatusPhase();

            //Show Current Phase
            if(g_STATE.game.state == 'strategy'){

            }else if(g_STATE.game.state == 'action'){

            }else if(g_STATE.game.state == 'status'){

            }else{
                console.log('Error: unknown state found.');
                g_STATE.game.state = 'strategy';
                updateMainDisplay();
            }

            stratMap = [];

        }else if(g_STATE.state == 'postgame'){
            $('#postgame_display').show();
            scoreTable();

        }else{
            console.log('error, invalid game state found');
        }
    }
    function scoreTable(){
        var players = g_STATE.pregame.players;
        $.each(players, function(){
            var points = this.points;
            var name = this.name;
            var race = this.race.name;
            $('#score_table_body').append("<tr style='text-align:left;'>"+tdWrap(race)+tdWrap(name)+tdWrap(points)+"</tr>");
        });

    }
    function tdWrap(value){
        return "<td>"+value+"</td>";
    }
    function strategyPhase(){
        $('#game_display').children('div').hide();
        $('#strategy_display').show();
        $('#current_round').html(g_STATE.game.roundCount + 1);
        stratMap = [];

        var currRoundIndex = g_STATE.game.roundCount;
        g_STATE.game.rounds[currRoundIndex] = {};

        var currPlayerIndex;
        var currRound = g_STATE.game.rounds[currRoundIndex];

        $('#strat_players').show();
        $('#strat_cards').hide();

        $('#strat_players_cards,#strat_cards_cards').html("");
        $.each(g_STATE.pregame.players, function(index){
            $('#strat_players_cards').append(makePlayerCard(index, this.color.hex, this.race.name, this.name));
        });
        $('.playerCard-player').on('click', function(){
            currPlayerIndex = $(this).data('index');
            currRound.speaker = currPlayerIndex;
            currRound.strats = [];

            $('#strat_directions').html(g_STATE.pregame.players[currPlayerIndex].race.name);
            $('.color-bar').css('background-color', '#'+g_STATE.pregame.players[currPlayerIndex].color.hex);
            $('#strat_players,#strat_cards').toggle();
            $('.playerCard-player').hide();
        });

        $.each(strategy_cards, function(index){
            $('#strat_cards_cards').append(makeStrategyCard(index, this));
        });
        $('.stratCard-card').on('click', function(){
            var index = $(this).data('index');
            var strat_id = $(this).data('id');
            var strat_number = $(this).data('number');

            currRound.strats[currPlayerIndex] = strat_id;
            stratMap[strat_number] = currPlayerIndex;
            currPlayerIndex = (currPlayerIndex+1)%g_STATE.pregame.players.length;
            if(currPlayerIndex == currRound.speaker){
                showActionPhase();
            }else{
                $('#strat_directions').html(g_STATE.pregame.players[currPlayerIndex].race.name);
                $('.color-bar').css('background-color', '#'+g_STATE.pregame.players[currPlayerIndex].color.hex);
            }
            //$('#strat_players,#strat_cards').toggle();
            $(this).hide();
        });
    }

    function showActionPhase(){
        $('#game_display').children('div').hide();
        $('#action_display').show();
        $('#action_strategic').css('cursor', "pointer");
        $('#action_strategic').css('background-color', "#150d0f");
        $('#action_pass').css('cursor', "default");
        $('#action_pass').css('background-color', "dimgrey");


        currRound = g_STATE.game.rounds[g_STATE.game.roundCount];
        currRound.turns = [];
        currCycle = 0;
        currRound.turns[currCycle] = [];
        function first(arr){for(var i in arr)return i;};
        currStratIndex = first(stratMap);
        stratsUsed = [];
        passedPlayers = [];
        passedPlayerCount = 0;

        $('#action_player').html(g_STATE.pregame.players[stratMap[currStratIndex]].race.name);
        $('.color-bar').css('background-color', '#'+g_STATE.pregame.players[stratMap[currStratIndex]].color.hex);

    }

    function initActionPhase(){

        $('.actionCard').on('click', function(){
            if(passedPlayerCount == g_STATE.pregame.players.length){
                function first(arr){for(var i in arr)return i;};
                currStratIndex = first(stratMap);
                stratsUsed = [];
                passedPlayers = [];
                passedPlayerCount = 0;
                currCycle = 0;
            }

            var action = $(this).data('action');
            if(action == 'Tactical'){

            }else if(action == 'Transfer'){

            }else if(action == 'Strategic'){
                if(passedPlayers[currStratIndex] == true || stratsUsed[currStratIndex] == true){
                    return false;
                }
                stratsUsed[currStratIndex] = true;
            }else if(action == 'Pass'){
                if(!(stratsUsed[currStratIndex] == true)){
                    return false;
                }
                passedPlayers[currStratIndex] = true;
                passedPlayerCount++;
            }else{
                console.log('invalid action');
            }
            if(typeof currRound.turns[currCycle][stratMap[currStratIndex]]  !== 'undefined'){
                currCycle++;
                currRound.turns[currCycle] = [];
            }
            currRound.turns[currCycle][stratMap[currStratIndex]] = action;

            if(passedPlayerCount == g_STATE.pregame.players.length){
                showStatusPhase();
                event.stopPropagation();
                return false;
            }

            //getNextPlayer
            var nextPlayerFound = false;
            var i = 0;
            while(nextPlayerFound == false){
                i++;
                currStratIndex = (parseInt(currStratIndex)+1)%stratMap.length;
                if(passedPlayers[currStratIndex] != true && (typeof stratMap[currStratIndex] !== 'undefined')){
                    nextPlayerFound = true;
                }
                if(i > 20){
                    nextPlayerFound = true;
                    console.log('NEXT PLAYER NOT FOUND');
                }
            }
            nextPlayerFound = false;
            var avail, unavail;
            if(stratsUsed[currStratIndex] == true){
                avail = "action_pass";
                unavail = "action_strategic";
            }else{
                avail = "action_strategic";
                unavail = "action_pass";
            }
            $('#'+avail).css('cursor', "pointer");
            $('#'+avail).css('background-color', "#150d0f");
            $('#'+unavail).css('cursor', "default");
            $('#'+unavail).css('background-color', "dimgrey");
            $('#action_player').html(g_STATE.pregame.players[stratMap[currStratIndex]].race.name);
            $('.color-bar').css('background-color', '#'+g_STATE.pregame.players[stratMap[currStratIndex]].color.hex);

            event.stopPropagation();
            return false;
        });

    }

    function showStatusPhase(){
        $('#game_display').children('div').hide();
        $('#status_display').show();

        function first(arr){for(var i in arr)return i;};
        currStratIndex = first(stratMap);
        status_first = currStratIndex;
        $('#status_player').html(g_STATE.pregame.players[stratMap[currStratIndex]].race.name);
        $('.color-bar').css('background-color', '#'+g_STATE.pregame.players[stratMap[currStratIndex]].color.hex);

    }
    function initStatusPhase(){
        $('#status_button').on('click', function(event){
            var points = parseInt($('#number_input').val());
            $('#number_input').val("");
            g_STATE.pregame.players[stratMap[currStratIndex]].points += (points || 0);
            if(g_STATE.pregame.players[stratMap[currStratIndex]].points >= 10){
                g_STATE.state = 'postgame';
                updateMainDisplay();
                return false;
            }

            var nextPlayerFound = false;
            var nextPhase = false;
            var i = 0;
            while(nextPlayerFound == false){
                i++;
                currStratIndex = (parseInt(currStratIndex)+1)%stratMap.length;
                if(typeof stratMap[currStratIndex] !== 'undefined'){
                    nextPlayerFound = true;
                    if(status_first == currStratIndex){
                        g_STATE.game.roundCount++;
                        nextPhase = true;
                    }
                }
                if(i > 20){
                    nextPlayerFound = true;
                    console.log('NEXT PLAYER NOT FOUND');
                }
            }
            nextPlayerFound = false;

            $('#status_player').html(g_STATE.pregame.players[stratMap[currStratIndex]].race.name);
            $('.color-bar').css('background-color', '#'+g_STATE.pregame.players[stratMap[currStratIndex]].color.hex);

            if(nextPhase){
                strategyPhase();
            }

            event.stopPropagation();
            return false;
        });
    }

    function positionDisplay(){
        $('#position_display').show();

        $.each(g_STATE.pregame.players, function(){
            $('#position_list').append(makePositionItem(0, this.race.name, this.name));
        });
        $('.position-item').on('click', function(){
            var element1 = $(this);
            if($(this).next().length){
                var element2 = $(this).next();
                var id1 = $(this).index();
                var player1 = g_STATE.pregame.players[id1];
                g_STATE.pregame.players[id1] = g_STATE.pregame.players[id1+1];
                g_STATE.pregame.players[id1+1] = player1;
                $(this).insertAfter(element2);
            }else{
                var element2 = $(this).siblings(':first-child');
                g_STATE.pregame.players.unshift(g_STATE.pregame.players.pop());
                $(this).insertBefore(element2);
            }
        });
        $('#position_button').on('click', function(){
            $('#position_display').hide();
            g_STATE.state = 'game';
            g_STATE.game.state = 'strategy';
            updateMainDisplay();
        });
    }
    function makePlayerCard(index, color, race, name){
        return  "<div class='raceCard-glue playerCard-player' data-index='"+index+"'>"+
                    "<div class='raceCard playerCard-top'><h4>"+race+"</h4></div>"+
                    "<div style='background-color:#"+color+";' class='raceCard playerCard-middle'></div>"+
                    "<div class='raceCard playerCard-bottom'><h5>"+name+"</h5></div>"+
                "</div>";
    }
    function makePositionItem(id, race, name){
        return "<li class='position-item list-group-item' data-id='"+id+"'><h5>"+race+"</h5><h6>"+name+"</h6></li>";
    }
    function makeRaceCard(id, name){ //raceCard, raceCard-all
        return "<div class='raceCard raceCard-race' data-id='"+id+"' data-name='"+name+"'>"+name+"</div>";
    }
    function makeStrategyCard(index, card){
        return  "<div class='stratCard-glue stratCard-card' data-number='"+card.number+"'  data-id='"+card.id+"' data-index='"+index+"'>"+
                    "<div style='border-color:#"+card.color+";'class='stratCard stratCard-top'>"+
                        "<div style='float:left;'>"+card.number+"</div>"+
                        "<div style='float:right;'>"+card.name+"</div></div>"+
                    "<div style='border-color:#"+card.color+";' class='stratCard stratCard-middle'>"+card.primary+"</div>"+
                    "<div style='border-color:#"+card.color+";'class='stratCard stratCard-bottom'>"+card.secondary+"</div>"+
                "</div>";
    }
    function makeColorCard(color, name){
        return  "<div class='raceCard-glue raceCard-color' data-name='"+name+"' data-hex='"+color+"'>"+
                    "<div class='raceCard raceCard-top'>"+name+"</div>"+
                    "<div style='background-color:#"+color+";' class='raceCard raceCard-middle'></div>"+
                    "<div style='background-color:#"+color+";'class='raceCard raceCard-bottom'></div>"+
                "</div>";
    }
    var races = [{"id":1,"name":"Sardakk N'orr"},
    {"id":2,"name":"Mentalk Coalition"},{"id":3,"name":"Universities of Jol-Nar"},
    {"id":4,"name":"Embers of Muaat"},{"id":5,"name":"Barony of Letnev"},{"id":6,"name":"Lazax"},
    {"id":7,"name":"L1Z1x Mindnet"},{"id":8,"name":"Naalu Collective"},{"id":9,"name":"Emirates of Hacan"},
    {"id":10,"name":"The Winnu"},{"id":11,"name":"Clan of Saar"},{"id":12,"name":"Yin Brotherhood"},
    {"id":13,"name":"The Arborec"},{"id":14,"name":"The Ghosts of Creuss"},{"id":15,"name":"The Nekro Virus"},
    {"id":16,"name":"Yssaril Tribes"},{"id":17,"name":"Xxcha Kingdom"}];
    var colors =    [{name : 'Red',     hex : 'B80000'},
                    {name : 'Black',    hex : '000000'},
                    {name : 'Gray',     hex : '757575'},
                    {name : 'Yellow',   hex : 'E6E600'},
                    {name : 'Blue',     hex : '0000CC'},
                    {name : 'Orange',   hex : 'FF7519'},
                    {name : 'Purple',   hex : '6C196C'},
                    {name : 'Green',    hex : '164016'}];
    var strategy_cards = [
        {
            name : 'Leadership',
            number : 1,
            id : 6,
            color : 'CC3300',
            primary : 'Primary Ability',
            secondary : 'Secondary Ability'
        },
        {
            name : 'Diplomacy II',
            number : 2,
            id : 3,
            color : 'FF9900',
            primary : 'Primary Ability',
            secondary : 'Secondary Ability'
        },
        {
            name : 'Political II',
            number : 3,
            id : 7,
            color : 'CCCC00',
            primary : 'Primary Ability',
            secondary : 'Secondary Ability'
        },
        {
            name : 'Production',
            number : 4,
            id : 8,
            color : '009933',
            primary : 'Primary Ability',
            secondary : 'Secondary Ability'
        },
        {
            name : 'Trade II',
            number : 5,
            id : 9,
            color : '00CC00',
            primary : 'Primary Ability',
            secondary : 'Secondary Ability'
        },
        {
            name : 'Warfare II',
            number : 6,
            id : 11,
            color : '0099FF',
            primary : 'Primary Ability',
            secondary : 'Secondary Ability'
        },
        {
            name : 'Technology II',
            number : 7,
            id : 3,
            color : '0000BB',
            primary : 'Primary Ability',
            secondary : 'Secondary Ability'
        },
        {
            name : 'Bureaucracy',
            number : 8,
            id : 1,
            color : '992286',
            primary : 'Primary Ability',
            secondary : 'Secondary Ability'
        }
    ];
    updateMainDisplay();
});

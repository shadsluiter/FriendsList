$(document).ready(function() {
	var $friends = $('#friends');
	var $name = $('#name');
	var $age = $('#age');

	var friendTemplate = $('#friend-template').html();

function addFriendToPage(friend) {
	//$friends.append("<li id='" + friend.id + "'>" + " Friend name: " + friend.name + " Age: " + friend.age + "</li>");
	$friends.append(Mustache.render(friendTemplate, friend));
}
$('#add-friend').click(function() {

		var new_name = $name.val();
		var new_age = $age.val();
		console.log('Attempting to add ' + new_name + ' who is ' + new_age + ' years old');

		$.ajax({
		  type: 'POST',
		  url: 'http://rest.learncode.academy/api/johnbob/friends',
		  data: {name:  new_name, age: new_age},
		  success: function(data) {
		  		addFriendToPage(data)
		  		console.log(' Success in adding', data);

		    		  }
		});
	});




	$('#show-friends').click(function() {
		$.ajax({
  			type: 'GET',
  			url: 'http://rest.learncode.academy/api/johnbob/friends',
  			success: function(friends) {
  				$.each(friends, function(i, friend) {
  					addFriendToPage(friend);
  						});

  		}
	});


$('#friends').delegate('.remove','click', function(){
	$li = $(this).closest('li');
	$.ajax({
	  type: 'DELETE',
	  url: 'http://rest.learncode.academy/api/johnbob/friends/' + $(this).attr('data-id'),
	  success: function() {
	    //no data...just a success (200) status code
	    console.log('Friend Deleted Successfully!');
			$li.fadeOut(300,function() {
				$(this).remove();
			});


	  }
	});
});

$('#friends').delegate('.editfriend','click', function(){

  //cache the parent container
	$li = $(this).closest('li');

	// set the value of the input fields to the current value
	$li.find('.edit.age').val( $li.find('span.age').html());
	$li.find('.edit.name').val( $li.find('span.name').html());

	// set the parent to edit mode (displays the input fields in CSS rules)
	$li.addClass('edit');




});


$('#friends').delegate('.canceledit','click', function(){
  //cache the parent container
	$li = $(this).closest('li');

	// remove edit class from parent.  Hides input fields in CSS rules
	$li.removeClass('edit');
});

$('#friends').delegate('.saveedit','click', function(){
  //cache the parent container
	$li = $(this).closest('li');

	var newfriend ={
		name: $li.find('input.name').val(),
		age: $li.find('input.age').val(),
		id: $li.attr('data-id')
	}


	$.ajax({
	  type: 'PUT',
	  data: newfriend,
	  url: 'http://rest.learncode.academy/api/johnbob/friends/' + newfriend.id,
	  success: function() {
	    //no data...just a success (200) status code
	    console.log('Friend Updated Successfully!');
	  }
	});

	// upate the display with the new info.
	$li.find('span.name').html(newfriend.name);
	$li.find('span.age').html(newfriend.age);


	// remove edit class from parent.  Hides input fields in CSS rules
	$li.removeClass('edit');
});




});
});

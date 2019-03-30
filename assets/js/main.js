/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);




//  Book Class
class Book {
	constructor(title, author, isbn,gender,tel,email) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.gender = gender;
		this.tel = tel;
		this.email = email;
	}
}

// UI
class UI {
	static displayBooks() {

		 
		const books = Store.getBooks();

		books.forEach((book) => UI.addBookToList(book));
	}

//  add book
	static addBookToList(book) {
		const list = document.querySelector('#book-list');

		const row = document.createElement('tr');

		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td>${book.gender}</td>
			<td>${book.tel}</td>
			<td>${book.email}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
		`;

		list.appendChild(row);
	}

//  delete book  
	static deleteBook(el) {
		// if element contains .delete class
		if(el.classList.contains('delete')) {
		// remove <a> -> <td> -> <tr>       
			el.parentElement.parentElement.remove();
		}
	}

//  show alert  

	static showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		container.insertBefore(div, form);

		// Vanish in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}

//  clear fields  
	static clearFields() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
		document.querySelector('#gender').value = '';
		document.querySelector('#tel').value = '';
		document.querySelector('#email').value = '';
	}
}

// Store Class: Handles Storage
class Store {
	static getBooks() {
		let books;
		if(localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(email) {
		const books = Store.getBooks();

		books.forEach((book, index) => {
			if(book.email === email) {
				books.splice(index, 1);
			}
		});

		localStorage.setItem('books', JSON.stringify(books));
	}
}

//  Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//  Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
	//  Prevent actual submit action
	e.preventDefault();

	// Get form values
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;
	const gender = document.querySelector('#gender').value;
	const tel = document.querySelector('#tel').value;
	const email = document.querySelector('#email').value;
	//  Validate
	if(title === '' || author === '' || isbn === ''||gender===''||tel===''||email==='') {
		UI.showAlert('Please fill in all fields', 'danger');
	} else {
		//  Instatiate book
		const book = new Book(title, author, isbn, gender, tel, email);
		// console.log(book);

		//  Add Book to UI
		UI.addBookToList(book);

		// Add book to store
		Store.addBook(book);

		//  Show success message
		UI.showAlert('detail accepted', 'success');

		//  Clear fields
		UI.clearFields();
	}
});

//  Event: Remove a Book - event propagation by selecting the parent
document.querySelector('#book-list').addEventListener('click', (e) => {
	
	
	//  Remove book from UI
	UI.deleteBook(e.target);

	// Remove book from store
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	//  Show success message
	UI.showAlert('Removed', 'success');

	UI.clearFields();
});
const cols = document.querySelectorAll('.col');

cols.forEach(col => {
	col.addEventListener('click', handleClick);
})

function handleClick() {
	if (this.classList.contains('open')) {
		this.classList.remove('open');
	} else {
		cols.forEach(col => {
			if (col.classList.contains('open')) {
				col.classList.remove('open');
			}
		});
		this.classList.toggle('open');
	}
}
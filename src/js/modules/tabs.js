function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	// **********  Tabs  ************

	const tabs = document.querySelectorAll(tabsSelector),
				tabsContent = document.querySelectorAll(tabsContentSelector),
				tabsParent = document.querySelector(tabsParentSelector);

	hideTabContent();
	showTabContent();

	function hideTabContent() {

		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {

		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	}

	tabsParent.addEventListener('click', (e) => {

		const target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, index) => {
				if (target == item) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});
}

export default tabs;
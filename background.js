chrome.commands.onCommand.addListener((command) => {
    if (command == "mute_all") {
        chrome.windows.getAll({populate: true}, (windowList) => {
            windowList.forEach((window) => {
                window.tabs.forEach((tab) => {
					chrome.tabs.update(tab.id, {muted: true});
                });
            });
        });
    } else if (command == "unmute_all") {
        chrome.windows.getAll({populate: true}, (windowList) => {
            windowList.forEach((window) => {
                window.tabs.forEach((tab) => {
					chrome.tabs.update(tab.id, {muted: false});
                });
            });
        });

    } else if (command == "mute_others") {
		chrome.tabs.getSelected(null, (currentTab) => {
			chrome.windows.getAll({populate: true}, (windowList) => {
				windowList.forEach((window) => {
					window.tabs.forEach((tab) => {
						if (tab.id == currentTab.id) {
							chrome.tabs.update(tab.id, {muted: false});
						} else {
							chrome.tabs.update(tab.id, {muted: true})
						}
					});
				});
			});
		});
    } else if (command == "mute_current") {
        chrome.tabs.getSelected(null, (tab) => {
            chrome.tabs.update(tab.id, {muted: true});
        });
    }
});

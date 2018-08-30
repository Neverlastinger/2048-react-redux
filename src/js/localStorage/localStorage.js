/**
 * Loads the existing state from the localStorage.
 *
 * @return state: object
 */
export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

/**
 * Saves the existing state in the localStorage.
 */
export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		// nothing
	}
}

import { connect } from 'react-redux';

import { getYouWin } from '../store/queries';
import { continuePlaying } from '../store/actions';
import YouWinLayer from '../components/YouWinLayer';

/**
 * Redux container for the you win overlay.
 */
const YouWinLayerContainer = connect(
    () => ({
		youWin: getYouWin()
    }),
    (dispatch) => ({
		continuePlaying: () => {
			dispatch(continuePlaying());
		}
    })
)(YouWinLayer);

export default YouWinLayerContainer;
